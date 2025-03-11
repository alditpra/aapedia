---
title: "Getting Started with Astro - Part 1: Introduction and Setup"
meta_title: "Getting Started with Astro - Part 1: Introduction and Setup"
description: "Learn what Astro is, why it's gaining popularity, and how to set up your first Astro project in this comprehensive introduction."
date: 2023-10-20
image: "../../assets/images/astro-basics.svg"
authors: ["dragos"]
categories: ["Web Development"]
tags: ["astro", "jamstack", "static-site-generator"]
series: ["Astro Get Started", "1"]
---

## What is Astro?

Astro is a modern static site generator that allows you to build faster websites with less client-side JavaScript. It's designed to deliver lightning-fast performance by default, shipping zero JavaScript to the client unless specifically needed. This approach, known as "Islands Architecture," enables you to build interactive components where necessary while keeping the rest of your site as lightweight HTML and CSS.

## Why Choose Astro?

Astro offers several compelling advantages for modern web development:

- **Performance-focused**: Astro websites are exceptionally fast because they ship minimal JavaScript by default
- **Component-based**: Use components from your favorite UI frameworks (React, Vue, Svelte, etc.)
- **Easy learning curve**: If you know HTML, CSS, and some JavaScript, you can build with Astro
- **Flexible**: Works well for content-focused websites like blogs, marketing sites, and portfolios
- **Full-featured**: Built-in support for Markdown, MDX, file-based routing, and more
- **UI-agnostic**: Use components from React, Preact, Svelte, Vue, Solid, Lit, and others

```javascript
// Example of an Astro component
---
// This is the component's frontmatter (runs at build time)
const greeting = "Hello, Astro!";
---

<!-- This is the component's template -->
<h1>{greeting}</h1>
<p>Welcome to your first Astro site!</p>
```

## Setting Up Your First Astro Project

### Prerequisites

Before we begin, make sure you have the following installed:

- **Node.js** - version 16.12.0 or higher
- **Text editor** - VS Code with the Astro extension is recommended
- **Terminal** - To run commands

### Creating a New Astro Project

The easiest way to create a new Astro project is to use the automatic CLI tool. Open your terminal and run:

```bash
# Create a new project with npm
npm create astro@latest

# Or with yarn
yarn create astro

# Or with pnpm
pnpm create astro@latest
```

Follow the CLI prompts to set up your project. You can choose from several starter templates or begin with a minimal setup.

### Project Structure

After initialization, your Astro project will have a structure similar to this:

```
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Let's understand the key directories:

- **public/**: Static assets that will be copied to the build folder unchanged
- **src/components/**: Reusable UI components
- **src/layouts/**: Layout components that provide structure to your pages
- **src/pages/**: File-based routing - each .astro file becomes a route
- **astro.config.mjs**: Configuration file for your Astro project

### Running Your Project

To start the development server, run:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:3000`. Any changes you make to your files will be reflected immediately thanks to hot module reloading.

## Creating Your First Page

In Astro, pages are created as `.astro` files in the `src/pages` directory. Let's create a simple page:

```astro
---
// src/pages/about.astro
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>About Us</title>
  </head>
  <body>
    <h1>About Us</h1>
    <p>This is our first Astro page!</p>
    <a href="/">Back to home</a>
  </body>
</html>
```

Save this file as `about.astro` in the `src/pages` directory, and you'll be able to access it at `http://localhost:3000/about`.

## Using Layouts

Writing the full HTML structure for each page can be repetitive. Astro provides layouts to solve this problem:

```astro
---
// src/layouts/MainLayout.astro
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My Astro Site</title>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    <main>
      <slot /> <!-- Your content will be inserted here -->
    </main>
    <footer>
      &copy; 2023 My Astro Site
    </footer>
  </body>
</html>
```

Now you can simplify your pages by using this layout:

```astro
---
// src/pages/about.astro
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout>
  <h1>About Us</h1>
  <p>This is our first Astro page using a layout!</p>
</MainLayout>
```

## Conclusion

In this first part of our Astro series, we've covered the basics of what Astro is, why it's a great choice for modern web development, and how to set up your first project. We've also looked at creating pages and using layouts to maintain consistency across your site.

In Part 2, we'll dive deeper into Astro components, explore how to work with Markdown for content, and learn about Astro's data fetching capabilities. Stay tuned!

---

Ready to continue your Astro journey? Check out [Part 2: Components and Content](/astro-get-started-part-2) where we'll explore more advanced features of Astro.