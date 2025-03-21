
import { Laptop, Grocery, User } from './types';

// Mock Laptops
export const laptops: Laptop[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'laptop',
    brand: 'Apple',
    processor: 'Apple M2 Pro',
    ram: '16GB',
    storage: '512GB SSD',
    display: '16-inch Liquid Retina XDR',
    graphics: 'Integrated',
    prices: [
      {
        vendorId: 'apple',
        vendorName: 'Apple',
        price: 2499,
        inStock: true,
        lastUpdated: new Date('2023-08-15'),
        url: '#'
      },
      {
        vendorId: 'amazon',
        vendorName: 'Amazon',
        price: 2399,
        originalPrice: 2499,
        discount: 100,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'bestbuy',
        vendorName: 'Best Buy',
        price: 2449,
        originalPrice: 2499,
        discount: 50,
        inStock: true,
        lastUpdated: new Date('2023-08-16'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-08-17')
  },
  {
    id: '2',
    name: 'Dell XPS 15',
    description: 'Intel Core i7, 32GB RAM, 1TB SSD, 15.6-inch 4K OLED display, NVIDIA GeForce RTX 3050 Ti',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'laptop',
    brand: 'Dell',
    processor: 'Intel Core i7-12700H',
    ram: '32GB',
    storage: '1TB SSD',
    display: '15.6-inch 4K OLED',
    graphics: 'NVIDIA GeForce RTX 3050 Ti',
    prices: [
      {
        vendorId: 'dell',
        vendorName: 'Dell',
        price: 2199,
        inStock: true,
        lastUpdated: new Date('2023-08-14'),
        url: '#'
      },
      {
        vendorId: 'amazon',
        vendorName: 'Amazon',
        price: 2099,
        originalPrice: 2199,
        discount: 100,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'bestbuy',
        vendorName: 'Best Buy',
        price: 2149,
        originalPrice: 2199,
        discount: 50,
        inStock: false,
        lastUpdated: new Date('2023-08-16'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-08-17')
  },
  {
    id: '3',
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'Intel Core i5, 16GB RAM, 512GB SSD, 14-inch FHD display',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'laptop',
    brand: 'Lenovo',
    processor: 'Intel Core i5-1135G7',
    ram: '16GB',
    storage: '512GB SSD',
    display: '14-inch FHD',
    graphics: 'Intel Iris Xe',
    prices: [
      {
        vendorId: 'lenovo',
        vendorName: 'Lenovo',
        price: 1599,
        inStock: true,
        lastUpdated: new Date('2023-08-15'),
        url: '#'
      },
      {
        vendorId: 'amazon',
        vendorName: 'Amazon',
        price: 1499,
        originalPrice: 1599,
        discount: 100,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-08-17')
  }
];

// Mock Groceries
export const groceries: Grocery[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, bundle of 5',
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'grocery',
    brand: 'Organic Harvest',
    weight: '2 lbs',
    organic: true,
    prices: [
      {
        vendorId: 'wholefoods',
        vendorName: 'Whole Foods',
        price: 3.99,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'walmart',
        vendorName: 'Walmart',
        price: 2.99,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'target',
        vendorName: 'Target',
        price: 3.49,
        inStock: true,
        lastUpdated: new Date('2023-08-16'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-08-17')
  },
  {
    id: '2',
    name: 'Almond Milk',
    description: 'Unsweetened almond milk, dairy-free',
    imageUrl: 'https://images.unsplash.com/photo-1608512532288-8f650eeab7c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWxtb25kJTIwbWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'grocery',
    brand: 'Blue Diamond',
    weight: '32 fl oz',
    organic: false,
    nutritionInfo: 'Calcium, Vitamin D, E',
    prices: [
      {
        vendorId: 'wholefoods',
        vendorName: 'Whole Foods',
        price: 4.99,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'walmart',
        vendorName: 'Walmart',
        price: 3.99,
        originalPrice: 4.49,
        discount: 0.50,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2023-08-17')
  },
  {
    id: '3',
    name: 'Organic Spinach',
    description: 'Fresh organic baby spinach',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'grocery',
    brand: 'Earthbound Farm',
    weight: '5 oz',
    organic: true,
    nutritionInfo: 'Vitamin K, A, C, Iron',
    prices: [
      {
        vendorId: 'wholefoods',
        vendorName: 'Whole Foods',
        price: 3.99,
        inStock: true,
        lastUpdated: new Date('2023-08-17'),
        url: '#'
      },
      {
        vendorId: 'target',
        vendorName: 'Target',
        price: 3.49,
        inStock: true,
        lastUpdated: new Date('2023-08-16'),
        url: '#'
      }
    ],
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-08-17')
  }
];

// Mock User
export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date('2023-01-01'),
  preferences: {
    preferredCategories: ['laptop', 'grocery'],
    preferredVendors: ['amazon', 'walmart'],
    emailNotifications: true,
    pushNotifications: false
  }
};

// Combine all products
export const allProducts = [...laptops, ...groceries];

// Get products by category
export const getProductsByCategory = (category: 'laptop' | 'grocery') => {
  return allProducts.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id: string) => {
  return allProducts.find(product => product.id === id);
};

// Search products
export const searchProducts = (query: string, category?: 'laptop' | 'grocery') => {
  const lowerQuery = query.toLowerCase();
  let results = allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.description.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
  
  if (category) {
    results = results.filter(product => product.category === category);
  }
  
  return results;
};
