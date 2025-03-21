
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

type AuthView = 'signIn' | 'signUp' | 'confirmation';

const Auth = () => {
  const [view, setView] = useState<AuthView>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (view === 'signIn') {
      // Demo: Just show a success toast and redirect
      toast({
        title: "Successfully signed in",
        description: "Welcome back to PriceCompare!",
      });
      navigate('/');
    } else if (view === 'signUp') {
      // Move to confirmation view
      setView('confirmation');
    }
    
    setIsLoading(false);
  };
  
  const handleConfirmSignUp = () => {
    // Demo: Just show a success toast and redirect
    toast({
      title: "Account created successfully",
      description: "Welcome to PriceCompare!",
    });
    navigate('/');
  };

  const toggleView = () => {
    setView(view === 'signIn' ? 'signUp' : 'signIn');
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <AnimatePresence mode="wait">
            {view === 'confirmation' ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="backdrop-blur-sm bg-white/90 border border-gray-200 shadow-medium">
                  <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                      <CheckCircle2 className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Account Created</CardTitle>
                    <CardDescription>
                      Your account has been created successfully.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2 pb-6">
                    <div className="space-y-2 text-center">
                      <p>We've sent a confirmation email to:</p>
                      <p className="font-medium">{email}</p>
                      <p className="text-sm text-gray-500 mt-4">
                        Please check your inbox and follow the instructions to verify your email address.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleConfirmSignUp}
                    >
                      Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="backdrop-blur-sm bg-white/90 border border-gray-200 shadow-medium">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                      {view === 'signIn' ? 'Sign In' : 'Create an Account'}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {view === 'signIn' 
                        ? 'Enter your email and password to access your account' 
                        : 'Fill out the form below to create your account'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {view === 'signUp' && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="h-11"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          {view === 'signIn' && (
                            <Button variant="link" className="p-0 h-auto text-xs" onClick={() => {}}>
                              Forgot password?
                            </Button>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="pr-10 h-11"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-11 mt-2" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                            {view === 'signIn' ? 'Signing in...' : 'Creating account...'}
                          </div>
                        ) : (
                          view === 'signIn' ? 'Sign In' : 'Create Account'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      onClick={toggleView}
                    >
                      {view === 'signIn' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
