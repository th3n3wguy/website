import { getCollection } from 'astro:content';

export const site = {
  name: 'Shane Tarleton',
  title: 'Software Engineer',
  description: 'Notes on software engineering, reliable delivery, and making complex systems easier to use.',
  linkedin: 'https://www.linkedin.com/in/shanetarleton/',
  github: 'https://github.com/th3n3wguy',
};

export function path(route = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${route.replace(/^\//, '')}`;
}

export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(date);
}
