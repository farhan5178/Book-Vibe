
import React, { use, useState } from 'react'
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
   
    const [storedBooks,setStoredBooks]=useState([]);
     const handleMarkAsRead=(currentBook)=>{
        console.log(currentBook)
        // step 1 store book id or store book object 

        // step 2 where to store 
        // step 3 array pf cullection 
        // step 4 if the book is alrealy exeist show  alert 
        const isExistBook=storedBooks.find(book=>book.bookId===currentBook.bookId);
        if(isExistBook){
            alert ("The Book Is already Exeists ")
        }else{
            setStoredBooks([...storedBooks,currentBook])
        }
        // step 5  if not then add the book in the array of collection 

     }

    return (
    
            <div className="grid grid-cols-2 bg-base-100 shadow-sm container mx-auto my-9">
  <figure className='w-full flex items-center justify-center bg-blue-50 rounded-2xl'>
    <img
    className='h-[400px] '
      src={image} />
  </figure>
  <div className="card-body space-y-3">
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
            
      <button className="btn " onClick={() => handleMarkAsRead(expectedBook)}>Mark as Read</button>
        
      <button onClick={()=>handleMarkAsRead(expectedBook)} className="btn btn-primary">Mark as Wishlist</button>
    </div>
    </div>
  </div>
</div>
        
    )
}
