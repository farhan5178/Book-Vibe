import React, { useContext, useState, useMemo } from 'react'
import { BookContext } from '../../context/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Books() {
    const { storedBooks, wishlist, removeFromReadList, removeFromWishlist } = useContext(BookContext);
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
                        <div key={book.bookId} className="glass-card flex flex-col md:flex-row p-6 rounded-[32px] gap-8 items-start md:items-center transition-all duration-300 hover:shadow-2xl group">
                            <figure className="bg-base-200/50 p-6 rounded-2xl flex items-center justify-center h-52 w-full md:w-44 shrink-0 overflow-hidden">
                                <img src={book.image} alt={book.bookName} className="h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                            </figure>
                            <div className="space-y-4 flex-1">
                                <h3 className="text-3xl font-black text-base-content group-hover:text-green-500 transition-colors">{book.bookName}</h3>
                                <p className="font-bold opacity-70">By: {book.author}</p>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-xs uppercase tracking-widest opacity-50">Tags</span>
                                        <div className="flex flex-wrap gap-2">
                                            {book.tags.map((tag, i) => (
                                                <span key={i} className="badge bg-green-500/10 text-green-600 border-none font-extrabold px-3 py-3">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-60 font-bold text-sm">
                                        <span className="flex items-center gap-1">Publisher: {book.publisher}</span>
                                        <div className="w-1.5 h-1.5 bg-base-content/20 rounded-full"></div>
                                        <span>Pages: {book.totalPages}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <span className="badge badge-outline border-blue-200 text-blue-600 bg-blue-50 px-4 py-3">Category: {book.category}</span>
                                    <span className="badge badge-outline border-orange-200 text-orange-600 bg-orange-50 px-4 py-3">Rating: {book.rating}</span>
                                    <div className="flex gap-2">
                                        <Link to={`/bookDetails/${book.bookId}`}>
                                            <button className="btn btn-sm btn-success rounded-xl text-white px-6 font-bold">View Details</button>
                                        </Link>
                                        <button 
                                            onClick={() => type === 'read' ? removeFromReadList(book.bookId, book.bookName) : removeFromWishlist(book.bookId, book.bookName)}
                                            className="btn btn-sm btn-outline btn-error rounded-xl px-4 font-bold"
                                        >
                                            Remove
                                        </button>
                                    </div>
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
            <h2 className="text-4xl font-black text-center mb-12 bg-base-200/50 backdrop-blur-sm py-10 rounded-[32px] text-base-content border border-base-content/5 shadow-inner">
                Listed <span className="text-green-500">Books</span>
            </h2>

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
                <TabList className="flex border-b border-gray-200 mb-0 overflow-x-auto whitespace-nowrap">
                    <Tab className="px-6 py-3 font-semibold text-lg cursor-pointer border-b-2 border-transparent outline-none transition-all focus:outline-none selected:border-green-500 selected:text-green-600 aria-selected:border-green-500 aria-selected:text-green-600 flex items-center gap-3">
                        Read Books 
                        <span className="badge bg-green-500/10 text-green-600 border-none font-bold">{storedBooks.length}</span>
                    </Tab>
                    <Tab className="px-6 py-3 font-semibold text-lg cursor-pointer border-b-2 border-transparent outline-none transition-all focus:outline-none selected:border-green-500 selected:text-green-600 aria-selected:border-green-500 aria-selected:text-green-600 flex items-center gap-3">
                        Wishlist Books 
                        <span className="badge bg-green-500/10 text-green-600 border-none font-bold">{wishlist.length}</span>
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
