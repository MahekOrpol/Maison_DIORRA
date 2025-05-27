'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MdStarRate } from 'react-icons/md';
import { baseApiUrl } from '@/lib/utils';

export default function ReviewModal({ isOpen, onClose, productId }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            rating: 0,
            fname: '',
            lname: '',
            msg: '',
            email: '',
            images: null,
            userId: '',
            productId: productId
        }
    });

    const [hoverRating, setHoverRating] = useState(0);
    const rating = watch('rating');

    // Get user data from localStorage
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        if (authUser) {
            setValue('userId', authUser.id);
            if (authUser.firstName) setValue('fname', authUser.firstName);
            if (authUser.lastName) setValue('lname', authUser.lastName);
            if (authUser.email) setValue('email', authUser.email);
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append all text fields
            formData.append('rating', data.rating.toString());
            formData.append('fname', data.fname);
            formData.append('lname', data.lname);
            formData.append('msg', data.msg);
            formData.append('email', data.email);
            formData.append('userId', data.userId);
            formData.append('productId', data.productId);

            // Handle image uploads more robustly
            if (data.images && data.images.length > 0) {
                // Convert FileList to array and append each file with proper metadata
                Array.from(data.images).forEach((file) => {
                    formData.append('images', file, file.name); // Added filename as third parameter
                });
            }

            // Debug: Log FormData contents before sending
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`${baseApiUrl}/api/v1/review/create/${data.productId}`, {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - FormData does this automatically with boundary
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review');
            }

            const result = await response.json();
            console.log('Review submitted successfully:', result);
            reset();
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
            alert(error.message || 'Failed to submit review. Please try again.');
        }
    };

    const handleRatingClick = (value) => {
        setValue('rating', value, { shouldValidate: true });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 10) {
            alert('Maximum 10 images allowed');
            return;
        }
        setValue('images', files);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='w-[92%] max-w-sm rounded-xl shadow-lg p-5 sm:p-6'>
                <DialogHeader>
                    <DialogTitle className='text-xl'>Share your thoughts</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
                    {/* Rating */}
                    <div className='mb-4'>
                        <div className='w-full p-2 border rounded'>
                            <label className='block mb-2 text-sm'>
                                Rate your experience <span className='text-red-500'>*</span>
                                {errors.rating && (
                                    <span className='ml-2 text-red-500 text-xs'>{errors.rating.message}</span>
                                )}
                            </label>
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
                                            onClick={() => handleRatingClick(index)}
                                            onMouseEnter={() => setHoverRating(index)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    );
                                })}
                            </div>
                            <input
                                type="hidden"
                                {...register('rating', {
                                    validate: (value) => value > 0 || 'Please select a rating'
                                })}
                            />
                        </div>
                    </div>

                    {/* First Name and Last Name */}
                    <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                        <div className='w-full'>
                            <input
                                type='text'
                                placeholder='First name'
                                {...register('fname', {
                                    required: 'First name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'First name must be at least 2 characters'
                                    }
                                })}
                                className={`w-full p-2 border rounded ${errors.fname ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.fname && (
                                <p className='mt-1 text-sm text-red-500'>{errors.fname.message}</p>
                            )}
                        </div>
                        <div className='w-full'>
                            <input
                                type='text'
                                placeholder='Last name'
                                {...register('lname', {
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Last name must be at least 2 characters'
                                    }
                                })}
                                className={`w-full p-2 border rounded ${errors.lname ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.lname && (
                                <p className='mt-1 text-sm text-red-500'>{errors.lname.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Review */}
                    <div className='mb-4'>
                        <textarea
                            placeholder='Write a review'
                            {...register('msg', {
                                required: 'Review is required',
                                minLength: {
                                    value: 10,
                                    message: 'Review must be at least 10 characters'
                                }
                            })}
                            className={`w-full p-2 border rounded h-24 ${errors.msg ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.msg && (
                            <p className='mt-1 text-sm text-red-500'>{errors.msg.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className='mb-4'>
                        <input
                            type='email'
                            placeholder='Your email address'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.email && (
                            <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
                        )}
                    </div>

                    {/* Upload */}
                    {/* Upload */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Add media (optional)</label>
                        <label className='flex px-4 py-2 border rounded cursor-pointer'>
                            <input
                                type='file'
                                multiple
                                accept='image/*'
                                className='hidden'
                                onChange={handleFileChange}
                            />
                            Choose Files
                        </label>
                        <p className='text-xs text-gray-600 mt-1'>
                            Upload up to 10 images (max. file size 2 GB each)
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-black text-white px-6 py-2 rounded-full text-lg disabled:opacity-70'
                    >
                        {isSubmitting ? 'Submitting...' : 'Send'}
                    </button>
                </form>
            </DialogContent>
        </Dialog >
    );
}