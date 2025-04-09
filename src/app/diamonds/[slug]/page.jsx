import CustomTagWrapper from '@/components/custom-tag-wrapper';
import ProductGallery from '@/features/product/components/product-gallery';
import DiamondDetails from '../components/diamond-details';

export default function Page() {
  return (
    <div className=''>
      <CustomTagWrapper className='wrapper xl:mb-14' />
      <div className='mx-auto mb-4 flex w-full max-w-[1600px] flex-col gap-6 lg:flex-row'>
        <ProductGallery className='lg:sticky lg:top-10 lg:h-fit lg:w-[45%]' />
        <DiamondDetails className='px-3 sm:px-6 lg:w-[55%] lg:pr-8 xl:pr-10' />
      </div>
      <DiamondClarityTable />
    </div>
  );
}

export const DiamondClarityTable = () => {
  const clarityGrades = [
    {
      grade: 'Flawless (FL)',
      meaning: 'No inclusions or blemishes using 10x magnification'
    },
    {
      grade: 'Internally Flawless (IF)',
      meaning: 'No inclusions using 10x magnification'
    },
    {
      grade: 'Very, Very Slightly Included (VVS1 and VVS2)',
      meaning:
        'Slight inclusions barely visible to a skilled diamond grader using 10x magnification'
    },
    {
      grade: 'Very Slightly Included (VS1 and VS2)',
      meaning:
        'Small inclusions ranging from difficult to somewhat easy to identify by a grader using 10x magnification'
    },
    {
      grade: 'Slightly Included (SI1 and SI2)',
      meaning: 'Inclusions are visible with 10x magnification'
    },
    {
      grade: 'Included (I1, I2 and I3)',
      meaning:
        'Obvious inclusions using 10x magnification which might affect brilliance and transparency'
    }
  ];

  return (
    <div className='wrapper my-6 md:my-10'>
      <h2 className='mb-3 border-b pb-4 text-2xl font-semibold text-gray-800 sm:text-3xl xl:text-4xl'>
        Understand Diamond Quality
      </h2>
      <p className='mb-6 text-sm md:text-base'>
        To determine the clarity of a diamond, the GIA (Gemological Institute of
        America) uses a diamond clarity scale, consisting of 11 grades:
      </p>

      {/* Desktop Table (shown on md screens and up) */}
      <div className='hidden overflow-hidden rounded-md border border-gray-600 text-lg font-medium shadow-sm md:block'>
        <table className='min-w-full divide-y divide-gray-600'>
          <thead className='bg-[#b8baba]'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium tracking-wider uppercase'
              >
                Clarity Grade
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium tracking-wider uppercase'
              >
                Meaning
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-400 bg-white'>
            {clarityGrades.map((item, index) => (
              <tr key={index} className='font-light'>
                <td className='px-6 py-2 whitespace-normal'>
                  <div className='text-sm font-medium'>{item.grade}</div>
                </td>
                <td className='px-6 py-2 whitespace-normal'>
                  <div className='text-sm'>{item.meaning}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (shown on sm screens and down) */}
      <div className='space-y-3 md:hidden'>
        {clarityGrades.map((item, index) => (
          <div
            key={index}
            className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'
          >
            <h3 className='text-sm font-medium text-gray-900'>{item.grade}</h3>
            <p className='mt-1 text-sm text-gray-500'>{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
