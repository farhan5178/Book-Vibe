import React, { useMemo } from 'react'
import BookCard from '../../Ui/BookCard';

export default function AllBooks({ searchQuery, books }) {
    const filteredBooks = useMemo(() => {
        if (!books) return [];
        if (!searchQuery) return books;
        return books.filter(book =>
            book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [books, searchQuery]);

    if (!books || books.length === 0) return null;

    return (
        <div>
            {filteredBooks.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredBooks.map((book) => (
                        <BookCard key={book.bookId} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 glass-card rounded-[40px] border-2 border-dashed border-base-content/10">
                    <p className="text-2xl text-base-content/50 font-bold">No books found matching "{searchQuery}"</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-success btn-outline rounded-xl mt-6 font-bold"
                    >
                        Reset Search
                    </button>
                </div>
            )}
        </div>
    )
}
