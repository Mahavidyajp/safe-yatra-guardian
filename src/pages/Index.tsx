
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import PilgrimApp from '@/components/pilgrim/PilgrimApp';
import CommandDashboard from '@/components/command/CommandDashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Smartphone, Monitor } from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState(null);
  const [appMode, setAppMode] = useState<'select' | 'pilgrim' | 'command'>('select');

  const handleLogin = (userData: any) => {
    setUser(userData);
    setAppMode(userData.userType);
  };

  const handleLogout = () => {
    setUser(null);
    setAppMode('select');
  };

  const handleModeSelect = (mode: 'pilgrim' | 'command') => {
    setAppMode(mode);
  };

  if (user && appMode === 'pilgrim') {
    return <PilgrimApp user={user} onLogout={handleLogout} />;
  }

  if (user && appMode === 'command') {
    return <CommandDashboard user={user} onLogout={handleLogout} />;
  }

  if (appMode === 'pilgrim' || appMode === 'command') {
    return <LoginForm onLogin={handleLogin} userType={appMode} />;
  }

  // Mode Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-blue-600">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            SafeYatra
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            AI-Powered Safety System for Simhastha 2028
          </p>
          <p className="text-gray-600 max-w-lg mx-auto">
            Comprehensive emergency response system combining mobile apps, AI monitoring, 
            and drone technology to ensure pilgrim safety during the Kumbh Mela.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-green-600 mb-2">🚁</div>
              <h3 className="font-medium text-green-800">AeroRover-X Integration</h3>
              <p className="text-xs text-green-700">AI-powered drone monitoring</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-blue-600 mb-2">🗺️</div>
              <h3 className="font-medium text-blue-800">Real-time Heatmaps</h3>
              <p className="text-xs text-blue-700">Live crowd density tracking</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-red-600 mb-2">🚨</div>
              <h3 className="font-medium text-red-800">Emergency Response</h3>
              <p className="text-xs text-red-700">&lt;5 minute response time</p>
            </CardContent>
          </Card>
        </div>

        {/* Access Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Select Your Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-orange-300"
              onClick={() => handleModeSelect('pilgrim')}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Smartphone className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pilgrim App</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Mobile safety companion with SOS, navigation, and lost & found features
                  </p>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Continue as Pilgrim
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
              onClick={() => handleModeSelect('command')}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Monitor className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Command Center</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Emergency response dashboard for police, medical teams, and coordinators
                  </p>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">70%</p>
            <p className="text-sm text-gray-600">Stampede Risk Reduction</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">&lt;5min</p>
            <p className="text-sm text-gray-600">Emergency Response</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">&lt;2min</p>
            <p className="text-sm text-gray-600">Lost Person Tracing</p>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="text-xs text-gray-500 max-w-md mx-auto">
          <p>✅ DPDP Act 2023 Compliant • ✅ DGCA Drone Regulations • ✅ Privacy Protected</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
