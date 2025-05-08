'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MdStarRate } from 'react-icons/md';

export default function ReviewModal({ isOpen, onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating.');
            return;
        }
        alert('Form submitted!');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='w-[92%] max-w-sm rounded-xl shadow-lg p-5 sm:p-6'>
                <DialogHeader>
                    <DialogTitle className='text-xl'>Share your thoughts</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='mt-3'>

                    {/* Rating */}
                    <div className='mb-4'>
                        <div className='w-full p-2 border rounded'>
                            <label className='block mb-2 text-sm'>Rate your experience <span className='text-red-500'>*</span></label>
                            <div className='flex space-x-1'>
                                {[...Array(5)].map((_, i) => {
                                    const index = i + 1;
                                    return (
                                        <MdStarRate
                                            key={i}
                                            className={`h-6 w-6 cursor-pointer transition-colors duration-150 ${index <= (hoverRating || rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHoverRating(index)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Headline */}
                    <input
                        type='text'
                        placeholder='Add a headline'
                        required
                        minLength={3}
                        className='w-full p-2 border rounded mb-4'
                    />

                    {/* Review */}
                    <textarea
                        placeholder='Write a review'
                        required
                        minLength={10}
                        className='w-full p-2 border rounded h-24 mb-4'
                    />

                    {/* Name and Email */}
                    <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                        <input
                            type='text'
                            placeholder='Your name'
                            required
                            className='w-full p-2 border rounded'
                        />
                        <input
                            type='email'
                            placeholder='Your email address'
                            required
                            className='w-full p-2 border rounded'
                        />
                    </div>

                    {/* Upload */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Add media (optional)</label>
                        <label className='flex px-4 py-2 border rounded cursor-pointer'>
                            <input type='file' multiple className='hidden' />
                            Choose Files
                        </label>
                        <p className='text-xs text-gray-600 mt-1'>
                            Upload up to 10 images and 3 videos (max. file size 2 GB)
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='w-full bg-black text-white px-6 py-2 rounded-full text-lg'
                    >
                        Send
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
