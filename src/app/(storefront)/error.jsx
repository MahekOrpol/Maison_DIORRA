'use client';

export default function Error({ reset }) {
  return (
    <div className='mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12'>
      <h2 className='text-xl font-bold'>
        <span className='block text-center font-light text-red-500'>
          Something went wrong
        </span>
        <br />
        Oh no!{' '}
      </h2>
      <p className='my-2'>
        There was an issue with our storefront. This could be a temporary issue,
        please try your action again.
      </p>
      <button
        className='bg-primary text-primary-foreground mx-auto mt-4 flex w-full items-center justify-center rounded-full p-4 tracking-wide hover:opacity-90'
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
