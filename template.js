export default ({markup='Hellow World', css='css'}) => {
  return `<!doctype html>
    <html lang='en'>
    <head>
        <title>My Video Streaming page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/dist/favicon.ico">
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
       <body>
       <div id='root'>${markup}</div>
        <style id="jss-server-side">${css}</style>
       <script type='text/javascript' src='/dist/bundle.js'></script>
  
        </body>
     </html>
    `;
};
