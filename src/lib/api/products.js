const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;

export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/product/get?categoryName=${encodeURIComponent(category)}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}
