
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Grocery } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Laptop | Grocery;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get the lowest price from all vendors
  const lowestPrice = Math.min(...product.prices.map(p => p.price));
  
  // Get the highest price from all vendors
  const highestPrice = Math.max(...product.prices.map(p => p.price));
  
  // Check if there's a price difference (meaning we have multiple vendors with different prices)
  const hasPriceRange = lowestPrice !== highestPrice;
  
  // Find if any vendor has a discount
  const hasDiscount = product.prices.some(p => p.discount && p.discount > 0);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="overflow-hidden h-full shadow-sm hover:shadow-medium transition-all duration-300 border border-gray-200 product-card">
          <div className="aspect-square overflow-hidden relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            {/* Category Badge */}
            <Badge
              className="absolute top-3 left-3 bg-black/80 text-white hover:bg-black/90"
            >
              {product.category === 'laptop' ? 'Laptop' : 'Grocery'}
            </Badge>
            
            {/* Discount Badge */}
            {hasDiscount && (
              <Badge
                className="absolute top-3 right-3 bg-red-500 text-white hover:bg-red-600"
              >
                Sale
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-gray-500 font-medium">
                {product.brand}
              </span>
            </div>
            
            <h3 className="font-medium text-base mb-1 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.description}
            </p>
            
            <div className="mt-auto">
              <div className="flex items-baseline gap-1.5">
                {hasPriceRange ? (
                  <span className="font-semibold">${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}</span>
                ) : (
                  <span className="font-semibold">${lowestPrice.toFixed(2)}</span>
                )}
                
                <span className="text-xs text-gray-500">
                  from {product.prices.length} {product.prices.length === 1 ? 'vendor' : 'vendors'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
