const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;
export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/product/get`, {
    categoryName: category
  });
  return res.json();
}
