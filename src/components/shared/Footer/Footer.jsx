import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-base-content/5 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <Link to="/" className="text-3xl font-black text-green-500">Book Vibe</Link>
                            <p className="mt-4 text-lg opacity-70 max-w-md">
                                Your ultimate destination for discovering great books and connecting with world-class authors. Start your reading journey today.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Subscribe to our newsletter</h4>
                            <div className="relative max-w-md">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pr-16 rounded-2xl bg-base-100 focus:border-green-500 outline-none"
                                />
                                <button className="btn btn-success absolute right-1 top-1 rounded-xl px-4 text-white">
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold">Quick Links</h4>
                        <ul className="space-y-4 font-medium opacity-80">
                            <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
                            <li><Link to="/books" className="hover:text-green-500 transition-colors">Listed Books</Link></li>
                            <li><Link to="/authors" className="hover:text-green-500 transition-colors">Meet Authors</Link></li>
                            <li><Link to="/page-to-read" className="hover:text-green-500 transition-colors">Reading Progress</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold">Connect with us</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/farhan5178" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-base-100 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/farhan-sadik-turjo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-base-100 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="https://www.instagram.com/farhansadik_turjo/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-base-100 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 bg-base-100 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                                <FaTwitter size={20} />
                            </a>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-3 opacity-80">
                                <Mail size={18} className="text-green-500" />
                                <span>farhansadikturjo1265@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="opacity-60 text-sm font-medium">
                        © 2026 Book Vibe. Built with ❤️ by <span className="text-green-500 font-bold">Farhan Sadik Turjo</span>.
                    </p>
                    <div className="flex gap-8 text-sm font-bold opacity-60">
                        <a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
