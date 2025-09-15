'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  CreditCard, 
  Zap, 
  User,
  Shield,
  Clock,
  Globe
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

interface PaymentMethodSelectionProps {
  selectedPlan: Plan;
  onBack: () => void;
  onSelectManual: () => void;
  onSelectDigital: () => void;
}

export default function PaymentMethodSelection({ 
  selectedPlan, 
  onBack, 
  onSelectManual, 
  onSelectDigital 
}: PaymentMethodSelectionProps) {
  const total = selectedPlan.price; // Price is now VAT inclusive
  const vat = total / 6; // VAT is 1/6 of the VAT-inclusive price (20% of net = 16.67% of gross)
  const subtotal = total - vat;

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
          className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
        >
          <CreditCard className="w-8 h-8 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Payment Method
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select how you'd like to complete your payment and provide your details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Method Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traditional Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card 
              className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer group"
              onClick={onSelectManual}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900">
                      Enter Details Manually
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Provide your personal information and payment details manually
                    </CardDescription>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:rotate-180 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>First name, last name, address, DOB</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>PayPal, Credit Card/Debit Card</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Takes 5-10 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Digital Credential Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-blue-50/50 to-purple-50/50"
              onClick={onSelectDigital}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                      <span>Use your Bank's Digital ID</span>
                      <Zap className="w-5 h-5 text-yellow-500" />
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Verify your identity instantly using your bank's digital credentials
                    </CardDescription>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:rotate-180 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Bank-grade security verification</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Instant verification with QR code</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Takes 30 seconds</span>
                  </div>
                  <div className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    <Globe className="w-3 h-3" />
                    <span>Recommended</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Plan */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                    <selectedPlan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPlan.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPlan.data} • {selectedPlan.minutes} • {selectedPlan.texts}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Plan ({selectedPlan.name})</span>
                  <span>£{subtotal.toFixed(2)}</span>
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
                    <span>Total (VAT inclusive)</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    per month
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Secure Payment</span>
                </div>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure
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
          Back to Basket
        </Button>
      </motion.div>
    </motion.div>
  );
}
