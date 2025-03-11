# Bitdoze Astro Blog Theme

A modern, responsive blog theme for Astro with support for tags, categories, and series. This theme is designed to be fast, SEO-friendly, and easy to customize.

## Features

- 🚀 **Built with Astro** - Benefit from Astro's speed and flexibility
- 📱 **Fully Responsive** - Looks great on all devices
- 🎨 **Customizable** - Easy to adapt to your brand
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and JSON-LD
- 📝 **Blog Ready** - Support for posts, categories, tags, and series
- 🔎 **Search Functionality** - Client-side search with Fuse.js
- 📊 **Pagination** - For blog posts, categories, tags, and authors
- 📰 **RSS Feed** - Automatically generated RSS feed
- 🗺️ **Sitemap** - Automatically generated sitemap
- 🖋️ **MDX Support** - Use components in your markdown
- 🔤 **Typography** - Beautiful typography with Tailwind CSS
- 🌙 **Icons** - Easy icon usage with Astro Icon

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── config/         # Site configuration
│   ├── content/        # Content collections (blog posts, authors, etc.)
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components and routes
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── astro.config.mjs    # Astro configuration
├── package.json        # Dependencies and scripts
```

### Key Directories and Files

- **src/config/**: Contains configuration files for the site, menus, and social links
- **src/content/**: Contains all content collections (blog posts, authors, pages)
- **src/layouts/**: Contains layout components used throughout the site
- **src/pages/**: Contains all page components and defines the routing structure

## Components

The theme includes several reusable components:

- **Layout.astro**: Main layout component with header and footer
- **PostLayout.astro**: Layout for blog posts with metadata and content
- **Header/Footer**: Navigation and site information
- **Pagination**: For navigating through multiple pages of content
- **Search**: Client-side search functionality
- **Author Card**: Display author information
- **Post Card**: Display post previews in lists
- **Tag/Category Cloud**: Display and filter by tags or categories

## Getting Started

### Prerequisites

- Node.js (version 16.12.0 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:bitdoze/bitdoze-astro-theme.git my-blog
   cd my-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:4321`

### Configuration

1. Update site information in `src/config/config.json`
2. Update site metadata in `src/config/site.ts`
3. Update menu items in `src/config/menu.json`
4. Update social links in `src/config/social.json`

### Creating Content

#### Blog Posts

Create a new `.md` or `.mdx` file in `src/content/posts/` with the following frontmatter:

```md
---
title: "Your Post Title"
meta_title: "SEO Title (optional)"
description: "Post description for SEO"
date: 2023-06-01
image: "../../assets/images/your-image.jpg"
authors: ["author-id"]
categories: ["category-name"]
tags: ["tag1", "tag2"]
series: ["Series Name", "Part Number"]
---

Your post content goes here...
```

#### Authors

Create a new `.md` file in `src/content/authors/` with the following frontmatter:

```md
---
title: "Author Name"
meta_title: "Author Name - Astro Blog Theme"
image: "../../assets/images/authors/author-image.jpg"
description: "Author description"
social:
  facebook: "https://facebook.com/username"
  twitter: "https://twitter.com/username"
  website: "https://example.com"
---

Author bio goes here...
```

## Customization

### Styling

This theme uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` to change colors, fonts, etc.
2. Adding custom CSS in `src/styles/global.css`

### Adding New Pages

Create a new `.astro` file in the `src/pages/` directory. The file path will determine the URL.

## Deployment

Build your site for production:

```bash
npm run build
```

The built site will be in the `dist/` directory, ready to be deployed to your favorite hosting platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Astro Icon](https://github.com/natemoo-re/astro-icon)
- Search functionality with [Fuse.js](https://fusejs.io)