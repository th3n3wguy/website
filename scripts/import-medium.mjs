#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import TurndownService from 'turndown';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const posts = [
  {
    entry: 'posts/2019-01-28_Why-I-include-Lodash-in--almost--every-project--a3f72c95006d.html',
    slug: 'why-i-include-lodash-in-almost-every-project',
    tags: ['JavaScript', 'Lodash', 'Functional programming'],
  },
  {
    entry: 'posts/2019-02-18_A-Hypothesis-On-How-React-js-Became-So-Popular-dc5953c67cf6.html',
    slug: 'a-hypothesis-on-how-react-js-became-so-popular',
    tags: ['JavaScript', 'React'],
    promotions: ['2031'],
  },
  {
    entry: 'posts/2020-08-19_Data-Scientists-what-do-you-mean-that-you-re-not--programmers---7085cd779902.html',
    slug: 'data-scientists-what-do-you-mean-that-youre-not-programmers',
    tags: ['Data science', 'Software engineering'],
  },
  {
    entry: 'posts/2022-02-22_Please-stop-using-nested-if-statements--bf3da0664a7c.html',
    slug: 'please-stop-using-nested-if-statements',
    tags: ['JavaScript', 'Code readability'],
  },
  {
    entry: 'posts/2022-02-24_Use-map---instead-of-for---loops-5a2f54f088c8.html',
    slug: 'use-map-instead-of-for-loops',
    tags: ['JavaScript', 'Functional programming'],
    promotions: ['e198', '8027'],
  },
];

const normalize = (text) => text.replace(/\s+/gu, ' ').trim();
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const imageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/gif', 'gif'],
  ['image/webp', 'webp'],
]);

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}

