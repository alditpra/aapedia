---
title: "Getting Started with Astro - Part 2: Components and Content"
meta_title: "Getting Started with Astro - Part 2: Components and Content"
description: "Learn how to create reusable components in Astro and manage content with Markdown and data fetching capabilities."
date: 2023-10-27
image: "../../assets/images/astro-components.svg"
authors: ["dragos"]
categories: ["Web Development"]
tags: ["astro", "jamstack", "components", "markdown"]
series: ["Astro Get Started", "2"]
---

## Building with Astro Components

In [Part 1](/astro-get-started-part-1), we covered the basics of Astro and set up our first project. Now, let's dive deeper into one of Astro's most powerful features: components.

Astro components are the building blocks of your website. They're files with a `.astro` extension that contain reusable pieces of HTML, CSS, and JavaScript. Unlike components in frameworks like React or Vue, Astro components render to HTML at build time by default, resulting in zero JavaScript sent to the browser.

### Anatomy of an Astro Component

An Astro component has two main parts:

1. **Component Script** (optional) - A JavaScript code fence (`---`) containing component logic
2. **Component Template** - HTML markup with expressions for dynamic content

```astro
---
// Component Script (runs at build time)
const title = "My Astro Component";
const items = ["Item 1", "Item 2", "Item 3"];

// You can import other components
import Button from "./Button.astro";

// Or even import from other frameworks
import ReactCounter from "../components/ReactCounter.jsx";
---

<!-- Component Template (HTML with expressions) -->
<div class="my-component">
  <h2>{title}</h2>
  <ul>
    {items.map((item) => (
      <li>{item}</li>
    ))}
  </ul>
  
  <Button text="Click me" />
  
  <!-- Use client:* directives for interactive components -->
  <ReactCounter client:load />
</div>

<style>
  .my-component {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    color: navy;
  }
</style>
```

### Props and Dynamic Data

Astro components can accept props, making them truly reusable:

```astro
---
// Define the props your component accepts
const { title, color = "blue" } = Astro.props;
---

<h2 style={`color: ${color};`}>{title}</h2>
```

You can then use this component in another `.astro` file:

```astro
---
import Heading from "../components/Heading.astro";
---

<Heading title="Welcome to my site" color="purple" />
<Heading title="Another heading" /> <!-- Uses default color -->
```

## Working with Content in Astro

### Markdown and MDX Support

Astro has excellent support for Markdown content, making it perfect for blogs and documentation sites. Files placed in the `src/pages/` directory with `.md` extensions automatically become pages on your site.

Here's an example of a Markdown file in Astro:

```markdown
---
# This is frontmatter - metadata for your content
title: My First Blog Post
publishDate: 2023-10-27
author: Dragos
---

# {frontmatter.title}

This is my first blog post! It was published on {new Date(frontmatter.publishDate).toLocaleDateString()}.

## Markdown Features

- **Bold text** and *italic text*
- [Links](https://astro.build)
- Lists and more!
```

You can enhance your Markdown with MDX (requires the MDX integration) to use components within your content:

```bash
npm install @astrojs/mdx
```

Then update your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
});
```

### Content Collections

Astro 2.0+ introduced Content Collections, a powerful way to manage your Markdown and MDX content:

```
src/content/
  ├── blog/
  │   ├── post-1.md
  │   └── post-2.md
  └── authors/
      ├── author-1.md
      └── author-2.md
```

Define a schema for your collections in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

Then query your content in your Astro components:

```astro
---
import { getCollection } from 'astro:content';

// Get all blog posts
const allBlogPosts = await getCollection('blog');

// Sort by publish date
const sortedPosts = allBlogPosts.sort(
  (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
);
---

<h1>My Blog</h1>

<ul>
  {sortedPosts.map(post => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
      <p>Published on {post.data.publishDate.toLocaleDateString()}</p>
    </li>
  ))}
</ul>
```

## Data Fetching in Astro

Astro allows you to fetch data from external sources during the build process:

```astro
---
// Fetch data at build time
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// Process the data
const items = data.items.slice(0, 5); // Get first 5 items
---

<h2>Latest Items</h2>
<ul>
  {items.map(item => (
    <li>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </li>
  ))}
</ul>
```

### Server Endpoints

You can create API endpoints in Astro by adding `.js` or `.ts` files to the `src/pages/` directory:

```javascript
// src/pages/api/items.json.js
export async function get() {
  // Fetch or generate data
  const data = {
    items: [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
    ]
  };
  
  return {
    body: JSON.stringify(data),
  };
}
```

This creates an endpoint at `/api/items.json` that returns JSON data.

## Styling in Astro

Astro offers several ways to style your components:

### Scoped Styles

Styles defined within an Astro component are automatically scoped to that component:

```astro
<style>
  /* These styles only apply to this component */
  h1 {
    color: purple;
    font-size: 2rem;
  }
</style>
```

### Global Styles

For global styles, you can create a styles file and import it in your layout:

```astro
---
// src/layouts/MainLayout.astro
import '../styles/global.css';
---

<html>
  <!-- Layout content -->
</html>
```

### CSS Frameworks

Astro works well with CSS frameworks like Tailwind CSS. To add Tailwind:

```bash
npm install -D @astrojs/tailwind tailwindcss
```

Update your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

## Conclusion

In this second part of our Astro series, we've explored components, content management with Markdown and MDX, data fetching, and styling options. These features make Astro a powerful tool for building content-focused websites.

Astro's component model gives you the flexibility to build reusable UI elements while maintaining excellent performance. The built-in support for Markdown and content collections makes it easy to manage blog posts, documentation, and other content types.

In [Part 3](/astro-get-started-part-3), we'll cover deployment, optimization, and advanced features to take your Astro site to the next level.

---

Want to review the basics? Head back to [Part 1: Introduction and Setup](/astro-get-started-part-1). Ready for more advanced topics? Continue to [Part 3: Deployment and Advanced Features](/astro-get-started-part-3).