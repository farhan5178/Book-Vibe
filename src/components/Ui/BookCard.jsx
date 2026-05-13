import React from 'react'
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router';
export default function BookCard({ book }) {
  return (
    < Link to={`/bookDetails/${book.bookId}`} className="card bg-base-100 shadow-sm">
      <figure className='p-6 '>
        <img className='rounded-xl h-[250px]'
          src={book.image}
          alt="Books" />
      </figure>
      <div className="card-body">
        <div className='flex items-center gap-2.5'>
          {book.tags.map((tag, index) => {
            return (
              <div key={index} className="badge badge-soft badge-success ">{tag
              }</div>
            )
          })
          }
        </div>

        <h2 className="card-title text-2xl ">

          {book.bookName}


        </h2>
        <p className='font-semibold text-lg'>{book.author}</p>
        <div className="card-actions justify-between border-t border-dashed pt-4 border-gray-300">
          <div className="font-semibold">{book.category}</div>
          <div className="font-semibold flex items-center gap-2 text-xl">{book.rating} <CiStar />

          </div>
        </div>
      </div>
    </Link>
  )
}
