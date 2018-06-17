import React from 'react';

export default ({ analyticsKey }) => (
  <script
    type="text/plain"
    className="_iub_cs_activate"
    dangerouslySetInnerHTML={{
      __html: `
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', '${analyticsKey}']);
      _gaq.push(['_trackPageview']);
      (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = ('https:' == iosdocument.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    `
    }}
  />
);
