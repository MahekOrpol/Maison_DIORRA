export function BlogsBanner({ imgUrl, title, subtitle, className = '' }) {
  return (
    <div
      className={`relative flex h-[450px] w-full flex-col items-center justify-center bg-cover bg-center text-white ${className}`}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className='absolute inset-0 bg-black/40' />
      <h1 className='font-rozha relative z-10 text-center text-3xl font-light md:text-6xl'>
        {title}
      </h1>
      <p className='text-xl'>{subtitle}</p>
    </div>
  );
}