function fenced(code, language = '') {
  const runs = code.match(/`+/gu) ?? [];
  const fence = '`'.repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
  return `\n\n${fence}${language}\n${code.replace(/\n?$/u, '\n')}${fence}\n\n`;
}

async function recoverGist($, script) {
  const source = $(script).attr('src');
  if (!/^https:\/\/gist\.github\.com\/th3n3wguy\/[a-f0-9]+\.js$/u.test(source ?? '')) {
    throw new Error(`Unsupported script embed: ${source}`);
  }
  const gistUrl = source.slice(0, -3);
  const response = await download(`${gistUrl}.json`);
  const gist = await response.json();
  const embed = load(gist.div);
  const files = embed('.gist-file');
  if (!files.length) throw new Error(`No recoverable source files: ${gistUrl}`);
  const fragments = [];
  for (const file of files) {
    const rawUrl = embed(file).find('a[href*="/raw/"]').first().attr('href');
    if (!rawUrl || !rawUrl.startsWith(`${gistUrl}/raw/`)) {
      throw new Error(`Missing raw source URL: ${gistUrl}`);
    }
    const code = await (await download(rawUrl)).text();
    if (!code.trim()) throw new Error(`Empty source: ${rawUrl}`);
    const filename = decodeURIComponent(new URL(rawUrl).pathname.split('/').at(-1));
    const language = filename.endsWith('.js') ? 'javascript' : '';
    fragments.push(
      `<pre data-language="${language}">${escapeHtml(code)}</pre>` +
      `<p><a href="${rawUrl}">Original gist: ${escapeHtml(filename)}</a></p>`,
    );
  }
  $(script).replaceWith(fragments.join('\n'));
  return files.length;
}

async function convert(zip, post) {
  // Read only explicitly allowlisted published articles, never profile/draft/reply files.
  const html = execFileSync('unzip', ['-p', zip, post.entry], {
    encoding: 'utf8',
    maxBuffer: 2 * 1024 * 1024,
  });
  const $ = load(html);
  const title = $('.p-name').text().trim();
  const description = normalize($('.p-summary').text());
  const timestamp = $('time.dt-published').attr('datetime');
  const sourceUrl = $('a.p-canonical').attr('href');
  const body = $('section[data-field="body"]');
  if (!title || !description || !/^\d{4}-\d{2}-\d{2}T/u.test(timestamp ?? '') ||
      !sourceUrl?.startsWith('https://medium.com/') || body.length !== 1) {
    throw new Error(`Missing expected publication metadata: ${post.entry}`);
  }
  for (const sectionName of post.promotions ?? []) {
    const section = body.find(`section[name="${sectionName}"]`);
    const text = section.text();
    if (section.length !== 1 || !/Journal|composable|enterprise-grade/u.test(text)) {
      throw new Error(`Promotional section changed: ${post.entry}#${sectionName}`);
    }
    section.remove();
  }
  body.find('.graf--title').remove();
  let gistFiles = 0;
  for (const script of body.find('script').toArray()) gistFiles += await recoverGist($, script);
  if (body.find('iframe, script').length) throw new Error(`Unresolved embeds: ${post.entry}`);

  const images = [];
  for (const [index, image] of body.find('img').toArray().entries()) {
    const source = $(image).attr('src');
    if (!source?.startsWith('https://cdn-images-1.medium.com/')) {
      throw new Error(`Unsupported image URL: ${source}`);
    }
    const response = await download(source);
    const type = response.headers.get('content-type')?.split(';')[0];
    const extension = imageTypes.get(type);
    if (!extension) throw new Error(`Not a supported image (${type}): ${source}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length) throw new Error(`Empty image: ${source}`);
    const filename = `${post.slug}-${index + 1}.${extension}`;
    images.push({ filename, bytes });
    $(image).attr('src', `../../images/blog/${filename}`);
    if (!$(image).attr('alt')) {
      const caption = normalize($(image).closest('figure').find('figcaption').text());
      $(image).attr('alt', caption || `Illustration from “${title}”`);
    }
  }
  body.find('pre').each((_, pre) => {
    $(pre).find('br').replaceWith('\n');
  });
  body.find('h3, h4').each((_, heading) => {
    const level = heading.tagName === 'h3' ? 'h2' : 'h3';
    $(heading).replaceWith(`<${level}>${$(heading).html()}</${level}>`);
  });
  if (!normalize(body.text()).includes(description)) {
    body.prepend(`<p><em>${escapeHtml(description)}</em></p>`);
  }
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  turndown.addRule('source-code', {
    filter: 'pre',
    replacement: (_, node) => {
      const language = node.getAttribute('data-language') ??
        (node.textContent.includes('<?php') ? 'php' : 'javascript');
      return fenced(node.textContent, language);
    },
  });
  turndown.addRule('image-captions', {
    filter: 'figcaption',
    replacement: (content) => `\n\n${content}\n\n`,
  });
  // Public assets are URL references, not source-relative Astro image imports.
  turndown.addRule('public-images', {
    filter: 'img',
    replacement: (_, node) => {
      const src = escapeHtml(node.getAttribute('src')).replaceAll('"', '&quot;');
      const alt = escapeHtml(node.getAttribute('alt')).replaceAll('"', '&quot;');
      return `\n\n<img src="${src}" alt="${alt}">\n\n`;
    },
  });
  const markdown = turndown.turndown(body.html()).trim();
  if (!markdown || /<script|<iframe|https:\/\/cdn-images-1\.medium\.com\//u.test(markdown)) {
    throw new Error(`Incomplete conversion: ${post.entry}`);
  }
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `pubDate: ${timestamp.slice(0, 10)}`,
    `tags: ${JSON.stringify(post.tags)}`,
    `sourceUrl: ${JSON.stringify(sourceUrl)}`,
    'draft: false',
    '---',
  ].join('\n');
  return { ...post, markdown: `${frontmatter}\n\n${markdown}\n`, images, gistFiles };
}

async function writeIfChanged(path, content) {
  const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content);
  try {
    if ((await readFile(path)).equals(bytes)) return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await writeFile(path, bytes);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || args[0] === '--help') {
    console.log('Usage: node scripts/import-medium.mjs /absolute/path/to/medium-export.zip');
    if (args[0] !== '--help') process.exitCode = 1;
    return;
  }
  const zip = resolve(args[0]);
  const converted = [];
  // Complete all downloads/conversions before modifying any published output.
  for (const post of posts) converted.push(await convert(zip, post));
  await mkdir(resolve(root, 'src/content/blog'), { recursive: true });
  await mkdir(resolve(root, 'public/images/blog'), { recursive: true });
  for (const post of converted) {
    for (const image of post.images) {
      await writeIfChanged(resolve(root, 'public/images/blog', image.filename), image.bytes);
    }
    await writeIfChanged(resolve(root, 'src/content/blog', `${post.slug}.md`), post.markdown);
    console.log(`${post.slug}: ${post.images.length} local images; ${post.gistFiles} recovered gist files`);
  }
  console.log(`Imported ${converted.length} published articles. No drafts, replies, or private metadata read.`);
}

main().catch((error) => {
  console.error(`Medium import failed: ${error.message}`);
  process.exitCode = 1;
});
