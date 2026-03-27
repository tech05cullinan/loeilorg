import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  schema?: object;
}

export const SEO = ({ title, description, image, article, schema }: SEOProps) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://ais-pre-eo7cc2y3dv6mcyvlohw7gw-207514675638.europe-west2.run.app';
  const canonicalUrl = `${siteUrl}${pathname}`;
  const defaultImage = `${siteUrl}/og-image.jpg`; // Assuming an OG image exists or will be added
  const seoImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | L'œil ORG</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="L'œil ORG" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@loeilorg" />

      {/* Security Headers (Simulated via Meta Tags for SPA) */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
