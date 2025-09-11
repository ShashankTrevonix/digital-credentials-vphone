'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  User, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Smartphone,
  Mail,
  Download,
  Shield,
  Clock,
  ArrowRight
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

interface UserDetails {
  name: string;
  address: string;
  dateOfBirth: string;
}

interface DirectDebitDetails {
  amount: number;
  sortCode: string;
  accountNumber: string; // Only last 4 digits
}

interface PurchaseCompletedProps {
  selectedPlan: Plan;
  userDetails: UserDetails;
  directDebitDetails: DirectDebitDetails;
  onBack: () => void;
}

export default function PurchaseCompleted({ 
  selectedPlan, 
  userDetails, 
  directDebitDetails, 
  onBack 
}: PurchaseCompletedProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    // In a real app, this would trigger a PDF download
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center mb-8"
      >
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Purchase Completed! 🎉
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your SIM card has been successfully ordered and will be activated shortly
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="space-y-6">
                    {/* Direct Debit Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span>Direct Debit Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Monthly Amount (inc. VAT)</span>
                  <span className="text-xl font-bold text-green-700">£{(directDebitDetails.amount * 1.2).toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Plan Price:</span>
                    <span>£{directDebitDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (20%):</span>
                    <span>£{(directDebitDetails.amount * 0.2).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Sort Code</p>
                  <p className="font-semibold text-gray-900 font-mono">{directDebitDetails.sortCode}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-semibold text-gray-900 font-mono">****{directDebitDetails.accountNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Direct Debit automatically set up using your digital ID</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Your Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">{userDetails.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold text-gray-900">{userDetails.address}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-900">{userDetails.dateOfBirth}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Plan Summary & Next Steps */}
        <div className="space-y-6">
          {/* Selected Plan */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span>Selected Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                      <selectedPlan.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                      <p className="text-sm text-gray-600">Monthly Plan</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">£{selectedPlan.price}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{selectedPlan.data}</div>
                    <div className="text-sm text-gray-600">Data</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{selectedPlan.minutes}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{selectedPlan.texts}</div>
                    <div className="text-sm text-gray-600">Texts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>What Happens Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Confirmation</p>
                    <p className="text-sm text-gray-600">You'll receive an order confirmation email shortly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <p className="font-semibold text-gray-900">Direct Debit Set Up</p>
                    <p className="text-sm text-gray-600">Automatic payments configured using your verified account</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <p className="font-semibold text-gray-900">SIM Activation</p>
                    <p className="text-sm text-gray-600">Your SIM will be activated within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <p className="font-semibold text-gray-900">Start Using</p>
                    <p className="text-sm text-gray-600">Insert your SIM and start enjoying your new plan</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Receipt */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Download className="w-8 h-8 text-gray-600" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Download Receipt</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Keep a copy of your order details for your records
                  </p>
                  
                  <Button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    variant="outline"
                    className="w-full"
                  >
                    {isDownloading ? (
                      <>
                        <Clock className="mr-2 w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 w-4 h-4" />
                        Download PDF Receipt
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Order Completed Successfully</h4>
                <p className="text-sm text-green-700">
                  Thank you for choosing VPhone! Your order has been processed securely. 
                  You will receive an email confirmation with your SIM card details shortly. 
                  If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
      >
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
        >
          Back to Home
        </Button>
        
        <Button 
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          View My Account
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
