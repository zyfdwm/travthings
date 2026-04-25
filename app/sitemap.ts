import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/notion';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelthings.pages.dev';

  // Get all blog posts from Notion
  const posts = await getBlogPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/blog', '/destinations', '/attractions', '/press', '/privacy', '/sustainability', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : (route === '/blog' || route === '/destinations') ? 0.9 : 0.7,
  }));

  return [...routes, ...postUrls];
}
