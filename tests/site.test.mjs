import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import { load } from 'cheerio';

const origin = process.env.SITE_URL || 'https://th3n3wguy.github.io';
const base = (process.env.BASE_PATH || '/website').replace(/\/$/, '');
const root = resolve('dist');
const read = file => readFileSync(join(root, file), 'utf8');
function scripts($) {
  return $('script').toArray().map(script => {
    const source = $(script).attr('src');
    if (!source) return $(script).text();
    const url = new URL(source, origin);
    assert.equal(url.origin, origin);
    return read(decodeURIComponent(url.pathname.slice(base.length)));
  });
}
function allFiles(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? allFiles(path) : [path];
  });
}

test('generated pages have valid local links, images, metadata and anchors', () => {
  for (const file of allFiles(root).filter(file => file.endsWith('.html'))) {
    const $ = load(readFileSync(file, 'utf8'));
    const route = file.slice(root.length).replace(/index\.html$/, '');
    const current = new URL(`${base}${route}`, origin);
    assert.equal($('html').attr('lang'), 'en');
    assert.equal($('html').attr('data-theme'), 'dark');
    assert.equal($('h1').length, 1, file);
    assert.ok($('meta[name="description"]').attr('content'), file);
    if (file.endsWith('/404.html')) {
      assert.equal($('meta[name="robots"]').attr('content'), 'noindex');
      assert.equal($('link[rel="canonical"]').length, 0);
    } else {
      assert.equal($('link[rel="canonical"]').attr('href'), current.href);
    }
    assert.equal($('main#main').length, 1);
    $('a[href], img[src], script[src], link[href]').each((_, element) => {
      const value = $(element).attr('href') || $(element).attr('src');
      const url = new URL(value, current);
      if (url.origin !== current.origin) return;
      assert.ok(url.pathname.startsWith(`${base}/`), `${file}: ${value} escapes base`);
      const pathname = decodeURIComponent(url.pathname.slice(base.length));
      const target = join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
      assert.ok(existsSync(target), `${file}: missing ${target}`);
      if (url.hash && target.endsWith('.html')) {
        const destination = load(readFileSync(target, 'utf8'));
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(destination('[id]').toArray().some(node => destination(node).attr('id') === id), `${file}: missing anchor ${value}`);
      }
    });
    assert.equal($('img:not([alt])').length, 0, `${file}: image needs alt`);
    assert.equal($('iframe').length, 0, `${file}: unrecovered embed`);
    assert.ok(!$.html().includes('/_/stat?'), `${file}: tracking pixel`);
  }
});

test('published articles include the migrated archive and appear in RSS and sitemap', () => {
  const $ = load(read('blog/index.html'));
  assert.ok($('[data-post]').length >= 5);
  assert.equal(load(read('index.html'))('[data-post]').length, 3);
  const feed = load(read('rss.xml'), { xml: true });
  assert.equal(feed('item').length, $('[data-post]').length);
  assert.equal(feed('channel > link').text(), new URL(`${base}/`, origin).href);
  const sitemap = read('sitemap-0.xml');
  $('[data-post] h2 a').each((_, link) => {
    const url = new URL($(link).attr('href'), origin).href;
    assert.ok(sitemap.includes(url));
    assert.ok(feed('item > link').toArray().some(item => feed(item).text() === url));
  });
  assert.ok(!sitemap.includes('draft'));
  assert.ok(!read('about/index.html').includes('tarleton.shane@gmail.com'));
});

function themePage(saved, blocked = false) {
  const $ = load(read('index.html'));
  const attributes = {};
  const handlers = {};
  const warnings = [];
  const button = {
    hidden: true,
    setAttribute: (key, value) => { attributes[key] = value; },
    addEventListener: (event, handler) => { handlers[event] = handler; },
  };
  const document = {
    documentElement: { dataset: { theme: 'dark' } },
    querySelector: selector => selector === '#theme-toggle' ? button : { setAttribute() {} },
  };
  const storage = new Map(saved ? [['theme', saved]] : []);
  const localStorage = {
    getItem(key) { if (blocked) throw new Error('Storage blocked'); return storage.get(key); },
    setItem(key, value) { if (blocked) throw new Error('Storage blocked'); storage.set(key, value); },
  };
  const context = vm.createContext({ document, localStorage, console: { warn: (...args) => warnings.push(args) } });
  for (const script of scripts($)) vm.runInContext(script, context);
  return { document, storage, button, handlers, attributes, warnings };
}

test('theme defaults dark, restores local preference and persists both toggle directions', () => {
  const page = themePage();
  assert.equal(page.document.documentElement.dataset.theme, 'dark');
  assert.equal(page.button.hidden, false);
  assert.equal(page.attributes['aria-label'], 'Switch to light theme');
  page.handlers.click();
  assert.equal(page.document.documentElement.dataset.theme, 'light');
  assert.equal(page.storage.get('theme'), 'light');
  assert.equal(themePage(page.storage.get('theme')).document.documentElement.dataset.theme, 'light');
  page.handlers.click();
  assert.equal(page.storage.get('theme'), 'dark');
  assert.equal(themePage('invalid').document.documentElement.dataset.theme, 'dark');
});

test('theme toggle works and reports persistence failure when storage is blocked', () => {
  const page = themePage(undefined, true);
  page.handlers.click();
  assert.equal(page.document.documentElement.dataset.theme, 'light');
  assert.equal(page.warnings.length, 2);
});

test('blog search and topic filters combine and report an empty result', () => {
  const $ = load(read('blog/index.html'));
  const inputs = { search: { value: '', addEventListener() {} }, topic: { value: '', addEventListener() {} } };
  let filter;
  inputs.search.addEventListener = (_, handler) => { filter = handler; };
  const results = { textContent: '' };
  const empty = { hidden: true };
  const posts = $('[data-post]').toArray().map(node => ({
    dataset: { search: $(node).attr('data-search'), tags: $(node).attr('data-tags') },
    hidden: false,
  }));
  const document = {
    querySelectorAll: () => posts,
    querySelector: selector => ({
      '#search': inputs.search, '#topic': inputs.topic, '#results': results,
      '#no-results': empty, form: { addEventListener() {} },
    })[selector],
  };
  const script = scripts($).find(source => source.includes('#search'));
  assert.ok(script);
  const context = vm.createContext({ document });
  vm.runInContext(script, context);
  inputs.search.value = 'map()';
  filter();
  assert.ok(posts.some(post => !post.hidden));
  assert.ok(posts.filter(post => !post.hidden).every(post => post.dataset.search.includes('map()')));
  inputs.topic.value = 'nonexistent-topic';
  filter();
  assert.equal(results.textContent, '0 articles');
  assert.equal(empty.hidden, false);
});
