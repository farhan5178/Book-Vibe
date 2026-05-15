import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';


export const BookContext = createContext()

export default function BookProvider({ children }) {
    // Initialize state from local storage or empty array
    const [storedBooks, setStoredBooks] = useState(() => {
        const saved = localStorage.getItem('read-books');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist-books');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('read-books', JSON.stringify(storedBooks));
    }, [storedBooks]);

    useEffect(() => {
        localStorage.setItem('wishlist-books', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleMarkAsRead = (currentBook) => {
        const isExistBook = storedBooks.find(book => book.bookId === currentBook.bookId);
        if (isExistBook) {
            toast.error("The Book Is already Exeists ")
        } else {
            setStoredBooks([...storedBooks, currentBook])
            toast.success(`${currentBook.bookName} is added to read list`)
        }
    }

    const handleWishList = (currentBook) => {
        const isExistReadList = storedBooks.find(book => book.bookId === currentBook.bookId);
        if (isExistReadList) {
            toast.error("This book is already in read list")
            return;
        }
        const isExistBook = wishlist.find(book => book.bookId === currentBook.bookId);
        if (isExistBook) {
            toast.error("The Book Is already Exeists ")
        } else {
            setWishlist([...wishlist, currentBook])
            toast.success(`${currentBook.bookName} is added to wishlist`)
        }
    }

    const removeFromReadList = (bookId, bookName) => {
        const filtered = storedBooks.filter(book => book.bookId !== bookId);
        setStoredBooks(filtered);
        toast.info(`${bookName} removed from read list`);
    }

    const removeFromWishlist = (bookId, bookName) => {
        const filtered = wishlist.filter(book => book.bookId !== bookId);
        setWishlist(filtered);
        toast.info(`${bookName} removed from wishlist`);
    }

    const data = {
        storedBooks, 
        setStoredBooks, 
        handleMarkAsRead, 
        wishlist, 
        setWishlist, 
        handleWishList,
        removeFromReadList,
        removeFromWishlist
    }

    return <BookContext.Provider value={data}>
        {children}
    </BookContext.Provider>
}
