import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  // const product = await getProductBySlug(params.slug);
  const product = {
    title: 'Product Name',
    description: 'Product description comming soon',
    image:
      'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-WG_0.jpg?v=1695166735&width=1200&height=1200&crop=center'
  };

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} | Maison Diorra`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image, // Should be full URL
          width: 100,
          height: 63
        }
      ],
      locale: 'en_US'
    }
  };
}

export default function Page({ params }) {
  const { category } = params;
  console.log(category);
  const allowedCategories = ['rings', 'earrings', 'necklaces', 'bracelets'];

  if (allowedCategories.includes(category)) {
    redirect(`/products/${category}/all`);
  } else {
    notFound();
  }
}
