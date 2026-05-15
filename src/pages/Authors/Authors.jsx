import React, { useMemo } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { User, Book as BookIcon, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Authors = () => {
    const books = useLoaderData();

    const authorsData = useMemo(() => {
        const authorsMap = books.reduce((acc, book) => {
            if (!acc[book.author]) {
                acc[book.author] = {
                    name: book.author,
                    image: book.authorImage,
                    books: [],
                    totalRating: 0,
                    categories: new Set()
                };
            }
            acc[book.author].books.push(book);
            acc[book.author].totalRating += book.rating;
            acc[book.author].categories.add(book.category);
            return acc;
        }, {});

        return Object.values(authorsMap).map(author => ({
            ...author,
            avgRating: (author.totalRating / author.books.length).toFixed(1),
            categories: Array.from(author.categories)
        }));
    }, [books]);

    return (
        <div className="container mx-auto my-12 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Meet Our <span className="text-green-500">Authors</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorsData.map((author, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={`/author/${author.name}`} className="block bg-base-100 p-8 rounded-[32px] border shadow-sm hover:shadow-2xl transition-all group h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-green-100 group-hover:border-green-500 transition-colors">
                                    <img 
                                        src={author.image} 
                                        alt={author.name} 
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold group-hover:text-green-500 transition-colors">{author.name}</h3>
                                    <p className="text-gray-500">{author.books.length} {author.books.length > 1 ? 'Books' : 'Book'} Published</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1 font-medium"><Star className="w-4 h-4 text-orange-400 fill-orange-400" /> Avg. Rating:</span>
                                    <span className="font-bold">{author.avgRating}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {author.categories.map((cat, i) => (
                                        <span key={i} className="badge bg-gray-100 text-gray-600 border-none px-3 py-1 font-medium">{cat}</span>
                                    ))}
                                </div>

                                <div className="pt-6 border-t mt-6">
                                    <p className="text-sm font-bold mb-3 uppercase tracking-wider text-gray-400 text-xs">Featured Works</p>
                                    <div className="space-y-3">
                                        {author.books.slice(0, 2).map((book, i) => (
                                            <div 
                                                key={i}
                                                className="flex items-center gap-3 text-gray-600"
                                            >
                                                <BookIcon className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium text-sm line-clamp-1">{book.bookName}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Authors;
