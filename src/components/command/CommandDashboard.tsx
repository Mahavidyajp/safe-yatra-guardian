import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Camera, 
  Plane, 
  MessageCircle,
  Activity,
  Shield,
  Clock,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface CommandDashboardProps {
  user: any;
  onLogout: () => void;
}

const CommandDashboard: React.FC<CommandDashboardProps> = ({ user, onLogout }) => {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: 'crowd_surge',
      location: 'Ram Ghat',
      severity: 'high',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'active'
    },
    {
      id: 2,
      type: 'lost_person',
      location: 'Mahakal Temple',
      severity: 'medium',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      status: 'investigating'
    }
  ]);

  const [droneUnits] = useState([
    { id: 'ARX-001', status: 'active', location: 'Sector A', battery: 85 },
    { id: 'ARX-002', status: 'returning', location: 'Sector B', battery: 32 },
    { id: 'ARX-003', status: 'standby', location: 'Base Station', battery: 100 }
  ]);

  const [crowdData] = useState({
    totalPeople: 45678,
    highDensityAreas: 3,
    mediumDensityAreas: 7,
    lowDensityAreas: 12
  });

  const [lostPersons] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 8,
      lastSeen: 'Shipra Ghat',
      confidence: 89,
      status: 'searching'
    },
    {
      id: 2,
      name: 'Sita Devi',
      age: 65,
      lastSeen: 'Ram Ghat',
      confidence: 76,
      status: 'found'
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update crowd data, alert statuses, etc.
      console.log('Real-time update simulation');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDispatchDrone = (droneId: string) => {
    toast.success(`🚁 Drone ${droneId} dispatched successfully!`, {
      description: 'ETA: 3 minutes to target location'
    });
  };

  const handleResolveAlert = (alertId: number) => {
    setActiveAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' }
          : alert
      )
    );
    toast.success('✅ Alert marked as resolved');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'returning': return 'bg-yellow-500';
      case 'standby': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">SafeYatra Command Center</h1>
            <p className="text-sm text-gray-600">Simhastha 2028 - Emergency Response Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {user.role?.toUpperCase()}
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />
              System Active
            </Badge>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pilgrims</p>
                  <p className="text-2xl font-bold">{crowdData.totalPeople.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-600">
                    {activeAlerts.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Drones Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {droneUnits.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <Plane className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-blue-600">2.3m</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
            <TabsTrigger value="heatmap">Crowd Heatmap</TabsTrigger>
            <TabsTrigger value="drones">AeroRover-X</TabsTrigger>
            <TabsTrigger value="lost-found">Lost & Found</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Real-Time Heatmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Live crowd density map</p>
                      <p className="text-sm">Updates every 5 seconds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Team Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 h-64 overflow-y-auto">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-blue-100 text-blue-800">POLICE</Badge>
                      <div className="text-sm">
                        <p>Unit 7 dispatched to Ram Ghat for crowd control</p>
                        <span className="text-xs text-gray-500">2 min ago</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-red-100 text-red-800">MEDICAL</Badge>
                      <div className="text-sm">
                        <p>Ambulance en route to Mahakal Temple</p>
                        <span className="text-xs text-gray-500">5 min ago</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-100 text-green-800">COORD</Badge>
                      <div className="text-sm">
                        <p>All units report status - situation under control</p>
                        <span className="text-xs text-gray-500">8 min ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className={`${alert.status === 'active' ? 'border-red-500' : ''}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {alert.type.replace('_', ' ').toUpperCase()} at {alert.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      {alert.timestamp.toLocaleTimeString()} - Status: {alert.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity) + ' text-white'}>
                      {alert.severity}
                    </Badge>
                    {alert.status === 'active' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Crowd Density Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
                  <div className="text-center text-gray-600">
                    <Users className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">Interactive Heatmap Loading...</p>
                    <p>Real-time crowd analysis from CCTV and AeroRover-X</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{crowdData.lowDensityAreas}</p>
                    <p className="text-sm text-gray-600">Low Density Areas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{crowdData.mediumDensityAreas}</p>
                    <p className="text-sm text-gray-600">Medium Density Areas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{crowdData.highDensityAreas}</p>
                    <p className="text-sm text-gray-600">High Density Areas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drones" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {droneUnits.map((drone) => (
                <Card key={drone.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Plane className="h-5 w-5" />
                        {drone.id}
                      </span>
                      <Badge className={getDroneStatusColor(drone.status) + ' text-white'}>
                        {drone.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p><strong>Location:</strong> {drone.location}</p>
                      <p><strong>Battery:</strong> {drone.battery}%</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDispatchDrone(drone.id)}
                        disabled={drone.status === 'active'}
                      >
                        Dispatch
                      </Button>
                      <Button size="sm" variant="outline">
                        Track
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lost-found" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Lost Person Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lostPersons.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{person.name}, Age: {person.age}</p>
                        <p className="text-sm text-gray-600">Last seen: {person.lastSeen}</p>
                        <p className="text-sm text-gray-600">AI Confidence: {person.confidence}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={person.status === 'found' ? 'default' : 'destructive'}
                        >
                          {person.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommandDashboard;
