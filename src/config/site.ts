// Site configuration
export const siteConfig = {
  // Site details
  name: "Astro Blog Theme",
  description: "A modern, responsive blog theme for Astro with support for tags, categories, and series.",
  url: "https://example.com",
  
  // Pagination settings
  postsPerPage: 10, // Number of posts per page
  
  // SEO settings
  noindex: {
    tags: true, // Set to true to add noindex meta tag to tag pages
    categories: false, // Set to true to add noindex meta tag to category pages
    authors: false, // Set to true to add noindex meta tag to author pages
  },
  
  // Default social image
  defaultImage: "/images/default-og.jpg",
};
