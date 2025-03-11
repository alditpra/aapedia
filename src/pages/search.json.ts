import { getCollection } from 'astro:content';
import { formatDate } from '@utils/date';

export async function GET() {
  // Get all posts
  const posts = await getCollection('posts');

  // Format posts for search
  const searchData = posts.map(post => {
    // Create a serializable version of the image data if it exists
    const imageData = post.data.image ? {
      src: post.data.image.src,
      width: post.data.image.width,
      height: post.data.image.height
    } : null;
    
    return {
      slug: post.slug,
      title: post.data.title,
      description: post.data.description || '',
      date: post.data.date ? formatDate(post.data.date) : '',
      image: imageData,
      categories: post.data.categories || [],
      tags: post.data.tags || [],
      content: post.body
    };
  });

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
