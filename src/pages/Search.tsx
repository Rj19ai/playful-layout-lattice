
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Laptop, Grocery, ProductCategory, SearchFilters } from '@/lib/types';
import { allProducts, searchProducts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const priceRanges = {
  laptop: { min: 500, max: 3000 },
  grocery: { min: 1, max: 100 },
  default: { min: 1, max: 3000 }
};

const brands = {
  laptop: ['Apple', 'Dell', 'Lenovo', 'HP', 'Asus'],
  grocery: ['Organic Harvest', 'Blue Diamond', 'Earthbound Farm', 'Nature Valley', 'Horizon']
};

const vendors = {
  laptop: ['Apple', 'Amazon', 'Best Buy', 'Dell', 'Lenovo'],
  grocery: ['Whole Foods', 'Walmart', 'Target', 'Kroger', 'Trader Joe\'s']
};

const Search = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') as ProductCategory || undefined;
  
  const [results, setResults] = useState<(Laptop | Grocery)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // Filters state
  const [filters, setFilters] = useState<SearchFilters>({
    category: initialCategory,
    priceMin: undefined,
    priceMax: undefined,
    brands: [],
    vendors: [],
    sortBy: 'price-asc'
  });
  
  // Price range based on category
  const getPriceRange = () => {
    if (filters.category === 'laptop') return priceRanges.laptop;
    if (filters.category === 'grocery') return priceRanges.grocery;
    return priceRanges.default;
  };
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    getPriceRange().min,
    getPriceRange().max
  ]);
  
  // Update price range when category changes
  useEffect(() => {
    const range = getPriceRange();
    setPriceRange([
      filters.priceMin || range.min,
      filters.priceMax || range.max
    ]);
  }, [filters.category]);
  
  // Perform search
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered;
      
      if (initialQuery) {
        filtered = searchProducts(initialQuery, initialCategory);
      } else {
        filtered = [...allProducts];
        if (initialCategory) {
          filtered = filtered.filter(product => product.category === initialCategory);
        }
      }
      
      // Apply additional filters
      if (filters.priceMin !== undefined) {
        filtered = filtered.filter(product => {
          // Get the minimum price from all vendors
          const minPrice = Math.min(...product.prices.map(p => p.price));
          return minPrice >= (filters.priceMin || 0);
        });
      }
      
      if (filters.priceMax !== undefined) {
        filtered = filtered.filter(product => {
          // Get the maximum price from all vendors
          const maxPrice = Math.max(...product.prices.map(p => p.price));
          return maxPrice <= (filters.priceMax || Infinity);
        });
      }
      
      if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter(product => 
          filters.brands?.includes(product.brand)
        );
      }
      
      if (filters.vendors && filters.vendors.length > 0) {
        filtered = filtered.filter(product => 
          product.prices.some(price => 
            filters.vendors?.includes(price.vendorName)
          )
        );
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filtered.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price-asc':
              return Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price));
            case 'price-desc':
              return Math.min(...b.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price));
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });
      }
      
      setResults(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [initialQuery, initialCategory, filters]);
  
  // Handle filter changes
  const handleFilterChange = (filterUpdates: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...filterUpdates }));
  };
  
  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters(prev => ({
      ...prev,
      priceMin: values[0],
      priceMax: values[1]
    }));
  };
  
  // Toggle a brand filter
  const toggleBrandFilter = (brand: string) => {
    setFilters(prev => {
      const currentBrands = prev.brands || [];
      const newBrands = currentBrands.includes(brand)
        ? currentBrands.filter(b => b !== brand)
        : [...currentBrands, brand];
      
      return { ...prev, brands: newBrands };
    });
  };
  
  // Toggle a vendor filter
  const toggleVendorFilter = (vendor: string) => {
    setFilters(prev => {
      const currentVendors = prev.vendors || [];
      const newVendors = currentVendors.includes(vendor)
        ? currentVendors.filter(v => v !== vendor)
        : [...currentVendors, vendor];
      
      return { ...prev, vendors: newVendors };
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: initialCategory,
      sortBy: 'price-asc'
    });
    
    const range = getPriceRange();
    setPriceRange([range.min, range.max]);
  };
  
  // Get available brands and vendors based on category
  const getAvailableBrands = () => {
    if (filters.category === 'laptop') return brands.laptop;
    if (filters.category === 'grocery') return brands.grocery;
    return [...brands.laptop, ...brands.grocery];
  };
  
  const getAvailableVendors = () => {
    if (filters.category === 'laptop') return vendors.laptop;
    if (filters.category === 'grocery') return vendors.grocery;
    return [...vendors.laptop, ...vendors.grocery];
  };
  
  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    if (filters.brands && filters.brands.length > 0) count++;
    if (filters.vendors && filters.vendors.length > 0) count++;
    return count;
  };
  
  return (
    <Layout>
      <div className="pt-4 pb-12">
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar initialQuery={initialQuery} initialCategory={initialCategory} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <Card className="sticky top-20 bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Price Range</h3>
                  <Slider
                    min={getPriceRange().min}
                    max={getPriceRange().max}
                    step={1}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceRangeChange}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Brand Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Brand</h3>
                  <div className="space-y-2">
                    {getAvailableBrands().map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={(filters.brands || []).includes(brand)}
                          onCheckedChange={() => toggleBrandFilter(brand)}
                        />
                        <Label
                          htmlFor={`brand-${brand}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Vendor Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Vendor</h3>
                  <div className="space-y-2">
                    {getAvailableVendors().map((vendor) => (
                      <div key={vendor} className="flex items-center space-x-2">
                        <Checkbox
                          id={`vendor-${vendor}`}
                          checked={(filters.vendors || []).includes(vendor)}
                          onCheckedChange={() => toggleVendorFilter(vendor)}
                        />
                        <Label
                          htmlFor={`vendor-${vendor}`}
                          className="text-sm cursor-pointer"
                        >
                          {vendor}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sort By */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Sort By</h3>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {countActiveFilters() > 0 && (
                  <Badge variant="secondary" className="ml-1">{countActiveFilters()}</Badge>
                )}
              </Button>
              
              <select
                className="rounded-md border border-gray-300 p-2 text-sm"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                      Reset
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Price Range Filter */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Price Range</h4>
                    <Slider
                      min={getPriceRange().min}
                      max={getPriceRange().max}
                      step={1}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Brand Filter */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Brand</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableBrands().map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-mobile-${brand}`}
                            checked={(filters.brands || []).includes(brand)}
                            onCheckedChange={() => toggleBrandFilter(brand)}
                          />
                          <Label
                            htmlFor={`brand-mobile-${brand}`}
                            className="text-sm cursor-pointer"
                          >
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Vendor Filter */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Vendor</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableVendors().map((vendor) => (
                        <div key={vendor} className="flex items-center space-x-2">
                          <Checkbox
                            id={`vendor-mobile-${vendor}`}
                            checked={(filters.vendors || []).includes(vendor)}
                            onCheckedChange={() => toggleVendorFilter(vendor)}
                          />
                          <Label
                            htmlFor={`vendor-mobile-${vendor}`}
                            className="text-sm cursor-pointer"
                          >
                            {vendor}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-2"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="flex-1">
            {/* Results header */}
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {initialQuery ? `Results for "${initialQuery}"` : 'All Products'}
                {initialCategory && (
                  <span className="ml-2 text-sm font-normal">
                    in <Badge variant="outline" className="ml-1 font-normal">{initialCategory}s</Badge>
                  </span>
                )}
              </h2>
              <span className="text-sm text-gray-500">{results.length} results</span>
            </div>
            
            {/* Active filters display */}
            {countActiveFilters() > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.priceMin !== undefined && filters.priceMax !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ${filters.priceMin} - ${filters.priceMax}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleFilterChange({ priceMin: undefined, priceMax: undefined })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(filters.brands || []).map(brand => (
                  <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                    {brand}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => toggleBrandFilter(brand)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {(filters.vendors || []).map(vendor => (
                  <Badge key={vendor} variant="secondary" className="flex items-center gap-1">
                    {vendor}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => toggleVendorFilter(vendor)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                {countActiveFilters() > 0 && (
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetFilters}>
                    Clear All
                  </Button>
                )}
              </div>
            )}
            
            {/* Loading state */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="h-96 rounded-lg bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {/* No results */}
                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                ) : (
                  /* Results grid */
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {results.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
