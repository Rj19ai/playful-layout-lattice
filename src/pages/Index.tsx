
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Tag, Search as SearchIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { laptops, groceries } from '@/lib/data';
import { Link } from 'react-router-dom';

const Index = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Get featured laptops and groceries
  const featuredLaptops = laptops.slice(0, 3);
  const featuredGroceries = groceries.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Compare prices across multiple vendors
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Find the best deals on <span className="text-primary">everything</span> you shop for
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Compare prices across hundreds of vendors, set price alerts, and never overpay again.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <SearchBar expanded={true} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-soft border border-gray-100 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-4 mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Why Choose PriceCompare?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center px-4"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Price Tracking</h3>
              <p className="text-gray-600">
                Compare prices across hundreds of vendors in real-time to find the best deals.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center px-4"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Tag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Price Drop Alerts</h3>
              <p className="text-gray-600">
                Set alerts and get notified when prices drop on products you're interested in.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center px-4"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Reviews</h3>
              <p className="text-gray-600">
                Make informed decisions with trusted user reviews and vendor ratings.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Laptops */}
      <motion.section 
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              className="text-2xl font-bold"
              variants={itemVariants}
            >
              Featured Laptops
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Button variant="ghost" asChild>
                <Link to="/search?category=laptop" className="flex items-center gap-2">
                  View all laptops <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLaptops.map((laptop) => (
              <motion.div key={laptop.id} variants={itemVariants}>
                <ProductCard product={laptop} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Groceries */}
      <motion.section 
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              className="text-2xl font-bold"
              variants={itemVariants}
            >
              Featured Groceries
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Button variant="ghost" asChild>
                <Link to="/search?category=grocery" className="flex items-center gap-2">
                  View all groceries <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGroceries.map((grocery) => (
              <motion.div key={grocery.id} variants={itemVariants}>
                <ProductCard product={grocery} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 my-12 rounded-2xl bg-gradient-to-r from-primary/90 to-purple-600/90 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start saving?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Create an account to save your searches, set price alerts, and get personalized recommendations.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <Link to="/auth">Create an Account</Link>
          </Button>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
