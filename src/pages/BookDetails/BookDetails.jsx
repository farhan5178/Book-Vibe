import React, { useContext } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom'
import { BookContext } from '../../context/BookProvider';
import BookCard from '../../components/Ui/BookCard';

export default function BookDetails() {
    const { bookId: bookParamsId } = useParams()
    const books = useLoaderData();
    const expectedBook = books.find(book => book.bookId == bookParamsId);

    if (!expectedBook) {
        return <div className="text-center py-20 text-2xl font-bold">Book not found!</div>
    }

    const { bookName,
        tags,
        author,
        yearOfPublishing,
        publisher,
        category,
        rating,
        totalPages,
        review,
        image,
        readLink,
        bookId } = expectedBook;

    const { handleMarkAsRead, handleWishList } = useContext(BookContext);

    // Suggested books: Same category, excluding current book, limit to 4
    const suggestedBooks = books
        .filter(book => book.category === category && book.bookId !== expectedBook.bookId)
        .slice(0, 4);

    return (
        <div className="container mx-auto my-9 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-base-100 shadow-sm rounded-3xl overflow-hidden border">
                <figure className='w-full flex items-center justify-center bg-blue-50 p-12'>
                    <img
                        className='h-[500px] object-contain shadow-2xl rounded-lg transition-transform hover:scale-105 duration-500'
                        src={image} 
                        alt={bookName} 
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1543005139-76408fb2d0c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                    />
                </figure>
                <div className="card-body p-8 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black leading-tight text-base-content">{bookName}</h2>
                    <p className="text-xl font-medium opacity-80">
                        By: <Link to={`/author/${author}`} className="text-green-500 hover:underline transition-colors">{author}</Link>
                    </p>
                    <div className='py-4 border-y border-base-content/10 text-lg font-bold text-green-500'>{category}</div>
                    <p className="leading-relaxed opacity-90"><span className="font-extrabold text-base-content">Review:</span> {review}</p>
                    <div className="flex flex-wrap gap-2 items-center pt-2">
                        <span className="font-extrabold mr-2 opacity-60 uppercase text-xs tracking-widest">Tags</span>
                        {tags.map((tag, index) => (
                            <div key={index} className='badge badge-lg text-green-500 bg-green-50 font-bold border-none'>
                                #{tag}
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t">
                        <div className='flex gap-12'>
                            <span className="text-gray-500 w-32">Number of pages:</span>
                            <span className="font-bold">{totalPages}</span>
                        </div>
                        <div className='flex gap-12'>
                            <span className="text-gray-500 w-32">Publisher:</span>
                            <span className="font-bold">{publisher}</span>
                        </div>
                        <div className='flex gap-12'>
                            <span className="text-gray-500 w-32">Year of Publishing:</span>
                            <span className="font-bold">{yearOfPublishing}</span>
                        </div>
                        <div className='flex gap-12'>
                            <span className="text-gray-500 w-32">Rating:</span>
                            <span className="font-bold">{rating}</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-4 pt-6'>
                        <button className="btn btn-outline px-8 rounded-xl font-bold border-gray-300 hover:bg-gray-100 hover:text-black" onClick={() => handleMarkAsRead(expectedBook)}>Read</button>
                        <button onClick={() => handleWishList(expectedBook)} className="btn bg-green-500 hover:bg-green-600 text-white px-8 rounded-xl font-bold border-none">Wishlist</button>
                        
                        {readLink && (
                            <a 
                                href={readLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn bg-blue-500 hover:bg-blue-600 text-white px-8 rounded-xl font-bold border-none flex-1 lg:flex-none"
                            >
                                Read Online
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Suggested Books Section */}
            {suggestedBooks.length > 0 && (
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold">Suggested Books in <span className="text-green-500">{category}</span></h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {suggestedBooks.map(book => (
                            <BookCard key={book.bookId} book={book} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
