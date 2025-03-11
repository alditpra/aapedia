import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';
import { formatDate } from '@utils/date';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.slug}/`,
      categories: post.data.categories || [],
      // Optional custom data
      customData: post.data.tags ? 
        `<tags>${post.data.tags.join(',')}</tags>` : '',
    })),
    // Optional: customize the RSS output
    stylesheet: '/rss/styles.xsl',
  });
}
