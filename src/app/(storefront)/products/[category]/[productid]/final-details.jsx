export default function FinalDetails({ data, className }) {
  const details = [
    {
      category: 'Know your Setting',
      icon: '/icons/ring-fv.svg',
      items: [
        {
          icon: <AiOutlineColumnHeight size={20} />,
          label: 'RING DIAMETER',
          value: data.ringDetails.diameter,
          desc: 'Measured at the base of the ring.'
        },
        {
          icon: <LiaBalanceScaleSolid size={22} />,
          label: 'APPROX CTW',
          value: data.ringDetails.ctw,
          desc: 'Measured at the base of the ring.'
        },
        {
          icon: <AiOutlineGold size={20} />,
          label: 'METAL',
          value: data.ringDetails.metal,
          desc: 'It comes with the authenticity and guarantee certificate of 925 Silver with lifetime exchange guarantee.',
          fullWidth: true
        }
      ]
    },
    {
      category: 'Diamond Details',
      icon: '/icons/ring-top-fv.svg',
      items: [
        {
          icon: <IoDiamondOutline size={20} />,
          label: 'DIAMOND SHAPE',
          value: data.diamondDetails.shape
        },
        {
          icon: <AiOutlineColumnHeight size={20} />,
          label: 'DIAMOND SIZE',
          value: data.diamondDetails.size
        },
        {
          icon: <RiWeightLine size={20} />,
          label: 'DIAMOND WEIGHT',
          value: '0.18 Ct Approx'
        },
        {
          icon: <PiDiamondsFour size={20} />,
          label: 'DIAMOND CLARITY',
          value: data.diamondDetails.clarity
        }
      ]
    }
  ];
  return (
    <section className={cn(className)}>
      <h2 className='border-b pb-4 text-2xl font-medium md:font-medium lg:text-3xl xl:pt-4 2xl:text-4xl'>
        Ring and Stone Details:
        <hr className='mb-2' />
      </h2>
      <div className='bg-secondary grid grid-cols-1 gap-4 px-2 pt-2 pb-8 sm:px-4 sm:pt-4 md:grid-cols-2 md:gap-8 md:px-8'>
        {details.map(({ category, icon, items }) => (
          <div key={category}>
            <div className='mb-2 flex items-center gap-4 text-lg font-medium md:mb-4 lg:text-2xl'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white'>
                <Image
                  src={icon}
                  alt={category}
                  width={20}
                  height={20}
                  className='h-5 w-5 md:h-6 md:w-6'
                />
              </div>
              {category}
            </div>
            <div className='grid grid-cols-2 gap-2 md:gap-4'>
              {items.map(({ icon, label, value, desc, fullWidth }, index) => (
                <div
                  key={index}
                  className={`flex min-h-[142px] flex-col gap-2 rounded-md bg-white p-2 md:p-4 ${
                    fullWidth ? 'col-span-2' : ''
                  }`}
                >
                  <div className='inline-flex gap-2 text-xs font-light sm:text-sm'>
                    {icon}
                    {label}
                  </div>
                  <div className='xs:text-xl text-lg leading-6 font-semibold lg:text-2xl'>
                    {value}
                  </div>
                  {desc && <p className='text-xs'>{desc}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
