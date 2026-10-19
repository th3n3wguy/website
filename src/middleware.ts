import { defineMiddleware } from 'astro:middleware';
import { load } from 'cheerio';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const $ = load(await response.text());
  const site = context.site ?? context.url;
  $('a[href]').each((_, element) => {
    const link = $(element);
    const destination = new URL(link.attr('href')!, site);
    if (!['http:', 'https:'].includes(destination.protocol) || destination.origin === site.origin) return;

    link.attr('target', '_blank');
    const rel = new Set((link.attr('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    link.attr('rel', [...rel].join(' '));
  });

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response($.html(), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
