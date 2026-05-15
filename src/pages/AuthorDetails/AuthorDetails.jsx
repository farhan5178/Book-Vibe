import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Briefcase, Heart, Award } from 'lucide-react';
import BookCard from '../../components/Ui/BookCard';

const AuthorDetails = () => {
    const books = useLoaderData();
    const { authorName } = useParams();

    const authorData = books.find(b => b.author === authorName);
    const authorBooks = books.filter(b => b.author === authorName);

    if (!authorData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold">Author not found</h2>
            </div>
        );
    }

    const { author, authorImage, authorBio, hometown, birthDate, deathDate, profession } = authorData;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12"
        >
            {/* Main Profile Section */}
            <div className="glass-card rounded-[40px] p-8 md:p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-full lg:w-80 flex-shrink-0"
                    >
                        <div className="aspect-square rounded-[32px] overflow-hidden border-4 border-base-100 shadow-2xl">
                            <img 
                                src={authorImage} 
                                alt={author} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                                }}
                            />
                        </div>
                    </motion.div>

                    <div className="flex-1 space-y-8">
                        <div>
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="bg-green-500/10 text-green-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">Featured Author</span>
                                <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                                    <Star size={16} fill="currentColor" />
                                    <span>TOP RATED</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-base-content">{author}</h1>
                            <p className="text-xl opacity-80 leading-relaxed max-w-3xl italic font-medium border-l-4 border-green-500/30 pl-6">
                                "{authorBio}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            {[
                                { icon: MapPin, label: "Hometown", value: hometown },
                                { icon: Briefcase, label: "Profession", value: profession },
                                { icon: Calendar, label: "Born", value: birthDate },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-content/5 group hover:bg-green-500/5 transition-colors">
                                    <div className="w-12 h-12 bg-base-100 rounded-xl flex items-center justify-center shadow-sm text-green-500 group-hover:scale-110 transition-transform border border-base-content/5">
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-lg font-bold">{item.value || 'Not Available'}</p>
                                    </div>
                                </div>
                            ))}

                            {deathDate && deathDate !== "Alive" ? (
                                <div className="flex items-center gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-content/5 group hover:bg-red-500/5 transition-colors">
                                    <div className="w-12 h-12 bg-base-100 rounded-xl flex items-center justify-center shadow-sm text-red-500 group-hover:scale-110 transition-transform border border-base-content/5">
                                        <Heart size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Died</p>
                                        <p className="text-lg font-bold">{deathDate}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-content/5 group hover:bg-blue-500/5 transition-colors">
                                    <div className="w-12 h-12 bg-base-100 rounded-xl flex items-center justify-center shadow-sm text-blue-500 group-hover:scale-110 transition-transform border border-base-content/5">
                                        <Award size={22} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Status</p>
                                        <p className="text-lg font-bold">Presently Active</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-12 pt-8 border-t border-base-content/10">
                            <div>
                                <p className="text-4xl font-black text-green-500">{authorBooks.length}</p>
                                <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Books in Library</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black opacity-90">{(authorBooks.reduce((acc, curr) => acc + curr.rating, 0) / authorBooks.length).toFixed(1)}</p>
                                <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-2 bg-green-500 rounded-full"></div>
                            <h2 className="text-4xl font-black text-base-content">Explore Works</h2>
                        </div>
                        <p className="opacity-60 font-medium ml-5 text-lg">Discover all books by {author} available in our collection</p>
                    </div>
                    <div className="bg-green-500/10 text-green-600 px-6 py-2 rounded-2xl font-bold border border-green-500/20">
                        Total {authorBooks.length} Results
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {authorBooks.map(book => (
                        <BookCard key={book.bookId} book={book} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default AuthorDetails;
