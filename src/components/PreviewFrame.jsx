import React from 'react';

export default function PreviewFrame({ title, html, css }) {
  const srcDoc = `<!doctype html><html><head><meta charset='utf-8' />
<style>
  :root{color-scheme:dark}
  body{margin:0;padding:16px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; background:rgba(10,16,30,.2); color:#fff}
  *{box-sizing:border-box}
  ${css || ''}
</style>
</head><body>
${html}
</body></html>`;

  return (
    <div className="previewCard">
      <div className="previewHeader">{title}</div>
      <iframe
        className="previewFrame"
        sandbox="allow-same-origin"
        srcDoc={srcDoc}
        title={title}
      />
    </div>
  );
}
