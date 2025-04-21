import {
  braceletData,
  earringData,
  necklaceData,
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
