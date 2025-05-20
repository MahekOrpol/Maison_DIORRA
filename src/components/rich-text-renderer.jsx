'use client';

import DOMPurify from 'dompurify';

export const RichTextRenderer = ({ html }) => {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <article className="rich-text-container">
      <div 
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: cleanHtml }} 
      />
      
      <style jsx global>{`
        /* Headings */
        .rich-text-content h1 {
          font-size: 2.2rem;
          margin: 2rem 0 1rem;
          font-weight: 700;
          line-height: 1.2;
          color: #111;
        }
        
        .rich-text-content h2 {
          font-size: 1.8rem;
          margin: 1.8rem 0 0.9rem;
          font-weight: 600;
          color: #222;
        }
        
        /* ... other heading styles ... */
        
        /* Images - full width */
        .rich-text-content img {
          width: 100%;
          height: auto;
          margin: 1.5rem 0;
          border-radius: 4px;
          display: block;
        }
        
         /* Ordered lists with dots only (no numbers) */
        .rich-text-content ol {
          margin: 1rem 0;
          padding-left: 1rem;
          list-style-type: none;
        }
        
        .rich-text-content ol li {
          margin: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .rich-text-content ol li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #333;
          font-weight: bold;
        }
        
        /* Blockquotes with improved styling */
        .rich-text-content blockquote {
          margin: 1.5rem 0;
          padding: 1.5rem 2rem;
          border-left: 4px solid #2563eb;
          background-color: #f8fafc;
          color: #334155;
          font-style: normal;
          position: relative;
          border-radius: 0 4px 4px 0;
        }
        
        .rich-text-content blockquote::before {
          content: '"';
          position: absolute;
          left: 1rem;
          top: 0.5rem;
          font-size: 3rem;
          color: #e2e8f0;
          font-family: serif;
          line-height: 1;
          z-index: 0;
        }
        
        .rich-text-content blockquote p {
          margin: 0.5rem 0;
          position: relative;
          z-index: 1;
        }
        
         /* Preformatted code blocks */
        .rich-text-content pre {
          border-radius: 6px;
          overflow-x: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .rich-text-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          white-space: pre;
        }
        
        /* Inline code */
        .rich-text-content code:not(pre code) {
          background-color: #e2e8f0;
          color: #334155;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.85em;
        }
      `}</style>
    </article>
  );
};