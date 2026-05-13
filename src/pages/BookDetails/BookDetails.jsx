
import React, { use } from 'react'
import { useLoaderData, useParams } from 'react-router'

// const booksPromise=fetch('/booksData.json').then(res=>res.json())

export default function BookDetails() {
    const {bookId:bookParamsId} = useParams()
    console.log(bookParamsId,"id")
    const books =useLoaderData();
    console.log("use loader data",books)
    const expectedBook=books.find(book=>book.bookId==bookParamsId);
   const {bookName,
    tags,
    author,
    yearOfPublishing,
    publisher,
    category,
    rating,
    totalPages,
    review,
    image,
    bookId}=expectedBook;
    console.log(expectedBook ,"expected book")
    return (
    
            <div className="grid grid-cols-2 bg-base-100 shadow-sm container mx-auto">
  <figure>
    <img
    className='h-[400px] flex-1'
      src={image} />
  </figure>
  <div className="card-body space-y-3 flex-1">
    <h2 className="card-title text-2xl">{bookName}</h2>
    <p>By:{author}</p>
    <p className='py-2 border-y'>Catagory :{category}</p>
    <p> Review:{review}</p>
    {
        tags.map((tag,index)=>(

            <div 
            key={index}
            className='badge text-green-500 bg-green-100 font-bold'>
                {tag}


            </div>

        ))
    }
    <div className=" border-t space-y-3">
        <div className='flex items-center justify-between gap-2'>
            <span>Number of pages: <span>{totalPages}</span></span>
        </div>
        <div className='flex items-center justify-between gap-2'>
            <span>Publisher: <span>{publisher}</span></span>
        </div>
        <div className='flex items-center justify-between gap-2'>
            <span>Published Time:<span>{yearOfPublishing}</span></span>
        </div>
    <div className='flex items-center gap-2'>
            
      <button className="btn ">Read</button>
        
      <button className="btn btn-primary">Wishlist</button>
    </div>
    </div>
  </div>
</div>
        
    )
}
