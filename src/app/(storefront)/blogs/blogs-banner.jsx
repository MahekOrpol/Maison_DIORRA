export function BlogsBanner({ imgUrl, title, subtitle, className = '' }) {
  return (
    <div
      className={`relative flex h-[240px] w-full flex-col items-center justify-center bg-cover bg-left text-white md:h-[320px] lg:h-[400px] lg:bg-center lg:text-black ${className}`}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className='0 absolute inset-0 max-[1024px]:bg-black/40' />
      <h1 className='font-rozha relative z-10 text-center text-3xl font-light md:text-6xl'>
        {title}
      </h1>
      <p className='relative z-10 text-lg md:text-xl'>{subtitle}</p>
    </div>
  );
}
