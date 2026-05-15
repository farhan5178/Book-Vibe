import React, { useContext, useState, useMemo } from 'react'
import { BookContext } from '../../context/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Books() {
    const { storedBooks, wishlist } = useContext(BookContext);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract all unique categories
    const categories = useMemo(() => {
        const all = [...storedBooks, ...wishlist].map(b => b.category);
        return ['All', ...new Set(all)];
    }, [storedBooks, wishlist]);

    const sortAndFilterBooks = (books) => {
        let filtered = books;

        // 1. Search Filter
        if (searchQuery) {
            filtered = filtered.filter(book =>
                book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Category Filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(book => book.category === selectedCategory);
        }

        // 3. Sorting
        if (sortBy === 'Rating') {
            return [...filtered].sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'Number of pages') {
            return [...filtered].sort((a, b) => b.totalPages - a.totalPages);
        } else if (sortBy === 'Publisher') {
            return [...filtered].sort((a, b) => a.publisher.localeCompare(b.publisher));
        }
        return filtered;
    };

    const BookList = ({ books, type }) => {
        const processedList = sortAndFilterBooks(books);
        return (
            <div className="grid grid-cols-1 gap-6 mt-8">
                {processedList.length > 0 ? (
                    processedList.map((book) => (
                        <div key={book.bookId} className="flex flex-col md:flex-row border p-6 rounded-2xl gap-6 items-start md:items-center shadow-sm hover:shadow-md transition-shadow">
                            <figure className="bg-gray-100 p-4 rounded-xl flex items-center justify-center h-48 w-full md:w-40 shrink-0">
                                <img src={book.image} alt={book.bookName} className="h-full object-contain" />
                            </figure>
                            <div className="space-y-3 flex-1">
                                <h3 className="text-2xl font-bold">{book.bookName}</h3>
                                <p className="font-semibold text-gray-600">By: {book.author}</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex gap-2">
                                        <span className="font-bold">Tag</span>
                                        {book.tags.map((tag, i) => (
                                            <span key={i} className="badge bg-green-50 text-green-600 font-medium px-3 py-3">#{tag}</span>
                                        ))}
                                    </div>
                                    <div className="text-gray-500 flex items-center gap-2">
                                        <span>Publisher: {book.publisher}</span>
                                        <span className="hidden md:inline">|</span>
                                        <span>Pages: {book.totalPages}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <span className="badge badge-outline border-blue-200 text-blue-600 bg-blue-50 px-4 py-3">Category: {book.category}</span>
                                    <span className="badge badge-outline border-orange-200 text-orange-600 bg-orange-50 px-4 py-3">Rating: {book.rating}</span>
                                    <Link to={`/bookDetails/${book.bookId}`}>
                                        <button className="btn btn-sm btn-success rounded-full text-white px-6">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-base-200 rounded-[40px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center space-y-6"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-5xl">
                            📚
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Your {type} list is empty</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">Looks like you haven't added any books to your {type} list yet. Start exploring!</p>
                        </div>
                        <Link to="/">
                            <button className="btn btn-success text-white px-8 rounded-xl font-bold">Explore Books</button>
                        </Link>
                    </motion.div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto my-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gray-100 py-6 rounded-2xl">Listed Books</h2>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
                {/* Search Bar */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search books or authors..."
                        className="input input-bordered w-full pl-12 rounded-full focus:border-green-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {/* Category Filter */}
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn btn-outline border-gray-300 font-bold px-6">
                            Category: {selectedCategory} <RiArrowDropDownLine className="text-2xl" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                            {categories.map(cat => (
                                <li key={cat}><button onClick={() => setSelectedCategory(cat)}>{cat}</button></li>
                            ))}
                        </ul>
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn bg-green-500 text-white font-bold px-8 hover:bg-green-600 border-none">
                            {sortBy || 'Sort By'} <RiArrowDropDownLine className="text-3xl" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                            <li><button onClick={() => setSortBy('Rating')}>Rating</button></li>
                            <li><button onClick={() => setSortBy('Number of pages')}>Number of pages</button></li>
                            <li><button onClick={() => setSortBy('Publisher')}>Publisher</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Tabs>
                <TabList className="flex border-b border-gray-200 mb-0">
                    <Tab className="px-6 py-3 font-semibold text-lg cursor-pointer border-b-2 border-transparent outline-none transition-all focus:outline-none selected:border-green-500 selected:text-green-600 aria-selected:border-green-500 aria-selected:text-green-600">
                        Read Books
                    </Tab>
                    <Tab className="px-6 py-3 font-semibold text-lg cursor-pointer border-b-2 border-transparent outline-none transition-all focus:outline-none selected:border-green-500 selected:text-green-600 aria-selected:border-green-500 aria-selected:text-green-600">
                        Wishlist Books
                    </Tab>
                </TabList>

                <TabPanel>
                    <BookList books={storedBooks} type="read" />
                </TabPanel>
                <TabPanel>
                    <BookList books={wishlist} type="wishlist" />
                </TabPanel>
            </Tabs>
        </div>
    )
}
