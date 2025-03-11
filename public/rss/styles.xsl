<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #24292e;
            max-width: 860px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          header {
            margin-bottom: 2rem;
          }
          h1 {
            font-weight: 600;
            font-size: 2rem;
            margin: 0;
          }
          h2 {
            font-weight: 600;
            font-size: 1.5rem;
            margin: 0;
          }
          .description {
            margin-top: 0.5rem;
            color: #6a737d;
          }
          .item {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eaecef;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-title {
            margin-bottom: 0.5rem;
          }
          .item-link {
            color: #0366d6;
            text-decoration: none;
          }
          .item-link:hover {
            text-decoration: underline;
          }
          .item-date {
            color: #6a737d;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          .item-description {
            margin-top: 0.5rem;
          }
          .meta {
            display: flex;
            align-items: center;
            margin-top: 1rem;
          }
          .meta-item {
            margin-right: 1rem;
            color: #6a737d;
            font-size: 0.9rem;
          }
          .meta-item a {
            color: #0366d6;
            text-decoration: none;
          }
          .meta-item a:hover {
            text-decoration: underline;
          }
          .meta-item svg {
            margin-right: 0.25rem;
            vertical-align: text-bottom;
          }
          .categories {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.5rem;
          }
          .category {
            background-color: #f1f8ff;
            border-radius: 2rem;
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
            color: #0366d6;
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <div class="description">
            <xsl:value-of select="/rss/channel/description" />
          </div>
          <div class="meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <a href="{/rss/channel/link}">Visit Website</a>
            </div>
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <a href="{/rss/channel/atom:link/@href}">RSS Feed</a>
            </div>
          </div>
        </header>
        <main>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2 class="item-title">
                <a class="item-link" href="{link}">
                  <xsl:value-of select="title" />
                </a>
              </h2>
              <div class="item-date">
                <xsl:value-of select="pubDate" />
              </div>
              <div class="item-description">
                <xsl:value-of select="description" />
              </div>
              <xsl:if test="category">
                <div class="categories">
                  <xsl:for-each select="category">
                    <span class="category">
                      <xsl:value-of select="." />
                    </span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
