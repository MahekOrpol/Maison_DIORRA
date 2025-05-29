import {
  baraceletDetails,
  bracelet01,
  bracelet02,
  braceletData,
  earring01,
  earring02,
  earringData,
  earringDetails,
  necklace01,
  necklace02,
  necklaceData,
  necklaceDetails,
  ring01,
  ring02,
  ringData,
  ringDetails
} from '@/constants/data';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isMobile = () =>
  typeof window !== 'undefined' && window.innerWidth <= 768;

export function repeatProducts(count) {
  const sources = [ringData, earringData, braceletData, necklaceData].flat();
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(sources[i % sources.length]); // repeat from start if needed
  }

  return result;
}
export function repeatProductsV1(count) {
  const sources = [
    ring01,
    earring01,
    necklace01,
    bracelet01,
    ring02,
    earring02,
    necklace02,
    bracelet02
  ].flat();
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(sources[i % sources.length]); // repeat from start if needed
  }

  return result;
}

const productSources = {
  rings: [ring01, ring02],
  earrings: [earring01, earring02],
  pendants: [necklace01, necklace02],
  bracelets: [bracelet01, bracelet02]
};

export function repeatProductsByCategory(category, count) {
  const sources = productSources[category] || [];
  if (sources.length === 0) {
    throw new Error(`No products found for category: "${category}"`);
  }

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(sources[i % sources.length]);
  }

  return result;
}

export function getProductDetaisByCategory(category) {
  const productDetails = {
    rings: ringDetails,
    earrings: earringDetails,
    necklaces: necklaceDetails,
    bracelets: baraceletDetails
  };
  return productDetails[category];
}

export const baseApiUrl = 'https://dev.cloudbusiness.cloud';
// export const baseApiUrl = 'http://192.168.1.5:5000';

// export const baseApiUrl = 'https://massion-diorra-ywz5.onrender.com';
