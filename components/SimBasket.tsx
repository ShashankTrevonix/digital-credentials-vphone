'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Trash2,
  CreditCard,
  Shield,
  Clock,
  Smartphone
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  data: string;
  minutes: string;
  texts: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: React.ComponentType<any>;
}

interface SimBasketProps {
  selectedPlan: Plan;
  onBack: () => void;
  onCheckout: () => void;
}

export default function SimBasket({ selectedPlan, onBack, onCheckout }: SimBasketProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 1000));
    onCheckout();
  };

  const subtotal = selectedPlan.price;
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
        >
          <ShoppingCart className="w-8 h-8 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shopping Basket
        </h1>
        
        <p className="text-gray-600">
          Review your selected plan and proceed to checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selected Plan */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Selected Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Plan Details */}
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                    <selectedPlan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedPlan.name}</h3>
                      <span className="text-2xl font-bold text-gray-900">£{selectedPlan.price}/month</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-lg font-semibold text-gray-900">{selectedPlan.data}</div>
                        <div className="text-sm text-gray-600">Data</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-lg font-semibold text-gray-900">{selectedPlan.minutes}</div>
                        <div className="text-sm text-gray-600">Minutes</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-lg font-semibold text-gray-900">{selectedPlan.texts}</div>
                        <div className="text-sm text-gray-600">Texts</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Features included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlan.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SIM Card Details */}
                <div className="p-4 bg-gray-50 rounded-xl border">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Smartphone className="w-4 h-4 mr-2 text-blue-600" />
                    SIM Card Details
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>SIM Type:</span>
                      <span className="font-medium">Nano SIM (5G Ready)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activation:</span>
                      <span className="font-medium">Instant</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="font-medium">Digital (Email)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Plan ({selectedPlan.name})</span>
                  <span>£{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>SIM Card</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Setup Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (20%)</span>
                  <span>£{vat.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    per month
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Checkout Button */}
              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCheckingOut ? (
                  <>
                    <Clock className="mr-2 w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>🔒 SSL Secured</span>
                  <span>•</span>
                  <span>💳 Secure Payment</span>
                </div>
                <p className="text-xs text-gray-400">
                  No hidden fees • Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-8"
      >
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Plans
        </Button>
      </motion.div>
    </motion.div>
  );
}
