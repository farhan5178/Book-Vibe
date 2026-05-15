import React, { useEffect, useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react';
import { BookContext } from '../../../context/BookProvider';

export default function NavBar() {
    const { storedBooks, wishlist } = useContext(BookContext);
    const totalListedBooks = storedBooks.length + wishlist.length;
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const links = (
        <>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-semibold mr-2 px-3 py-1 rounded-lg transition-colors ${isActive
                            ? "text-green-500 border border-green-500"
                            : "hover:text-green-500"
                        }`
                    }
                    to="/"
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-semibold mr-2 px-3 py-1 rounded-lg transition-colors flex items-center gap-2 ${isActive
                            ? "text-green-500 border border-green-500"
                            : "hover:text-green-500"
                        }`
                    }
                    to="/books"
                >
                    Listed Books
                    {totalListedBooks > 0 && (
                        <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-green-500/30 -translate-y-1">
                            {totalListedBooks}
                        </span>
                    )}
                </NavLink>
            </li>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-semibold mr-2 px-3 py-1 rounded-lg transition-colors ${isActive
                            ? "text-green-500 border border-green-500"
                            : "hover:text-green-500"
                        }`
                    }
                    to="/page-to-read"
                >
                    Pages to Read
                </NavLink>
            </li>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-semibold mr-2 px-3 py-1 rounded-lg transition-colors ${isActive
                            ? "text-green-500 border border-green-500"
                            : "hover:text-green-500"
                        }`
                    }
                    to="/dashboard"
                >
                    Dashboard
                </NavLink>
            </li>

            <li>
                <NavLink
                    className={({ isActive }) =>
                        `font-semibold mr-2 px-3 py-1 rounded-lg transition-colors ${isActive
                            ? "text-green-500 border border-green-500"
                            : "hover:text-green-500"
                        }`
                    }
                    to="/authors"
                >
                    Authors
                </NavLink>
            </li>
        </>
    );

    return (
        <div className='glass-nav sticky top-0 z-50 transition-all duration-300'>
            <div className="container mx-auto navbar py-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className='text-3xl font-bold text-green-500'>Book Vibe</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {/* Theme Toggle - Smaller Size */}
                    <label className="swap swap-rotate cursor-pointer transition-transform hover:scale-110 active:scale-95 p-1">
                        <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} />
                        <Sun className="swap-on w-6 h-6 text-yellow-500" />
                        <Moon className="swap-off w-6 h-6 text-gray-400" />
                    </label>

                    <button className="btn btn-success text-white hidden sm:flex px-6 rounded-xl font-bold">Sign In</button>
                    <button className="btn btn-accent text-white hidden sm:flex px-6 rounded-xl font-bold">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
