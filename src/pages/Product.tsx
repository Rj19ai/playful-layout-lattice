
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  ChevronRight,
  Star,
  Store,
  Clock,
  Bell,
  ExternalLink,
  Heart,
  Share2,
  ChevronLeft,
  ChevronDown,
  ShoppingCart,
  LineChart,
  Info,
  Check
} from 'lucide-react';
import { getProductById } from '@/lib/data';
import { Laptop, Grocery, VendorPrice, PriceAlert } from '@/lib/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Laptop | Grocery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVendor, setSelectedVendor] = useState<VendorPrice | null>(null);
  const [priceAlertValue, setPriceAlertValue] = useState('');
  const [isPriceAlertSet, setIsPriceAlertSet] = useState(false);
  
  // Generate some mock price history data
  const generatePriceHistoryData = () => {
    if (!product) return null;
    
    const today = new Date();
    const data = [];
    const vendorPrices: { [key: string]: number[] } = {};
    
    // Initialize arrays for each vendor
    product.prices.forEach(vendor => {
      vendorPrices[vendor.vendorId] = [];
    });
    
    // Generate data for the last 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // For each vendor, generate a slightly varying price
      product.prices.forEach(vendor => {
        const basePrice = vendor.price;
        const randomFactor = Math.random() * 0.2 - 0.1; // -10% to +10%
        const historicalPrice = Math.round((basePrice + basePrice * randomFactor) * 100) / 100;
        vendorPrices[vendor.vendorId].push(historicalPrice);
      });
    }
    
    return vendorPrices;
  };
  
  // Fetch product data
  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct as Laptop | Grocery);
      
      if (fetchedProduct) {
        // Select the vendor with the lowest price as default
        const lowestPriceVendor = [...fetchedProduct.prices].sort((a, b) => a.price - b.price)[0];
        setSelectedVendor(lowestPriceVendor);
      }
      
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  // Handle price alert submission
  const handleSubmitPriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product || !selectedVendor) return;
    
    const alertPrice = parseFloat(priceAlertValue);
    
    if (isNaN(alertPrice) || alertPrice <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }
    
    if (alertPrice >= selectedVendor.price) {
      toast({
        title: "Invalid alert price",
        description: "Alert price must be lower than the current price",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate setting a price alert
    toast({
      title: "Price alert set",
      description: `We'll notify you when the price drops below $${alertPrice}`,
    });
    
    setIsPriceAlertSet(true);
  };
  
  // Handle cancel price alert
  const handleCancelPriceAlert = () => {
    setPriceAlertValue('');
    setIsPriceAlertSet(false);
    
    toast({
      title: "Price alert cancelled",
      description: "Your price alert has been cancelled",
    });
  };
  
  // Price history chart data
  const priceHistoryData = generatePriceHistoryData();
  
  // Format chart data
  const formatChartData = () => {
    if (!product || !priceHistoryData) return null;
    
    const today = new Date();
    const labels = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (30 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const datasets = product.prices.map(vendor => {
      const color = getVendorColor(vendor.vendorId);
      return {
        label: vendor.vendorName,
        data: priceHistoryData[vendor.vendorId],
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
      };
    });
    
    return { labels, datasets };
  };
  
  // Get color for vendor
  const getVendorColor = (vendorId: string) => {
    const colors: Record<string, string> = {
      'apple': '#007aff',
      'amazon': '#ff9900',
      'bestbuy': '#0046be',
      'dell': '#0076ce',
      'lenovo': '#e60012',
      'wholefoods': '#3bb143',
      'walmart': '#0071ce',
      'target': '#cc0000',
      'default': '#888888'
    };
    
    return colors[vendorId] || colors.default;
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                <div className="h-12 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Render 404 if product not found
  if (!product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/search">Back to Search</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/search" className="hover:text-gray-700">Search</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link 
              to={`/search?category=${product.category}`} 
              className="hover:text-gray-700 capitalize"
            >
              {product.category}s
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 truncate max-w-[150px]">{product.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24 overflow-hidden rounded-xl bg-white p-2 border border-gray-100 shadow-sm">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="mt-4 flex justify-center gap-4">
                  <Button size="sm" variant="outline" className="flex gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex gap-1">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-2">
                <Badge className="mb-3">{product.category === 'laptop' ? 'Laptop' : 'Grocery'}</Badge>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500 mb-4">{product.brand}</p>
                
                {/* Price overview */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold">
                      ${selectedVendor ? selectedVendor.price.toFixed(2) : product.prices[0].price.toFixed(2)}
                    </span>
                    {selectedVendor?.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        ${selectedVendor.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {selectedVendor?.discount && (
                      <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">
                        Save ${selectedVendor.discount.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Store className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm">
                      from <span className="font-medium">{selectedVendor?.vendorName || product.prices[0].vendorName}</span>
                    </span>
                    <div className="mx-2 h-4 w-px bg-gray-300"></div>
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm">
                      Updated {selectedVendor?.lastUpdated.toLocaleDateString() || product.prices[0].lastUpdated.toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Price alert */}
                  {!isPriceAlertSet ? (
                    <form onSubmit={handleSubmitPriceAlert}>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            value={priceAlertValue}
                            onChange={(e) => setPriceAlertValue(e.target.value)}
                            placeholder="Set price alert"
                            step="0.01"
                            min="0"
                            className="pl-7"
                          />
                        </div>
                        <Button type="submit" className="flex gap-2 whitespace-nowrap">
                          <Bell className="h-4 w-4" />
                          <span>Set Alert</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        We'll notify you when the price drops below your target price.
                      </p>
                    </form>
                  ) : (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Price alert set</span>
                      </div>
                      <p className="text-sm text-green-700 mb-2">
                        We'll notify you when the price drops below ${priceAlertValue}.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-green-200 hover:bg-green-100 hover:text-green-800"
                        onClick={handleCancelPriceAlert}
                      >
                        Cancel Alert
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Vendor selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Available from {product.prices.length} vendors</h3>
                  <div className="space-y-2">
                    {product.prices.map((vendor) => (
                      <div 
                        key={vendor.vendorId}
                        className={`border rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                          selectedVendor?.vendorId === vendor.vendorId 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedVendor(vendor)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className="font-medium">{vendor.vendorName}</span>
                            <div className="flex items-center mt-1">
                              <span className="text-lg font-semibold">${vendor.price.toFixed(2)}</span>
                              {vendor.originalPrice && (
                                <span className="text-gray-500 line-through text-sm ml-2">
                                  ${vendor.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={vendor.inStock ? 'outline' : 'secondary'} className={
                              vendor.inStock ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 text-red-700'
                            }>
                              {vendor.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs" 
                              asChild
                            >
                              <a href={vendor.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                <span>Visit</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Product details tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Specifications</TabsTrigger>
                  <TabsTrigger value="price-history">Price History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="text-gray-700">
                    <p className="mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.category === 'laptop' ? (
                        <>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Processor:</span>
                            <span>{(product as Laptop).processor}</span>
                          </li>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Memory:</span>
                            <span>{(product as Laptop).ram}</span>
                          </li>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Storage:</span>
                            <span>{(product as Laptop).storage}</span>
                          </li>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Display:</span>
                            <span>{(product as Laptop).display}</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Weight:</span>
                            <span>{(product as Grocery).weight}</span>
                          </li>
                          <li className="flex items-baseline gap-2">
                            <span className="font-medium min-w-[120px]">Organic:</span>
                            <span>{(product as Grocery).organic ? 'Yes' : 'No'}</span>
                          </li>
                          {(product as Grocery).nutritionInfo && (
                            <li className="flex items-baseline gap-2">
                              <span className="font-medium min-w-[120px]">Nutrition:</span>
                              <span>{(product as Grocery).nutritionInfo}</span>
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-6">
                    {product.category === 'laptop' ? (
                      <>
                        <div>
                          <h3 className="font-medium mb-3">System</h3>
                          <Card>
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Brand</span>
                                <span className="font-medium">{product.brand}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Processor</span>
                                <span className="font-medium">{(product as Laptop).processor}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">RAM</span>
                                <span className="font-medium">{(product as Laptop).ram}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Storage</span>
                                <span className="font-medium">{(product as Laptop).storage}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Graphics</span>
                                <span className="font-medium">{(product as Laptop).graphics}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3">Display</h3>
                          <Card>
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Display</span>
                                <span className="font-medium">{(product as Laptop).display}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-medium mb-3">Product Information</h3>
                          <Card>
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Brand</span>
                                <span className="font-medium">{product.brand}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Weight</span>
                                <span className="font-medium">{(product as Grocery).weight}</span>
                              </div>
                              <Separator />
                              <div className="flex items-baseline justify-between py-2">
                                <span className="text-sm text-gray-500">Organic</span>
                                <span className="font-medium">{(product as Grocery).organic ? 'Yes' : 'No'}</span>
                              </div>
                              {(product as Grocery).nutritionInfo && (
                                <>
                                  <Separator />
                                  <div className="flex items-baseline justify-between py-2">
                                    <span className="text-sm text-gray-500">Nutrition</span>
                                    <span className="font-medium">{(product as Grocery).nutritionInfo}</span>
                                  </div>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="price-history">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Price History</h3>
                      <select 
                        className="text-sm border rounded p-1"
                        value="30"
                        onChange={() => {}}
                      >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                      </select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      {formatChartData() && (
                        <Line 
                          data={formatChartData() as any}
                          options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                              y: {
                                beginAtZero: false,
                                ticks: {
                                  callback: (value) => `$${value}`,
                                },
                              },
                            },
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: {
                                  boxWidth: 12,
                                  padding: 15,
                                },
                              },
                              tooltip: {
                                callbacks: {
                                  label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
                                },
                              },
                            },
                          }}
                        />
                      )}
                      
                      <p className="text-xs text-gray-500 mt-4">
                        <Info className="h-3 w-3 inline mr-1" />
                        Price history data is simulated for demonstration purposes.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Analysis</h4>
                      <Card>
                        <CardContent className="p-4 space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <LineChart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p>
                              The price for {product.name} has been relatively stable over the last 30 days with minor fluctuations.
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Store className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p>
                              {product.prices.length} vendors are currently offering this product, with prices ranging from ${Math.min(...product.prices.map(p => p.price)).toFixed(2)} to ${Math.max(...product.prices.map(p => p.price)).toFixed(2)}.
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Bell className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p>
                              Setting a price alert at ${(Math.min(...product.prices.map(p => p.price)) * 0.9).toFixed(2)} is recommended based on historical trends.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
