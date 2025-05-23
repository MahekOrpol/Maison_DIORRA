import { useEffect, useState } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(0); // Default to 0 or a safe fallback

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);

      // Set initial width
      setWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return width;
}
function truncateText(text, maxChars) {
  return text.length > maxChars ? text.slice(0, maxChars) + '…' : text;
}

export { useWindowWidth, truncateText };
