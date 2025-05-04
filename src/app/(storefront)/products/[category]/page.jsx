import { notFound, redirect } from 'next/navigation';

export default function Page({ params }) {
  const { category } = params;
  console.log(category);
  const allowedCategories = ['rings', 'earrings', 'pendants', 'bracelets'];

  if (allowedCategories.includes(category)) {
    redirect(`/products/${category}/all`);
  } else {
    notFound();
  }
}
