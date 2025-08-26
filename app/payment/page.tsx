'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Link href="/sim-purchase">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Verification
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Payment
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete your SIM card purchase with secure payment
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
              >
                <CreditCard className="w-12 h-12 text-white" />
              </motion.div>
              
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Payment Details
              </CardTitle>
              
              <CardDescription className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                Your identity has been verified. Please complete your payment to activate your SIM card.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Identity Verified</h4>
                    <p className="text-sm text-gray-600">Your digital ID verification is complete</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Payment</h4>
                    <p className="text-sm text-gray-600">Bank-level encryption and security</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Activation</h4>
                    <p className="text-sm text-gray-600">SIM card activated within minutes</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">SIM Card Package</span>
                      <span className="font-semibold text-gray-900">£25.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Activation Fee</span>
                      <span className="font-semibold text-gray-900">£5.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">First Month Credit</span>
                      <span className="font-semibold text-gray-900">£20.00</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-blue-600">£50.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-sm text-center">
                    💳 Payment functionality will be implemented in the next phase
                  </p>
                </div>
              </motion.div>
            </CardContent>
            
            <CardFooter className="flex justify-center space-x-4 pb-6">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                disabled
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>
              
              <Link href="/sim-purchase">
                <Button variant="outline" className="px-8 py-3 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">
                  Back to Verification
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16 text-sm text-gray-500"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Lock className="w-4 h-4" />
            <span>Secure Payment Processing</span>
          </div>
          <p className="text-xs">Protected • Encrypted • Safe</p>
        </motion.div>
      </div>
    </div>
  );
}
