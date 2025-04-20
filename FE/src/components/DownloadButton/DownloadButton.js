import React from 'react';
export default function DownloadButton({ fileUrl, filename }) {
  return (
    <a href={fileUrl} download={filename} style={{ display: 'block', marginTop: 5 }}>
      Download
    </a>
  );
}