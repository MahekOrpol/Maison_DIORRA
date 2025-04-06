import React from 'react';

export default function Page({ params }) {
  const { slug } = params;
  return <div> detils pagePage {slug}</div>;
}
