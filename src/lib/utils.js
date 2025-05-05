import {
  bracelet01,
  bracelet02,
  braceletData,
  earring01,
  earring02,
  earringData,
  necklace01,
  necklace02,
  necklaceData,
  ring01,
  ring02,
  ringData
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
