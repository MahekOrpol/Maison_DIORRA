// lib/api/home-sections.js

const BASE_URL = process.env.BACKEND_URL || 'https://api.yoursite.com';

export async function fetchHeroSection() {
  //   const res = await fetch(`${BASE_URL}/home/hero`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 3600 } // cache for 1 hour
  });
  return {
    slides: [
      {
        image: '/img/home-hero2.jpg',
        subtitle: "VALENTINE'S DAY",
        title: 'GET 20% OFF ON YOUR \n FIRST ORDER',
        ctaText: 'SHOP NOW',
        ctaLink: '/products/rings'
      },
      {
        image: '/img/hero2.jpg',
        subtitle: "VALENTINE'S DAY",
        title: 'GET 20% OFF ON YOUR \n FIRST ORDER 02',
        ctaText: 'SHOP NOW',
        ctaLink: '/products/rings'
      },
      {
        image: '/img/hero3.jpg',
        subtitle: "VALENTINE'S DAY",
        title: 'GET 20% OFF ON YOUR \n FIRST ORDER 03',
        ctaText: 'SHOP NOW',
        ctaLink: '/products/rings'
      }
    ],
    test: await res.json()
  };
}

export async function fetchCategories() {
  //   const res = await fetch(`${BASE_URL}/categories`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function fetchFavourites() {
  //   const res = await fetch(`${BASE_URL}/products/favourites`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 1800 } // cache for 30 min
  });
  return res.json();
}

export async function fetchGiftingCollections() {
  //   const res = await fetch(`${BASE_URL}/collections/gifting`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 1800 }
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
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 1800 }
  });
  return res.json();
}

export async function fetchTrendingCollections() {
  //   const res = await fetch(`${BASE_URL}/collections/trending`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 1800 }
  });
  return res.json();
}

export async function fetchBlogs() {
  //   const res = await fetch(`${BASE_URL}/blogs`, {
  const res = await fetch(`${BASE_URL}/test`, {
    next: { revalidate: 3600 }
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
    heroData,
    categoryData,
    favourites,
    gifting,
    diamonds,
    newArrivals,
    trending,
    blogs,
    testimonials
  ] = await Promise.all([
    fetchHeroSection(),
    fetchCategories(),
    fetchFavourites(),
    fetchGiftingCollections(),
    fetchDiamonds(),
    fetchNewArrivals(),
    fetchTrendingCollections(),
    fetchBlogs(),
    fetchTestimonials()
  ]);
  return {
    heroData,
    categoryData,
    favourites,
    gifting,
    diamonds,
    newArrivals,
    trending,
    blogs,
    testimonials
  };
}
