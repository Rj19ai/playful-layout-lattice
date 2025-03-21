
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCategory } from '@/lib/types';

interface SearchBarProps {
  initialQuery?: string;
  initialCategory?: ProductCategory;
  expanded?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  initialQuery = '', 
  initialCategory,
  expanded = false 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ProductCategory | undefined>(initialCategory);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build the query string
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    
    // Navigate to search page with query params
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative w-full ${expanded ? 'max-w-3xl' : 'max-w-xl'} mx-auto`}
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-grow py-6 pl-4 pr-12 border-2 border-gray-200 focus:border-primary shadow-none rounded-l-lg text-base"
        />
        
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 h-6 w-px bg-gray-300" />
        
        <select
          value={category || ''}
          onChange={(e) => setCategory(e.target.value as ProductCategory || undefined)}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 appearance-none bg-transparent border-0 text-gray-500 outline-none cursor-pointer text-sm pr-2"
        >
          <option value="">All</option>
          <option value="laptop">Laptops</option>
          <option value="grocery">Groceries</option>
        </select>
        
        <Button 
          type="submit" 
          className="h-full rounded-r-lg rounded-l-none px-5 bg-primary hover:bg-primary/90"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      {expanded && (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => {
              setCategory('laptop');
              handleSearch(new Event('submit') as any);
            }}
          >
            MacBook Pro
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => {
              setCategory('laptop');
              handleSearch(new Event('submit') as any);
            }}
          >
            Gaming Laptops
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => {
              setCategory('grocery');
              handleSearch(new Event('submit') as any);
            }}
          >
            Organic Foods
          </Button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
