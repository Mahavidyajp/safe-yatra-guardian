
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userData: any) => void;
  userType: 'pilgrim' | 'command';
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, userType }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [language, setLanguage] = useState('en');
  const [role, setRole] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: userType === 'pilgrim' ? 'SafeYatra Pilgrim' : 'Command Center',
      subtitle: userType === 'pilgrim' ? 'Your safety companion for Simhastha 2028' : 'Emergency Response Dashboard',
      email: 'Email Address',
      phone: 'Phone Number',
      otp: 'Enter OTP',
      role: 'Select Role',
      sendOtp: 'Send OTP',
      verify: 'Verify & Login',
      language: 'Language'
    },
    hi: {
      title: userType === 'pilgrim' ? 'सेफयात्रा यात्री' : 'नियंत्रण केंद्र',
      subtitle: userType === 'pilgrim' ? 'सिंहस्थ 2028 के लिए आपका सुरक्षा साथी' : 'आपातकालीन प्रतिक्रिया डैशबोर्ड',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      otp: 'OTP दर्ज करें',
      role: 'भूमिका चुनें',
      sendOtp: 'OTP भेजें',
      verify: 'सत्यापित करें और लॉगिन करें',
      language: 'भाषा'
    },
    mr: {
      title: userType === 'pilgrim' ? 'सेफयात्रा यात्री' : 'नियंत्रण केंद्र',
      subtitle: userType === 'pilgrim' ? 'सिंहस्थ 2028 साठी तुमचा सुरक्षा साथी' : 'आणीबाणी प्रतिसाद डॅशबोर्ड',
      email: 'ईमेल पत्ता',
      phone: 'फोन नंबर',
      otp: 'OTP प्रविष्ट करा',
      role: 'भूमिका निवडा',
      sendOtp: 'OTP पाठवा',
      verify: 'सत्यापित करा आणि लॉगिन करा',
      language: 'भाषा'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSendOTP = async () => {
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log('OTP sent to:', email || phone);
    }, 2000);
  };

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call to verify OTP and login
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        email: email || `${phone}@phone.safeyatra.com`,
        phone,
        language,
        role: userType === 'command' ? role : 'pilgrim',
        userType
      };
      onLogin(userData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            {userType === 'pilgrim' ? (
              <Shield className="h-6 w-6 text-orange-600" />
            ) : (
              <Shield className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {t.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">{t.language}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userType === 'command' && (
            <div className="space-y-2">
              <Label htmlFor="role">{t.role}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="medical">Medical Team</SelectItem>
                  <SelectItem value="coordinator">Emergency Coordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilgrim@safeyatra.com"
                  disabled={otpSent}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  disabled={otpSent}
                />
              </div>
            </TabsContent>
          </Tabs>

          {otpSent && (
            <div className="space-y-2">
              <Label htmlFor="otp">{t.otp}</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
              />
            </div>
          )}
        </CardContent>

        <CardFooter>
          {!otpSent ? (
            <Button 
              onClick={handleSendOTP} 
              className="w-full"
              disabled={loading || (!email && !phone) || (userType === 'command' && !role)}
            >
              {loading ? 'Sending...' : t.sendOtp}
            </Button>
          ) : (
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={loading || !otp}
            >
              {loading ? 'Verifying...' : t.verify}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
