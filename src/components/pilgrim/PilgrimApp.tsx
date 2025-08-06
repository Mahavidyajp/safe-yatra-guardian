
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Users, Camera, Navigation, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface PilgrimAppProps {
  user: any;
  onLogout: () => void;
}

const PilgrimApp: React.FC<PilgrimAppProps> = ({ user, onLogout }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [crowdLevel, setCrowdLevel] = useState('low');
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Use demo coordinates for Ujjain
          setLocation({ lat: 23.1765, lng: 75.7885 });
        }
      );
    }

    // Simulate network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    toast.success('🚨 SOS Alert Sent! Emergency services are being notified.', {
      description: `Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
    });
    
    // Simulate SOS duration
    setTimeout(() => {
      setSosActive(false);
    }, 10000);
  };

  const handleLostFound = () => {
    toast.info('📸 Opening camera for lost person report...', {
      description: 'AI will analyze the photo and search CCTV feeds'
    });
  };

  const handleNavigation = () => {
    toast.info('🗺️ Finding safest route...', {
      description: 'Avoiding crowded areas and guiding to safe zones'
    });
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">SafeYatra</h1>
            <p className="text-sm text-gray-600">Simhastha 2028</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* SOS Emergency Button */}
        <Card className="border-red-200">
          <CardContent className="p-6">
            <Button
              size="lg"
              className={`w-full h-20 text-lg font-bold ${
                sosActive 
                  ? 'bg-red-600 hover:bg-red-700 emergency-pulse' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              onClick={handleSOS}
              disabled={sosActive}
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              {sosActive ? 'SOS ACTIVE - HELP COMING!' : 'EMERGENCY SOS'}
            </Button>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Press for immediate emergency assistance
            </p>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Current Location Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Crowd Level:</span>
              <Badge className={`${getCrowdColor(crowdLevel)} text-white`}>
                {crowdLevel.charAt(0).toUpperCase() + crowdLevel.slice(1)}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleLostFound}>
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium text-sm">Lost & Found</h3>
              <p className="text-xs text-gray-600">Report missing person</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleNavigation}>
            <CardContent className="p-4 text-center">
              <Navigation className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium text-sm">Safe Route</h3>
              <p className="text-xs text-gray-600">Navigate safely</p>
            </CardContent>
          </Card>
        </div>

        {/* Crowd Heatmap */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Crowd Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Interactive map will load here</p>
                <p className="text-xs">Real-time crowd density visualization</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                Safe
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                Moderate
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                Crowded
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800">Safety Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Stay hydrated and avoid overcrowded areas</li>
              <li>• Keep emergency contacts ready</li>
              <li>• Follow official announcements</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PilgrimApp;
