import React, { useState, useEffect, Suspense } from 'react'
import Banner from '../../components/HomePage/Banner'
import AllBooks from '../../components/HomePage/AllBooks.jsx/AllBooks'
import FeaturedAuthors from '../../components/HomePage/FeaturedAuthors'
import BookSkeleton from '../../components/Ui/BookSkeleton'

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/booksData.json")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching books:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            {!loading && !searchQuery && (
                <FeaturedAuthors books={books} />
            )}

            <div className='my-12 container mx-auto px-4'>
                <h2 className='font-black text-4xl md:text-5xl text-center mb-16 text-base-content'>Explore Our <span className="text-green-500">Collection</span></h2>
                
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => <BookSkeleton key={i} />)}
                    </div>
                ) : (
                    <AllBooks searchQuery={searchQuery} books={books} />
                )}
            </div>
        </div>
    )
}
