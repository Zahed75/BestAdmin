import Product from "./Product";

export async function generateMetadata({ params, searchParams }) {
  const id = params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const product = await res.json();

  return {
    title: product.title,
    description: product.body,
  };
}

export default function Page() {
  return (
    <main className="">
      <Product />
    </main>
  );
}
