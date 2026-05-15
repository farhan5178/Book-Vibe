import React from 'react';

const BookSkeleton = () => {
    return (
        <div className="flex flex-col border p-6 rounded-3xl gap-6 shadow-sm animate-pulse">
            <div className="bg-gray-200 h-64 w-full rounded-2xl"></div>
            <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
            </div>
        </div>
    );
};

export default BookSkeleton;
