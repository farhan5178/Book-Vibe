import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const FeaturedAuthors = ({ books }) => {
    // Get unique authors and their book count
    const authorsMap = books.reduce((acc, book) => {
        if (!acc[book.author]) {
            acc[book.author] = {
                name: book.author,
                image: book.authorImage,
                count: 0,
                rating: 0
            };
        }
        acc[book.author].count += 1;
        acc[book.author].rating += book.rating;
        return acc;
    }, {});

    const authors = Object.values(authorsMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 4); // Show top 4 authors

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">
                        <Star size={14} fill="currentColor" />
                        Our Community
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                        Meet Our <br />
                        <span className="text-green-500 underline decoration-base-content/10 underline-offset-8">Featured Authors</span>
                    </h2>
                </div>
                <Link 
                    to="/authors" 
                    className="group flex items-center gap-3 text-lg font-bold hover:text-green-500 transition-colors"
                >
                    View All Authors
                    <div className="bg-base-200 group-hover:bg-green-500 group-hover:text-white p-3 rounded-xl transition-all">
                        <ArrowRight size={20} />
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {authors.map((author, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link 
                            to={`/author/${author.name}`}
                            className="glass-card group block p-6 rounded-[32px] text-center hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="relative mb-6 inline-block">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl mx-auto">
                                    <img 
                                        src={author.image} 
                                        alt={author.name} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                                        }}
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 font-bold shadow-lg">
                                    {author.count}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-base-content group-hover:text-green-500 transition-colors">
                                {author.name}
                            </h3>
                            <p className="text-sm opacity-60 font-medium mt-1">
                                Published {author.count} {author.count > 1 ? 'Books' : 'Book'}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedAuthors;
