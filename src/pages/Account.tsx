
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Clock, Bell, LineChart, User, Settings, LogOut, ShoppingCart, CheckCircle, AlertTriangle, Heart, Store, Lock, ChevronRight, Plus, X } from 'lucide-react';
import { laptops, groceries, mockUser } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

const Account = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data
  const savedItems = [...laptops.slice(0, 1), ...groceries.slice(0, 1)];
  const priceAlerts = [
    {
      id: '1',
      product: laptops[0],
      targetPrice: 2299,
      currentPrice: 2399,
      createdAt: new Date('2023-08-10'),
      triggered: false
    },
    {
      id: '2',
      product: groceries[0],
      targetPrice: 2.99,
      currentPrice: 3.99,
      createdAt: new Date('2023-08-15'),
      triggered: false
    }
  ];
  
  // Mock preferences from the user
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    pushNotifications: false,
    categories: {
      laptop: true,
      grocery: true
    },
    vendors: {
      amazon: true,
      apple: true,
      bestbuy: true,
      walmart: true,
      target: false
    }
  });
  
  // Toggle preference
  const togglePreference = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Preferences updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} has been ${value ? 'enabled' : 'disabled'}.`
    });
  };
  
  // Toggle category preference
  const toggleCategory = (category: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value
      }
    }));
    
    toast({
      title: "Category preference updated",
      description: `${category.charAt(0).toUpperCase() + category.slice(1)} category has been ${value ? 'enabled' : 'disabled'}.`
    });
  };
  
  // Toggle vendor preference
  const toggleVendor = (vendor: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      vendors: {
        ...prev.vendors,
        [vendor]: value
      }
    }));
    
    toast({
      title: "Vendor preference updated",
      description: `${vendor.charAt(0).toUpperCase() + vendor.slice(1)} has been ${value ? 'added to' : 'removed from'} your preferred vendors.`
    });
  };
  
  // Remove price alert
  const removeAlert = (id: string) => {
    toast({
      title: "Price alert removed",
      description: "Your price alert has been removed."
    });
  };
  
  // Remove saved item
  const removeItem = (id: string) => {
    toast({
      title: "Item removed",
      description: "The item has been removed from your saved items."
    });
  };
  
  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Account header */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                <AvatarImage src="https://github.com/shadcn.png" alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                <p className="text-gray-500">{mockUser.email}</p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
          
          {/* Account tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="price-alerts">Price Alerts</TabsTrigger>
              <TabsTrigger value="saved-items">Saved Items</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Dashboard */}
            <TabsContent value="dashboard">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stats */}
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader className="pb-2">
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                      Your account activity and price tracking statistics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-primary/10 p-4 rounded-lg flex items-start gap-4">
                        <div className="rounded-full bg-primary/20 p-3">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Active Price Alerts</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg flex items-start gap-4">
                        <div className="rounded-full bg-green-100 p-3">
                          <LineChart className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Potential Savings</p>
                          <p className="text-2xl font-bold">$101</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-4">
                        <div className="rounded-full bg-blue-100 p-3">
                          <Heart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Saved Items</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg flex items-start gap-4">
                        <div className="rounded-full bg-purple-100 p-3">
                          <Store className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tracked Vendors</p>
                          <p className="text-2xl font-bold">4</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent price alerts */}
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Price Alerts</CardTitle>
                    <CardDescription>
                      Your active price tracking alerts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {priceAlerts.map(alert => (
                        <div key={alert.id} className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                            <img
                              src={alert.product.imageUrl}
                              alt={alert.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{alert.product.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-100">
                                Alert: ${alert.targetPrice.toFixed(2)}
                              </Badge>
                              <div className="h-4 w-px bg-gray-200"></div>
                              <span className="text-sm text-gray-500">
                                Current: ${alert.currentPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeAlert(alert.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#" onClick={() => setActiveTab('price-alerts')}>
                            View All Price Alerts
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Saved items */}
                <Card className="col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      Products you've saved for later.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedItems.map(item => (
                        <div key={item.id} className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              from ${Math.min(...item.prices.map(p => p.price)).toFixed(2)}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#" onClick={() => setActiveTab('saved-items')}>
                            View All Saved Items
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Price Alerts */}
            <TabsContent value="price-alerts">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Price Alerts</CardTitle>
                        <CardDescription>Manage your price tracking alerts.</CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Alert
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {priceAlerts.map(alert => (
                        <div key={alert.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div className="w-24 h-24 rounded-md overflow-hidden shrink-0">
                              <img
                                src={alert.product.imageUrl}
                                alt={alert.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-medium">{alert.product.name}</h3>
                              <p className="text-sm text-gray-500">{alert.product.brand}</p>
                              <div className="mt-3 flex flex-wrap gap-3">
                                <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-100">
                                  Alert: ${alert.targetPrice.toFixed(2)}
                                </Badge>
                                <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">
                                  Current: ${alert.currentPrice.toFixed(2)}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Created {alert.createdAt.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="shrink-0 space-y-2 mt-2 md:mt-0">
                              <Button size="sm" variant="outline" className="w-full">Edit</Button>
                              <Button size="sm" variant="outline" className="w-full text-red-600 hover:text-red-700" onClick={() => removeAlert(alert.id)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {priceAlerts.length === 0 && (
                        <div className="text-center py-8">
                          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">No price alerts</h3>
                          <p className="text-gray-500 mb-4">You haven't set up any price alerts yet.</p>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Alert
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Saved Items */}
            <TabsContent value="saved-items">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>Products you've saved for later.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedItems.map(item => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-md overflow-hidden shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.brand}</p>
                              
                              <div className="mt-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="font-bold">${Math.min(...item.prices.map(p => p.price)).toFixed(2)}</span>
                                  <span className="text-sm text-gray-500">
                                    from {item.prices.length} {item.prices.length === 1 ? 'vendor' : 'vendors'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex flex-wrap gap-2">
                                <Button size="sm" variant="outline">View Details</Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => removeItem(item.id)}>
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {savedItems.length === 0 && (
                        <div className="text-center py-8 col-span-2">
                          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">No saved items</h3>
                          <p className="text-gray-500 mb-4">You haven't saved any items yet.</p>
                          <Button variant="outline" asChild>
                            <a href="/search">Browse Products</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Settings */}
            <TabsContent value="settings">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Account Settings */}
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={mockUser.name} className="h-10" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" value={mockUser.email} className="h-10" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Notification Preferences */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Email Alerts</p>
                            <p className="text-sm text-gray-500">
                              Receive alerts about price drops via email.
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.emailAlerts} 
                            onCheckedChange={(checked) => togglePreference('emailAlerts', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Push Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive alerts about price drops via push notifications.
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.pushNotifications} 
                            onCheckedChange={(checked) => togglePreference('pushNotifications', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Category Preferences */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Category Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Laptops</p>
                            <p className="text-sm text-gray-500">
                              Track prices for laptop products
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.categories.laptop} 
                            onCheckedChange={(checked) => toggleCategory('laptop', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Groceries</p>
                            <p className="text-sm text-gray-500">
                              Track prices for grocery products
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.categories.grocery} 
                            onCheckedChange={(checked) => toggleCategory('grocery', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Vendor Preferences */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Preferred Vendors</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Amazon</p>
                          <Switch 
                            checked={preferences.vendors.amazon} 
                            onCheckedChange={(checked) => toggleVendor('amazon', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Apple</p>
                          <Switch 
                            checked={preferences.vendors.apple} 
                            onCheckedChange={(checked) => toggleVendor('apple', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Best Buy</p>
                          <Switch 
                            checked={preferences.vendors.bestbuy} 
                            onCheckedChange={(checked) => toggleVendor('bestbuy', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Walmart</p>
                          <Switch 
                            checked={preferences.vendors.walmart} 
                            onCheckedChange={(checked) => toggleVendor('walmart', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Target</p>
                          <Switch 
                            checked={preferences.vendors.target} 
                            onCheckedChange={(checked) => toggleVendor('target', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                {/* Security */}
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Password</h4>
                          <p className="text-xs text-gray-500 mb-2">
                            Last updated 45 days ago
                          </p>
                          <Button size="sm" variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                          <p className="text-xs text-gray-500 mb-2">
                            Add an extra layer of security to your account
                          </p>
                          <Button size="sm" variant="outline">Enable 2FA</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Account Activity</h4>
                          <p className="text-xs text-gray-500 mb-2">
                            View your recent login activity
                          </p>
                          <Button size="sm" variant="outline">View Activity</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        This action cannot be undone.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
