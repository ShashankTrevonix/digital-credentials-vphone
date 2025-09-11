'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Smartphone, 
  Wifi, 
  Globe, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Star,
  Clock,
  Shield,
  Users
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

interface SimPlansProps {
  onPlanSelect: (plan: Plan) => void;
  onBack: () => void;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Essential',
    price: 15,
    data: '5GB',
    minutes: 'Unlimited',
    texts: 'Unlimited',
    features: ['5G Ready', 'EU Roaming', '24/7 Support'],
    color: 'from-blue-500 to-cyan-500',
    icon: Smartphone
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 25,
    data: '20GB',
    minutes: 'Unlimited',
    texts: 'Unlimited',
    features: ['5G Ready', 'EU Roaming', '24/7 Support', 'Hotspot', 'Priority Support'],
    popular: true,
    color: 'from-purple-500 to-pink-500',
    icon: Wifi
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 40,
    data: 'Unlimited',
    minutes: 'Unlimited',
    texts: 'Unlimited',
    features: ['5G Ready', 'Global Roaming', '24/7 Support', 'Hotspot', 'Priority Support', 'VIP Service'],
    color: 'from-green-500 to-emerald-500',
    icon: Globe
  }
];

export default function SimPlans({ onPlanSelect, onBack }: SimPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onPlanSelect(selectedPlan);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
        >
          <Smartphone className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          SIM Only Deals
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Choose the perfect plan for your needs. All plans include unlimited calls and texts.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}
            
            <Card 
              className={`h-full border-2 transition-all duration-300 cursor-pointer ${
                selectedPlan?.id === plan.id 
                  ? 'border-blue-500 shadow-2xl scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <CardHeader className="text-center pb-4">
                <motion.div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                
                <CardDescription className="text-gray-600">
                  Perfect for {plan.name.toLowerCase()} users
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Data, Minutes, Texts */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Data</span>
                    <span className="font-semibold text-gray-900">{plan.data}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Minutes</span>
                    <span className="font-semibold text-gray-900">{plan.minutes}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Texts</span>
                    <span className="font-semibold text-gray-900">{plan.texts}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Selection Indicator */}
                {selectedPlan?.id === plan.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-blue-700 font-semibold">Selected</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why Choose Our SIM Plans?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Instant Activation</h4>
              <p className="text-sm text-gray-600">Get connected in minutes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Secure & Reliable</h4>
              <p className="text-sm text-gray-600">Bank-grade security</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">24/7 Support</h4>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
        >
          Back
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue to Basket
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
