'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar,
  CreditCard,
  Shield,
  Loader2,
  CheckCircle
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

interface ManualDetailsFormProps {
  selectedPlan: Plan;
  onBack: () => void;
  onSubmit: (details: {
    firstName: string;
    lastName: string;
    address: string;
    dateOfBirth: string;
    paymentMethod: 'paypal' | 'card';
    cardDetails?: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      cardholderName: string;
    };
    paypalEmail?: string;
  }) => void;
}

export default function ManualDetailsForm({ 
  selectedPlan, 
  onBack, 
  onSubmit 
}: ManualDetailsFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    paymentMethod: 'card' as 'paypal' | 'card',
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    },
    paypalEmail: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    // Validate payment details based on selected method
    if (formData.paymentMethod === 'card') {
      if (!formData.cardDetails.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Card number must be at least 16 digits';
      }

      if (!formData.cardDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      }

      if (!formData.cardDetails.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cardDetails.cvv.length < 3) {
        newErrors.cvv = 'CVV must be at least 3 digits';
      }

      if (!formData.cardDetails.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    } else if (formData.paymentMethod === 'paypal') {
      if (!formData.paypalEmail.trim()) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = 'Please enter a valid email address';
      }
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(formData);
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCardDetailChange = (field: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      cardDetails: { ...prev.cardDetails, [field]: value }
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

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
          <User className="w-8 h-8 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Personal Details & Payment
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please provide your personal information and select your preferred payment method
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>
                All fields are required to complete your SIM card purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full address"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === 'card' && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('paymentMethod', 'paypal')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentMethod === 'paypal'
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === 'paypal' && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">PayPal</h4>
                          <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-xl border">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card Details
                    </h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardDetails.cardNumber}
                        onChange={(e) => handleCardDetailChange('cardNumber', formatCardNumber(e.target.value))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={formData.cardDetails.expiryDate}
                          onChange={(e) => handleCardDetailChange('expiryDate', formatExpiryDate(e.target.value))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.cardDetails.cvv}
                          onChange={(e) => handleCardDetailChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.cardDetails.cardholderName}
                        onChange={(e) => handleCardDetailChange('cardholderName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.cardholderName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Name as it appears on card"
                      />
                      {errors.cardholderName && (
                        <p className="text-red-600 text-sm mt-1">{errors.cardholderName}</p>
                      )}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-xl border">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      PayPal Details
                    </h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.paypalEmail}
                        onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.paypalEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.paypalEmail && (
                        <p className="text-red-600 text-sm mt-1">{errors.paypalEmail}</p>
                      )}
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 w-5 h-5" />
                        Complete Purchase
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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

      {/* Back Button */}
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
