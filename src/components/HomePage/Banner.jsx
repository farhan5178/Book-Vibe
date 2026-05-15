import React from 'react'
import bookImg from '../../assets/book.png'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Banner({ searchQuery, setSearchQuery }) {
    return (
        <div className="container mx-auto px-4">
            <div className="hero glass-card min-h-[70vh] rounded-[48px] my-12 relative overflow-hidden group">
                {/* Decorative element */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
                
                <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between p-12 lg:p-24 relative z-10">
                    <div className="lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src={bookImg}
                            className="max-w-xs md:max-w-md rounded-2xl shadow-3xl animate-float group-hover:scale-105 transition-transform duration-1000"
                            alt="Featured Book"
                        />
                    </div>
                    <div className="lg:w-1/2 space-y-10 animate-fade-in-up">
                        <h1 className="text-5xl lg:text-8xl font-black leading-tight text-base-content">
                            Books to freshen up <br /> 
                            your <span className="text-green-500">bookshelf</span>
                        </h1>
                        
                        <div className="space-y-6">
                            <p className="text-xl opacity-70 max-w-md font-medium">
                                Discover thousands of books, connect with authors, and manage your reading list in one place.
                            </p>

                            {/* Search Bar in Banner */}
                            <div className="relative w-full max-w-xl group/search">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500 w-6 h-6 transition-transform group-focus-within/search:scale-110" />
                                <input
                                    type="text"
                                    placeholder="Search your favorite books or authors..."
                                    className="input input-bordered input-lg w-full pl-16 rounded-2xl border-base-content/10 bg-base-100/50 backdrop-blur-sm focus:border-green-500 focus:outline-none text-lg shadow-xl transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/books">
                                <button className="btn btn-success btn-lg text-white font-black px-12 rounded-2xl hover:shadow-2xl hover:shadow-green-500/20 active:scale-95 transition-all">
                                    View The List
                                </button>
                            </Link>
                            <Link to="/authors">
                                <button className="btn btn-outline btn-lg border-base-content/10 px-10 rounded-2xl hover:bg-base-content hover:text-base-100 transition-all">
                                    Meet Authors
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
