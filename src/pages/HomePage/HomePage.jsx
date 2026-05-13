import React from 'react'
import Banner from '../../components/HomePage/Banner'
import Books from '../AllBooks/AllBooks'
import AllBooks from '../../components/HomePage/AllBooks.jsx/AllBooks'

export default function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <AllBooks></AllBooks>
    </div>
  )
}
