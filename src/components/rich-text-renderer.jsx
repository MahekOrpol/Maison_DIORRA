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
        .rich-text-content {
          font-family: system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #111;
          background-color: #fff;
          word-break: break-word;
        }

        /* Headings */
        .rich-text-content h1,
        .rich-text-content h2,
        .rich-text-content h3,
        .rich-text-content h4,
        .rich-text-content h5,
        .rich-text-content h6 {
          font-weight: bold;
          color: #000;
          margin: 2rem 0 1rem;
        }

        .rich-text-content h1 { font-size: 2.25rem; }
        .rich-text-content h2 { font-size: 1.875rem; }
        .rich-text-content h3 { font-size: 1.5rem; }
        .rich-text-content h4 { font-size: 1.25rem; }
        .rich-text-content h5 { font-size: 1.125rem; }
        .rich-text-content h6 { font-size: 1rem; }

        /* Paragraphs */
        .rich-text-content p {
          margin: 1rem 0;
        }

        /* Links */
        .rich-text-content a {
          color: #000;
          text-decoration: underline;
        }

        .rich-text-content a:hover {
          text-decoration: none;
        }

        /* Unordered Lists */
        .rich-text-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style: disc;
        }

        .rich-text-content ul li {
          margin: 0.5rem 0;
        }

        /* Ordered Lists (styled with dots) */
        .rich-text-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style: none;
        }

        .rich-text-content ol li {
          margin: 0.5rem 0;
          position: relative;
          padding-left: 1.2rem;
        }

        .rich-text-content ol li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #000;
          font-weight: bold;
        }

        /* Images */
        .rich-text-content img {
          max-width: 40%;
          height: auto;
          margin: 1.5rem 0;
          border-radius: 4px;
          display: block;
        }

        /* Blockquotes */
        .rich-text-content blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          border-left: 4px solid #000;
          background-color: #f5f5f5;
          color: #000;
          font-style: italic;
        }

        /* Inline code */
        .rich-text-content code:not(pre code) {
          background-color: #e5e5e5;
          color: #000;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.95em;
        }

        /* Code blocks */
        .rich-text-content pre {
          background: #f0f0f0;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #000;
        }

        .rich-text-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }

        /* Tables */
        .rich-text-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background-color: #fff;
          color: #000;
          overflow-x: auto;
          display: block;
        }

        .rich-text-content table th,
        .rich-text-content table td {
          border: 1px solid #ccc;
          padding: 0.75rem;
          text-align: left;
        }

        .rich-text-content table th {
          background-color: #eee;
        }

        /* Other formatting */
        .rich-text-content strong {
          font-weight: bold;
          color: #000;
        }

        .rich-text-content em {
          font-style: italic;
          color: #000;
        }

        .rich-text-content hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 2rem 0;
        }

        .rich-text-content br {
          display: block;
          margin: 0.5rem 0;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .rich-text-content {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .rich-text-content h1 { font-size: 1.8rem; }
          .rich-text-content h2 { font-size: 1.5rem; }
          .rich-text-content h3 { font-size: 1.25rem; }
          .rich-text-content h4 { font-size: 1.125rem; }
          .rich-text-content h5,
          .rich-text-content h6 {
            font-size: 1rem;
          }

          .rich-text-content pre {
            font-size: 0.85rem;
          }

          .rich-text-content code:not(pre code) {
            font-size: 0.9em;
          }
        }

        @media (max-width: 480px) {
          .rich-text-content {
            font-size: 0.9rem;
          }

          .rich-text-content h1 { font-size: 1.5rem; }
          .rich-text-content h2 { font-size: 1.25rem; }
          .rich-text-content h3 { font-size: 1.125rem; }
          .rich-text-content h4,
          .rich-text-content h5,
          .rich-text-content h6 {
            font-size: 1rem;
          }

          .rich-text-content pre {
            font-size: 0.8rem;
          }

          .rich-text-content img {
            max-width: 100%;
          }
        }
      `}</style>
    </article>
  );
};
