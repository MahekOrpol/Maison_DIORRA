'use client';

import React from 'react';

export const ProductCardSkeleton = () => {
    return (
        <div className="animate-pulse space-y-3">
            {/* Image placeholder */}
            <div className="bg-gray-200 h-[150px] xs:h-[200px] sm:h-[250px] rounded-md lg:h-[350px] xl:h-[400px]"></div>

            {/* Text placeholders */}
            <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded-md w-4/5"></div>
                <div className="bg-gray-200 h-4 rounded-md w-3/4"></div>
            </div>
            {/* Button placeholder */}
            <div className="mt-2">
                <div className="bg-gray-200 h-8 sm:h-10 rounded-md w-full border border-gray-300"></div>
            </div>
        </div>
    );
};

export const ProductListingSkeleton = ({ count = 8 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </>
    );
};