
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/data';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating auth state

  // Toggle login state for demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Check if the user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PC
            </motion.div>
            <span className="font-semibold text-xl hidden sm:inline-block">PriceCompare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/search?category=laptop"
              className="text-sm font-medium hover:text-primary transition-colors relative py-1"
            >
              Laptops
              {location.pathname === '/search' && location.search.includes('category=laptop') && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
            <Link
              to="/search?category=grocery"
              className="text-sm font-medium hover:text-primary transition-colors relative py-1"
            >
              Groceries
              {location.pathname === '/search' && location.search.includes('category=grocery') && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
            <Link
              to="/search"
              className="text-sm font-medium hover:text-primary transition-colors relative py-1"
            >
              All Products
              {location.pathname === '/search' && !location.search.includes('category') && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/search">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <Link to="/account">
                  <Avatar className="h-8 w-8 transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-primary hover:bg-primary/90 text-white">Sign In</Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-3 space-y-1 border-t border-gray-200 bg-white/80 backdrop-blur-lg">
              <Link
                to="/search?category=laptop"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
              >
                Laptops
              </Link>
              <Link
                to="/search?category=grocery"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
              >
                Groceries
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
              >
                All Products
              </Link>
              {isLoggedIn && (
                <Link
                  to="/account"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              )}
              {/* For demo: toggle login state */}
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={toggleLogin}
              >
                {isLoggedIn ? "Demo: Sign Out" : "Demo: Sign In"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
