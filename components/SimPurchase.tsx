'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  getPingOneAccessToken, 
  generateQRCode 
} from '@/lib/api';
import { useVerificationPolling } from '@/hooks/useVerificationPolling';
import { toast } from 'sonner';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  MapPin, 
  Calendar,
  Shield,
  Loader2,
  ArrowLeft,
  Sparkles,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import { QRCodeResponse, NormalizedStatus, VerificationStatusResponse } from '@/types/api';
import Link from 'next/link';

type VerificationStep = 
  | 'initial'
  | 'qr_display'
  | 'verifying'
  | 'completed'
  | 'failed';

interface SimPurchaseProps {
  onComplete?: (userData: any) => void;
}

export default function SimPurchase({ onComplete }: SimPurchaseProps) {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('initial');
  const [qrCodeData, setQrCodeData] = useState<QRCodeResponse | null>(null);
  const [verificationData, setVerificationData] = useState<{
    name?: string;
    address?: string;
    age?: string;
    verified?: boolean;
  } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Polling hook for verification status - always call the hook but with current data
  const hasRequiredData = accessToken && qrCodeData?.rawResponse?.environment?.id && qrCodeData?.sessionId && qrCodeData?.rawResponse?.expiresAt;
  
  const {
    status: verificationStatus,
    isLoading: isPolling,
    error: pollingError,
    startPolling,
    reset: resetPolling
  } = useVerificationPolling({
    accessToken: accessToken || '',
    environmentId: qrCodeData?.rawResponse?.environment?.id || '',
    sessionId: qrCodeData?.sessionId || '',
    expiresAt: qrCodeData?.rawResponse?.expiresAt || '',
    onStatusChange: handleVerificationStatusChange,
    onError: handlePollingError
  });

  // Debug logging for polling data
  useEffect(() => {
    if (qrCodeData) {
      console.log('Polling hook data:', {
        accessToken: !!accessToken,
        environmentId: qrCodeData.rawResponse?.environment?.id,
        sessionId: qrCodeData.sessionId,
        expiresAt: qrCodeData.rawResponse?.expiresAt,
        hasRequiredData,
        verificationStatus
      });
    }
  }, [qrCodeData, accessToken, hasRequiredData, verificationStatus]);

  // Auto-start polling when required data becomes available
  useEffect(() => {
    if (hasRequiredData && verificationStatus === 'pending' && !isPolling) {
      console.log('Auto-starting polling with available data...');
      startPolling();
    }
  }, [hasRequiredData, verificationStatus, isPolling, startPolling]);

  // Handle verification status changes
  function handleVerificationStatusChange(
    status: NormalizedStatus, 
    data: VerificationStatusResponse, 
    userInfo?: any
  ) {
    console.log('Verification status changed:', { status, data, userInfo });
    
    switch (status) {
      case 'scanned':
        setCurrentStep('verifying');
        toast.info('QR Code scanned! Please complete verification in your app.');
        break;
      case 'approved':
        setCurrentStep('completed');
        if (userInfo) {
          setVerificationData({
            name: userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`.trim(),
            address: userInfo.address,
            age: userInfo.age?.toString(),
            verified: true
          });
          onComplete?.(userInfo);
        }
        toast.success('Verification completed successfully!');
        break;
      case 'declined':
        setCurrentStep('failed');
        toast.error('Verification was declined by user.');
        break;
      case 'expired':
        setCurrentStep('failed');
        toast.error('Verification session expired.');
        break;
      case 'failed':
        setCurrentStep('failed');
        toast.error('Verification failed.');
        break;
      case 'timeout':
        setCurrentStep('failed');
        toast.error('Verification timed out.');
        break;
    }
  }

  // Handle polling errors
  function handlePollingError(error: Error) {
    console.error('Polling error:', error);
    toast.error(`Verification error: ${error.message}`);
  }

  // Step 1: Get Access Token and Create Presentation Request
  const initiateVerification = async () => {
    try {
      setIsGeneratingQR(true);
      setCurrentStep('qr_display');
      
      // Get access token first
      console.log('🔑 Getting PingOne access token...');
      const tokenResponse = await getPingOneAccessToken();
      setAccessToken(tokenResponse.access_token);
      
      // Create presentation request
      console.log('🌐 Creating presentation request...');
      const qrResponse = await generateQRCode(tokenResponse.access_token);
      
      setQrCodeData(qrResponse);
      toast.success('QR Code generated successfully!');
      
    } catch (error) {
      console.error('Error initiating verification:', error);
      toast.error('Failed to initiate verification. Please try again.');
      setCurrentStep('initial');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  // Reset to initial state
  const resetVerification = () => {
    setCurrentStep('initial');
    setQrCodeData(null);
    setVerificationData(null);
    setAccessToken(null);
    resetPolling();
  };

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
                >
                  <Smartphone className="w-12 h-12 text-white" />
                </motion.div>
                
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                  SIM Card Purchase
                </CardTitle>
                
                <CardDescription className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                  Verify your identity using your digital ID to purchase a new SIM card securely
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <div className="space-y-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Verification</h4>
                      <p className="text-sm text-gray-600">Bank-grade security with PingOne Digital Identity</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instant Activation</h4>
                      <p className="text-sm text-gray-600">Get your SIM activated within minutes</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                  >
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Global Coverage</h4>
                                              <p className="text-sm text-gray-600">Connect anywhere with VPhone's network</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button 
                    onClick={initiateVerification} 
                    disabled={isGeneratingQR}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    size="lg"
                  >
                    {isGeneratingQR ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Initializing Verification...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-6 w-6" />
                        Start Digital ID Verification
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-6">
                <Link href="/">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        );

      case 'qr_display':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
                >
                  <QrCode className="w-10 h-10 text-white" />
                </motion.div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                  Scan QR Code
                </CardTitle>
                
                <CardDescription className="text-lg text-gray-600">
                  Use your NatWest mobile app to scan this QR code and complete verification
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center px-8 pb-6">
                {qrCodeData && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200 shadow-lg"
                    >
                      <img 
                        src={qrCodeData.qrCodeUrl} 
                        alt="Verification QR Code"
                        className="mx-auto w-72 h-72 rounded-xl shadow-lg"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="space-y-3"
                    >
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">
                          📱 Scan this QR code with your NatWest mobile app
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-semibold text-gray-700">Session ID</p>
                          <p className="text-gray-600 font-mono">{qrCodeData.sessionId}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-semibold text-gray-700">Status</p>
                          <p className="text-gray-600 capitalize">{verificationStatus}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  variant="outline" 
                  onClick={resetVerification}
                  disabled={isGeneratingQR}
                  className="px-8 py-3 border-2 border-gray-300 hover:border-red-400 hover:text-red-600 transition-all duration-200"
                >
                  Cancel Verification
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );

      case 'verifying':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  <Clock className="w-12 h-12 text-white" />
                </motion.div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                  Verifying Your Identity
                </CardTitle>
                
                <CardDescription className="text-lg text-gray-600">
                  Please complete the verification process in your mobile app
                </CardDescription>
              </CardHeader>
              
                            <CardContent className="px-8 pb-6">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-green-800 font-medium">QR Code scanned successfully</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-green-800 font-medium">Redirected to NatWest app</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-green-800 font-medium">Biometric verification completed</span>
                    </div>
                    
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                      <span className="text-blue-800 font-medium">Verifying credentials...</span>
                    </motion.div>
                  </motion.div>
                  
                  {isPolling && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center"
                    >
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                      <p className="text-blue-800 font-medium">Checking verification status...</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  variant="outline" 
                  onClick={resetVerification}
                  disabled={isGeneratingQR}
                  className="px-8 py-3 border-2 border-gray-300 hover:border-red-400 hover:text-red-600 transition-all duration-200"
                >
                  Cancel Verification
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );

      case 'completed':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                <CardTitle className="text-3xl font-bold text-green-700 mb-3">
                  Verification Complete! 🎉
                </CardTitle>
                
                <CardDescription className="text-lg text-gray-600">
                  Your identity has been verified successfully
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-6">
                {verificationData && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200"
                    >
                      <h4 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Verified Information
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {verificationData.name && (
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-100">
                            <User className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600">Full Name</p>
                              <p className="font-semibold text-green-800">{verificationData.name}</p>
                            </div>
                          </div>
                        )}
                        
                        {verificationData.address && (
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-100">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600">Address</p>
                              <p className="font-semibold text-green-800">{verificationData.address}</p>
                            </div>
                          </div>
                        )}
                        
                        {verificationData.age && (
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-100">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600">Age</p>
                              <p className="font-semibold text-green-800">{verificationData.age} years</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200"
                    >
                      <h4 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Next Steps
                      </h4>
                      
                      <div className="space-y-3 text-blue-800">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Your SIM card will be activated within 24 hours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>You'll receive a confirmation email with instructions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Your new number will be sent via SMS</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-center space-x-4 pb-6">
                <Button 
                  onClick={resetVerification}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Purchase Another SIM
                </Button>
                
                <Link href="/">
                  <Button variant="outline" className="px-8 py-3 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">
                    Back to Home
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        );

      case 'failed':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  <XCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                <CardTitle className="text-3xl font-bold text-red-700 mb-3">
                  Verification Failed
                </CardTitle>
                
                <CardDescription className="text-lg text-gray-600">
                  Something went wrong during the verification process
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <p className="text-red-800 text-center">
                      Please check your mobile app and try again. If the problem persists, 
                      contact our support team for assistance.
                    </p>
                  </div>
                  
                  {pollingError && (
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Error Details:</h4>
                      <p className="text-red-700 text-sm">{pollingError.message}</p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Ensure your mobile app is up to date</li>
                      <li>• Check your internet connection</li>
                      <li>• Try closing and reopening the app</li>
                      <li>• Contact support if issues persist</li>
                    </ul>
                  </div>
                </motion.div>
              </CardContent>
              
              <CardFooter className="flex justify-center space-x-4 pb-6">
                <Button 
                  onClick={resetVerification}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Try Again
                </Button>
                
                <Link href="/">
                  <Button variant="outline" className="px-8 py-3 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">
                    Back to Home
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SIM Card Purchase
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience secure, contactless SIM card purchase using your digital identity
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16 text-sm text-gray-500"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Lock className="w-4 h-4" />
            <span>Powered by PingOne Digital Identity Platform</span>
          </div>
          <p className="text-xs">Secure • Fast • Reliable</p>
        </motion.div>
      </div>
    </div>
  );
}
