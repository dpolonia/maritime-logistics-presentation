import React, { useEffect } from 'react';

const RevealStyles: React.FC = () => {
  useEffect(() => {
    // Import Reveal.js CSS only on client-side
    import('reveal.js/dist/reveal.css');
    import('reveal.js/dist/theme/white.css');
  }, []);

  return null;
};

export default RevealStyles;