import React from 'react';

export default function Page({ params }) {
  const { slug } = params;
  return <div>Education details page {slug}</div>;
}
