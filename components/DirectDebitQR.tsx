'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  QrCode, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  CreditCard,
  Shield,
  Smartphone,
  AlertCircle,
  RefreshCw
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

interface DirectDebitQRProps {
  selectedPlan: Plan;
  qrCodeUrl: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function DirectDebitQR({ selectedPlan, qrCodeUrl, onBack, onComplete }: DirectDebitQRProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isExpired, setIsExpired] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isExpired) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
    }
  }, [timeLeft, isExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRefresh = () => {
    setIsExpired(false);
    setTimeLeft(300);
    // Note: In a real implementation, you would regenerate the QR code here
    // For now, we'll just reset the timer
  };

  const handleComplete = () => {
    onComplete();
  };

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
          className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
        >
          <QrCode className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verify Your Personal Information and Set Up Direct Debit
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Scan the QR code to  verify your personal information and set up direct debit payments for your {selectedPlan.name} plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-purple-600" />
                <span>Direct Debit QR Code</span>
              </CardTitle>
              <CardDescription>
                Scan with your banking app to set up automatic payments
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {isExpired ? (
                <div className="py-16">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">QR code has expired</p>
                  <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New Code
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg"
                  >
                    <img 
                      src={qrCodeUrl} 
                      alt="Direct Debit QR Code"
                      className="mx-auto w-64 h-64 rounded-xl"
                    />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Expires in: {formatTime(timeLeft)}</span>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-800 font-medium">
                        📱 Open your banking app and scan this QR code
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions and Details */}
        <div className="space-y-6">
          {/* Plan Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Plan Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">£{selectedPlan.price}/month</span>
                    <div className="text-xs text-gray-500">VAT inclusive</div>
                  </div>
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

          {/* Instructions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span>Setup Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <p className="font-semibold text-gray-900">Open Camera and Scan QR</p>
                    <p className="text-sm text-gray-600">Open your device camera and scan the QR code displayed above</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <p className="font-semibold text-gray-900">Navigate to App</p>
                    <p className="text-sm text-gray-600">The scan will automatically navigate you to digital wallet app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <p className="font-semibold text-gray-900">Confirm and Share</p>
                    <p className="text-sm text-gray-600">Review the details and confirm to share your data and complete the setup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="border-0 shadow-lg bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Secure & Encrypted</h4>
                  <p className="text-sm text-green-700">
                    Your banking details are encrypted and processed securely. 
                    We never store your full account information.
                  </p>
                </div>
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
          Back to Payment Methods
        </Button>
      </motion.div>
    </motion.div>
  );
}
