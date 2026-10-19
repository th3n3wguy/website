import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, path, site } from '../lib/site';

export async function GET(context: APIContext) {
  return rss({
    title: `${site.name} | Blog`,
    description: site.description,
    site: new URL(path(), context.site),
    items: (await getPosts()).map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: path(`blog/${post.id}/`),
    })),
  });
}
