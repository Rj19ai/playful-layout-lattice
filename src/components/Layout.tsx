
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <Navbar />
      <motion.main 
        className="flex-grow px-4 md:px-8 py-4 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="mt-auto py-6 bg-white bg-opacity-70 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} PriceComparison. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
