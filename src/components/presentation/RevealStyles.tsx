import React from 'react';
import Head from 'next/head';

const RevealStyles: React.FC = () => {
  return (
    <Head>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/reveal.min.css" 
        integrity="sha512-A5PKBHoJQHdKjxpwyV+XRWZWMcjPxroskfs5F95LggC1RBJRMgPuDQBX/T8KY6MWIxPIR7B9cKGzZK4vOBbug==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
      />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/theme/white.min.css" 
        integrity="sha512-RrJL9gr0t1RKbp5Ctt8UgiHnreUjUTSjVWQJw4T+tk+7UtTEibzei9pr0QBWZqJ9uR3EkL1JBr1TmMNEmzGngQ==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
      />
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.4.0/reveal.min.js" 
        integrity="sha512-uQGK5PG+lXhUcEkyCNXKF+FzPvn1hR7m4+IuUUk4ZjM+KNCfVCbX0compare8+GEQshyGDXLEb5y/hGaqYJMiNA==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer"
      ></script>
    </Head>
  );
};

export default RevealStyles;