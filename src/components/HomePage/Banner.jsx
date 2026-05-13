import React from 'react'
import bookImg from '../../assets/book.png'

export default function Banner() {
  return (
    <div>
        <div className="hero bg-base-200 min-h-[70vh] rounded-2xl my-8 container mx-auto">
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <img
      src={bookImg}
      className="max-w-sm rounded-lg "
    />
    <div>
      <h1 className="text-5xl font-bold">Books to freshen up your <br /> bookshelf</h1>
     
      <button className="btn btn-success mt-4">View The List</button>
    </div>
  </div>
</div>
    </div>
  )
}
