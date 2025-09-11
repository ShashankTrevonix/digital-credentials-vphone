'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CreditCard, 
  ArrowRight, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Banknote
} from 'lucide-react';

interface AccountCredentialsRequestProps {
  onCredentialsProvided: (credentials: {
    sortCode: string;
    accountNumber: string;
    accountHolderName: string;
  }) => void;
  onBack: () => void;
}

export default function AccountCredentialsRequest({ onCredentialsProvided, onBack }: AccountCredentialsRequestProps) {
  const [formData, setFormData] = useState({
    sortCode: '',
    accountNumber: '',
    accountHolderName: ''
  });
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate sort code (6 digits)
    if (!formData.sortCode) {
      newErrors.sortCode = 'Sort code is required';
    } else if (!/^\d{6}$/.test(formData.sortCode.replace(/-/g, ''))) {
      newErrors.sortCode = 'Sort code must be 6 digits';
    }

    // Validate account number (8 digits)
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{8}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 8 digits';
    }

    // Validate account holder name
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    } else if (formData.accountHolderName.trim().length < 2) {
      newErrors.accountHolderName = 'Account holder name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onCredentialsProvided({
      sortCode: formData.sortCode.replace(/-/g, ''),
      accountNumber: formData.accountNumber,
      accountHolderName: formData.accountHolderName.trim()
    });
    
    setIsSubmitting(false);
  };

  const formatSortCode = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 6) {
      return digits.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
        >
          <CreditCard className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Account Credentials Required
        </h1>
        
        <p className="text-gray-600 max-w-xl mx-auto">
          Please provide your current account details to set up direct debit payments
        </p>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Secure & Encrypted</h4>
                <p className="text-sm text-blue-700">
                  Your banking details are encrypted using bank-grade security. 
                  We never store your full account information and only use it to set up direct debit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Banknote className="w-5 h-5 text-green-600" />
              <span>Bank Account Details</span>
            </CardTitle>
            <CardDescription>
              Enter your current account details for direct debit setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Holder Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.accountHolderName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name as it appears on your bank account"
                />
                {errors.accountHolderName && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.accountHolderName}
                  </p>
                )}
              </div>

              {/* Sort Code */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Sort Code *
                </label>
                <input
                  type="text"
                  value={formData.sortCode}
                  onChange={(e) => handleInputChange('sortCode', formatSortCode(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono ${
                    errors.sortCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="12-34-56"
                  maxLength={8}
                />
                {errors.sortCode && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.sortCode}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Enter the 6-digit sort code (e.g., 12-34-56)
                </p>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Account Number *
                </label>
                <div className="relative">
                  <input
                    type={showAccountNumber ? 'text' : 'password'}
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono ${
                      errors.accountNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="12345678"
                    maxLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showAccountNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.accountNumber && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.accountNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Enter the 8-digit account number
                </p>
              </div>

              {/* Security Features */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">Security Features:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Data not stored permanently</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Lock className="mr-2 w-5 h-5 animate-spin" />
                    Securing Your Details...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 w-5 h-5" />
                    Continue Securely
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

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
          Back
        </Button>
      </motion.div>
    </motion.div>
  );
}
