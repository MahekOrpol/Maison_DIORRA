export function Advertisement2() {
  <div className='mx-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:bg-black dark:text-white'>
    <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
      <p className='text-sm font-medium'>New arrivals just dropped 💍</p>
      <button
        onClick={() => router.push('/collection/new')}
        className='rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300'
      >
        Explore Now
      </button>
    </div>
  </div>;
}
