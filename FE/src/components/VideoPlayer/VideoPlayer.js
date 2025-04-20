import React from 'react';
export default function VideoPlayer({ src }) {
  return <video controls src={src} style={{ width: '100%' }} />;
}