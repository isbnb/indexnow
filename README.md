# IndexNow Submitter

A powerful, production-ready web application that helps website owners submit their sitemap URLs instantly to search engines using the IndexNow protocol. Built with React, TypeScript, and Tailwind CSS.

![IndexNow Submitter](./public/thumbnail.png)

## 🚀 Features

### Core Functionality
- **Sitemap URL Extraction**: Automatically parse XML sitemaps and extract all URLs
- **Bulk URL Selection**: Select up to 100 URLs per submission with search and filter capabilities
- **IndexNow API Integration**: Submit URLs directly to search engines (Bing, Yandex, etc.)
- **API Key Generator**: Generate secure 32-character alphanumeric API keys
- **Real-time Results**: Get instant feedback on submission status

### User Experience
- **Step-by-Step Wizard**: Intuitive 5-step process with visual progress tracking
- **Mobile-First Design**: Fully responsive interface optimized for all devices
- **Beautiful UI**: Modern design with smooth animations and micro-interactions
- **Error Handling**: Comprehensive error messages and recovery suggestions
- **Custom 404 Page**: Professional error page with helpful navigation

### Technical Features
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and structured data
- **Performance**: Optimized bundle size and fast loading times
- **Security**: CORS protection and secure API key handling
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Backend**: Netlify Functions (for CORS proxy)

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ApiKeyGenerator.tsx    # API key generation tool
│   ├── Footer.tsx            # Site footer
│   ├── Header.tsx            # Site header with navigation
│   ├── IndexNowConfig.tsx    # IndexNow API configuration
│   ├── NotFound.tsx          # Custom 404 error page
│   ├── SitemapInput.tsx      # Sitemap URL input form
│   ├── SubmissionResults.tsx # Results display
│   ├── UrlExtraction.tsx     # URL extraction logic
│   └── UrlSelection.tsx      # URL selection interface
├── config/
│   └── site.ts              # Site configuration and metadata
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles

public/
├── _redirects              # Netlify redirects configuration
├── favicon.svg             # SVG favicon
└── thumbnail.png           # Open Graph image

netlify/
└── functions/
    └── submit-indexnow.js  # Serverless function for API calls
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indexnow-submitter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Site Configuration

Edit `src/config/site.ts` to customize:

```typescript
export const siteConfig: SiteConfig = {
  name: 'IndexNow Submitter',
  description: 'Your description here',
  url: 'https://your-domain.com',
  ogImage: 'https://your-domain.com/thumbnail.png',
  // ... other settings
};
```

### Environment Variables

No environment variables are required for basic functionality. The app uses:
- Dynamic domain detection for canonical URLs
- Client-side routing with Netlify redirects
- CORS proxy via Netlify Functions

## 📖 Usage Guide

### For End Users

1. **Enter Sitemap URL**: Provide your XML sitemap URL
2. **Extract URLs**: The app automatically parses your sitemap
3. **Select URLs**: Choose up to 100 URLs to submit
4. **Configure API**: Enter your IndexNow API credentials
5. **Review Results**: See submission status and any errors

### API Key Generation

1. Visit `/api` page
2. Click "Generate API Key" 
3. Download the generated `.txt` file
4. Upload to your website's root directory
5. Use the key in the submission form

## 🔒 Security Features

- **CORS Protection**: Secure cross-origin requests
- **Input Validation**: Comprehensive form validation
- **XSS Prevention**: Sanitized user inputs
- **Secure Headers**: Security headers via Netlify
- **API Key Security**: Client-side key handling best practices

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) to Indigo (#4f46e5) gradient
- **Secondary**: Purple, Green, Orange, Emerald for step indicators
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: System font stack with proper hierarchy
- **Body**: Optimized line height (150%) for readability
- **Code**: Monospace font for API keys and URLs

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Responsive Breakpoints**: Mobile-first approach
- **Component Spacing**: Logical grouping with proper margins

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy**: Automatic deployments on push to main branch

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting provider

3. **Configure redirects** for single-page application routing

## 🔍 SEO Features

### Meta Tags
- Complete Open Graph implementation
- Twitter Card optimization
- Canonical URLs with dynamic domain detection
- Proper meta descriptions and keywords

### Structured Data
- **WebApplication** schema for the main app
- **BreadcrumbList** for navigation structure  
- **HowTo** schema for the step-by-step process
- **Organization** schema for branding

### Performance
- Optimized images and assets
- Lazy loading where appropriate
- Minimal bundle size
- Fast loading times

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Write descriptive commit messages
- Test on multiple devices and browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**CORS Errors**: The app uses a CORS proxy via Netlify Functions. If you encounter CORS issues, ensure the Netlify Function is deployed correctly.

**API Key Issues**: Ensure your API key file is:
- Named correctly (e.g., `your-key.txt`)
- Uploaded to your website's root directory
- Accessible via HTTPS
- Contains only the API key (no extra characters)

**Sitemap Parsing**: Supported formats:
- Standard XML sitemaps (`<url><loc>`)
- Sitemap index files (`<sitemap><loc>`)
- Must be valid XML format

### Getting Help

- Check the [IndexNow Documentation](https://www.indexnow.org/documentation)
- Review the [FAQ](https://www.indexnow.org/faq)
- Open an issue on GitHub for bugs or feature requests

## 🙏 Acknowledgments

- [IndexNow Protocol](https://www.indexnow.org/) for the API specification
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Netlify](https://netlify.com/) for hosting and serverless functions

---

**Made with ❤️ for better SEO workflows**