// lib/api/home-sections.js

import { baseApiUrl } from '../utils';

const BASE_URL = `${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1`;

// export async function fetchHeroSection() {
//   const res = await fetch(`${BASE_URL}/home/hero`, {
// const res = await fetch(`${BASE_URL}/test`, {
// next: { revalidate: 3600 } // cache for 1 hour
//   });
//   return res.json();
// }

export async function fetchCategories() {
  // console.log(BASE_URL);
  const res = await fetch(`${BASE_URL}/category/get`, {
    // cache: 'force-cache'
    // next: { revalidate: 1800 } // Revalidate once every 24 hours (in seconds)
  });
  return res.json();
}

export async function fetchFavourites() {
  //   const res = await fetch(`${BASE_URL}/products/favourites`, {
  const res = await fetch(`${BASE_URL}/product/get-trending?limit=12`, {
    // next: { revalidate: 1800 } // cache for 30 min
  });
  return res.json();
}

export async function fetchGiftingCollections() {
  //   const res = await fetch(`${BASE_URL}/collections/gifting`, {
  const res = await fetch(`${BASE_URL}/gifting-guide/get`, {
    // next: { revalidate: 1800 }
  });
  return res.json();
}

export async function fetchDiamonds() {
  //   const res = await fetch(`${BASE_URL}/products/diamonds`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 1800 }
  });
  return res.json();
}

export async function fetchNewArrivals() {
  //   const res = await fetch(`${BASE_URL}/products/new`, {
  const res = await fetch(`${BASE_URL}/new-arrivals/get`, {
    // next: { revalidate: 1800 }
  });
  return res.json();
}

export async function fetchTrendingCollections(categoryName = 'rings') {
  //   const res = await fetch(`${BASE_URL}/collections/trending`, {
  const res = await fetch(
    `${BASE_URL}/product/get-trending?categoryName=${categoryName}&limit=4`,
    {
      // next: { revalidate: 1800 }
    }
  );
  return res.json();
}

export async function fetchBlogs() {
  //   const res = await fetch(`${BASE_URL}/blogs`, {
  const res = await fetch(`${BASE_URL}/blog/get`, {
    // next: { revalidate: 3600 }
  });
  return res.json();
}

export async function fetchTestimonials() {
  //   const res = await fetch(`${BASE_URL}/testimonials`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getHomePageData() {
  const [
    // heroData,
    categoryData,
    favourites,
    gifting,
    // diamonds,
    newArrivals,
    trending,
    blogs
    // testimonials
  ] = await Promise.all([
    // fetchHeroSection(),
    fetchCategories(),
    fetchFavourites(),
    fetchGiftingCollections(),
    // fetchDiamonds(),
    fetchNewArrivals(),
    fetchTrendingCollections(),
    fetchBlogs()
    // fetchTestimonials()
  ]);
  return {
    // heroData,
    categoryData,
    favourites,
    gifting,
    // diamonds,
    newArrivals,
    trending,
    blogs
    // testimonials
  };
}
