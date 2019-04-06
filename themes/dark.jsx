import React from 'react';
import Theme from 'theme://default';

exports.default = props => (
  <>
    <Theme {...props} />
    <style jsx global>{`
      :root {
        --background: hsl(26, 10%, 11%);
        --text-color: hsl(26, 10%, 85%);
        --theme-color: hsl(26, 100%, 50%);
        --light-color: hsl(26, 10%, 30%);
        --anchor-color: hsl(26, 100%, 75%);
        --keyword-color: hsl(26, 20%, 70%);
        --keyword-background: hsl(26, 20%, 20%);
      }
    `}</style>
  </>
);
