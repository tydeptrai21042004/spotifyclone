import React from 'react';
export default function Player({ src }) {
  return <audio controls src={src} style={{ width: '100%' }} />;
}