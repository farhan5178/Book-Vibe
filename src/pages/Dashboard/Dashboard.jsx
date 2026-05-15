import React, { useContext, useMemo } from 'react';
import { BookContext } from '../../context/BookProvider';
import { BookOpen, Heart, FileText, LayoutGrid } from 'lucide-react';

const Dashboard = () => {
    const { storedBooks, wishlist } = useContext(BookContext);

    const stats = useMemo(() => {
        // 1. Total Pages
        const totalPages = storedBooks.reduce((acc, book) => acc + book.totalPages, 0);

        // 2. Favorite Category
        const categories = storedBooks.map(book => book.category);
        const categoryCounts = categories.reduce((acc, cat) => {
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});

        let topCategory = 'None';
        let maxCount = 0;
        for (const cat in categoryCounts) {
            if (categoryCounts[cat] > maxCount) {
                maxCount = categoryCounts[cat];
                topCategory = cat;
            }
        }

        return {
            totalRead: storedBooks.length,
            totalWishlist: wishlist.length,
            totalPages,
            topCategory
        };
    }, [storedBooks, wishlist]);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-base-100 p-8 rounded-3xl shadow-sm border hover:shadow-md transition-shadow flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10`}>
                <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
                <p className="text-gray-500 font-medium">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto my-12 px-4">
            <div className="bg-green-500 rounded-[40px] p-12 mb-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">Welcome Back, Reader!</h2>
                    <p className="text-xl opacity-90">Track your reading journey and stats all in one place.</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-[-20px] left-[20%] w-32 h-32 bg-white opacity-5 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Books Read" 
                    value={stats.totalRead} 
                    icon={BookOpen} 
                    color="bg-blue-500" 
                />
                <StatCard 
                    title="Wishlist Books" 
                    value={stats.totalWishlist} 
                    icon={Heart} 
                    color="bg-red-500" 
                />
                <StatCard 
                    title="Total Pages Read" 
                    value={stats.totalPages.toLocaleString()} 
                    icon={FileText} 
                    color="bg-green-500" 
                />
                <StatCard 
                    title="Favorite Genre" 
                    value={stats.topCategory} 
                    icon={LayoutGrid} 
                    color="bg-purple-500" 
                />
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities or tips could go here */}
                <div className="bg-base-100 p-10 rounded-[32px] border shadow-sm">
                    <h3 className="text-2xl font-bold mb-6">Your Reading Achievement</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Reading Goal (10 books)</span>
                            <span className="font-bold text-green-500">{Math.min(Math.round((stats.totalRead / 10) * 100), 100)}%</span>
                        </div>
                        <progress className="progress progress-success w-full h-4" value={stats.totalRead} max="10"></progress>
                        <p className="text-gray-500 italic">"A reader lives a thousand lives before he dies..."</p>
                    </div>
                </div>

                <div className="bg-base-100 p-10 rounded-[32px] border shadow-sm flex flex-col justify-center items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🏆</span>
                    </div>
                    <h3 className="text-2xl font-bold">Top Badge</h3>
                    <p className="text-gray-600 max-w-xs">
                        {stats.totalRead >= 5 ? "Silver Reader - You've explored many worlds!" : "New Explorer - Keep reading to earn badges!"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
