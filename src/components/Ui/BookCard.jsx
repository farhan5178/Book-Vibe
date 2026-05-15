import React from 'react'
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';
export default function BookCard({ book }) {
  return (
    < Link to={`/bookDetails/${book.bookId}`} className="glass-card rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      <figure className='p-8 bg-base-200/50 rounded-2xl m-6 overflow-hidden'>
        <img 
          className='rounded-xl h-[230px] w-full object-contain transition-transform duration-700 group-hover:scale-110'
          src={book.image}
          alt={book.bookName} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1543005139-76408fb2d0c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
          }}
        />
      </figure>
      <div className="p-8 pt-0 space-y-4">
        <div className='flex flex-wrap items-center gap-2'>
          {book.tags.map((tag, index) => (
            <div key={index} className="badge bg-green-500/10 text-green-600 border-none font-bold px-4 py-3">{tag}</div>
          ))}
        </div>

        <h2 className="text-2xl font-bold line-clamp-1 group-hover:text-green-500 transition-colors">
          {book.bookName}
        </h2>
        
        <p className='font-medium opacity-70'>By: {book.author}</p>
        
        <div className="flex items-center justify-between border-t border-dashed pt-4 border-base-content/10">
          <div className="font-bold opacity-80">{book.category}</div>
          <div className="font-bold flex items-center gap-1.5 text-lg">
            <span>{book.rating}</span>
            <CiStar className="text-orange-400 text-2xl fill-orange-400" />
          </div>
        </div>
      </div>
    </Link>
  )
}
