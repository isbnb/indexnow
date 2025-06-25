export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  keywords: string[];
  social: {
    twitter?: string;
    github?: string;
  };
}

// Get the current domain dynamically
const getCurrentDomain = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR or build time
  return 'https://index.bookllo.com';
};

export const siteConfig: SiteConfig = {
  name: 'IndexNow Submitter',
  description: 'Submit your sitemap URLs instantly to search engines using IndexNow protocol. Generate API keys, extract URLs from sitemaps, and boost your SEO with fast indexing.',
  url: getCurrentDomain(),
  ogImage: `${getCurrentDomain()}/thumbnail.png`,
  author: 'IndexNow Submitter',
  keywords: [
    'IndexNow',
    'SEO',
    'search engine indexing',
    'sitemap submission',
    'API key generator',
    'Bing',
    'Yandex',
    'instant indexing',
    'XML sitemap',
    'search engine optimization'
  ],
  social: {
    // Add your social links here if needed
  }
};

export default siteConfig;