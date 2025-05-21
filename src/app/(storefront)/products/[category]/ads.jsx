import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Advertisement({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  backgroundImage,
  className,
  align = 'left' // Default alignment to left
}) {
  return (
    <div
      className={cn(
        'xs:min-h-[300px] relative -mx-3 flex min-h-[280px] w-screen items-center justify-center overflow-hidden rounded-none shadow-md sm:-mx-6 lg:mx-0 lg:w-full lg:rounded-lg',
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt='Advertisement Background'
        layout='fill'
        objectFit='cover'
        className='absolute inset-0 z-0'
      />
      {/* Content wrapper */}
      <div
        className={cn(
          'relative z-10 flex h-full w-xs max-w-2xl flex-col items-center justify-center rounded-md p-6 text-left text-white lg:items-start',
          align === 'right'
            ? 'ml-auto bg-gradient-to-l from-black/70 via-black/30 to-transparent sm:pr-10'
            : 'mr-auto bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:pl-16'
        )}
      >
        <h2 className='text-2xl font-bold md:text-3xl'>{title}</h2>
        <p className='mt-2 text-lg opacity-90'>{subtitle}</p>
        <Link href={buttonLink}>
          <Button className='bg-primary hover:bg-primary/80 mt-4 py-2 text-lg'>
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
