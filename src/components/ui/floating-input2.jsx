export default function FloatingInput2({
  id,
  label,
  type = 'text',
  className = ''
}) {
  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        placeholder=' '
        className={`peer block w-full rounded-md border border-gray-300 bg-white px-2.5 pt-5 pb-2.5 text-sm text-gray-900 focus:border-black focus:ring-0 focus:outline-none ${className}`}
      />
      <label
        htmlFor={id}
        className='absolute top-2 left-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500'
      >
        {label}
      </label>
    </div>
  );
}
