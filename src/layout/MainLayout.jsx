import React, { useState, useEffect } from 'react'
import NavBar from '../components/shared/NavBar/NavBar'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'
import Loader from '../components/Loader/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

import Footer from '../components/shared/Footer/Footer';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default function MainLayout() {
    const navigation = useNavigation();
    const location = useLocation();
    const isLoading = navigation.state === 'loading';

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300">
            <NavBar />
            
            <main className="flex-grow">
                {isLoading ? (
                    <Loader />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                )}
            </main>

            <ScrollToTop />
            <Footer />
        </div>
    )
}
