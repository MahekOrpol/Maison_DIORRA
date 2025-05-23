import { baseApiUrl } from '../utils';

const BASE_URL = `${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1`;

export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/product/get?categoryName=${encodeURIComponent(category)}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function getListingFilterOptions() {}

export async function getProductsByFilters() {}

export async function getProductById(id) {}

export async function getProductDetailsByFilters({ query }) {}
