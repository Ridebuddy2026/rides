'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Users, DollarSign, Car, Shield, Clock, Heart, Star, ArrowRight, Search, Menu, X } from 'lucide-react';
import { RidesList } from '@/components/RidesList';
import { CreateRideModal } from '@/components/CreateRideModal';

interface FormData {
  from: string;
  to: string;
  date: string;
  passengers: string;
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [ridesListOpen, setRidesListOpen] = useState(false);
  const [createRideOpen, setCreateRideOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    setRidesListOpen(true);
  };

  const handleCreateRide = () => {
    setCreateRideOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-24 w-24">
              <Image
                src="/images/logo.png"
                alt="RideBuddies Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </a>
            <a href="#drivers" className="text-sm font-medium transition-colors hover:text-primary">
              Become a Driver
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Find Rides</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Find Your Ride</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="from"
                        placeholder="Starting location"
                        className="pl-9"
                        value={formData.from}
                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="to"
                        placeholder="Destination"
                        className="pl-9"
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-9"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select value={formData.passengers} onValueChange={(value) => setFormData({ ...formData, passengers: value })}>
                        <SelectTrigger id="passengers">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSearch} className="w-full">
                    Search Rides
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button size="sm" onClick={handleCreateRide} className="gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Create Ride</span>
            </Button>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium">Features</a>
            <a href="#how-it-works" className="block text-sm font-medium">How It Works</a>
            <a href="#drivers" className="block text-sm font-medium">Become a Driver</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                ✨ Join 50,000+ happy travelers
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Share Rides, Save Money, Make Friends
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with verified drivers and passengers heading your way. Enjoy affordable, safe, and eco-friendly travel across the city.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2 text-base">
                      <Search className="h-5 w-5" />
                      Find a Ride
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Find Your Ride</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-from">From</Label>
                        <Input
                          id="hero-from"
                          placeholder="Starting location"
                          value={formData.from}
                          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-to">To</Label>
                        <Input
                          id="hero-to"
                          placeholder="Destination"
                          value={formData.to}
                          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleSearch} className="w-full">
                        Search Rides
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" onClick={handleCreateRide} className="gap-2 text-base">
                  <Car className="h-5 w-5" />
                  Offer a Ride
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-sm text-muted-foreground">(12,500+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-banner.png"
                  alt="People sharing rides together"
                  width={1440}
                  height={720}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">Save up to 70%</p>
                    <p className="text-sm text-muted-foreground">On travel costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">10M+</p>
              <p className="text-sm text-muted-foreground">Kilometers Shared</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">15K+</p>
              <p className="text-sm text-muted-foreground">Verified Drivers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RideBuddies?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make carpooling simple, safe, and enjoyable for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Save Money</CardTitle>
                <CardDescription>
                  Split travel costs with others and save up to 70% compared to solo driving or taxis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Safe & Verified</CardTitle>
                <CardDescription>
                  All drivers are verified with background checks and identity verification for your peace of mind
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Make Friends</CardTitle>
                <CardDescription>
                  Connect with like-minded travelers and build meaningful connections on your journeys
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Flexible Schedule</CardTitle>
                <CardDescription>
                  Choose rides that match your schedule with departure times available throughout the day
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Eco-Friendly</CardTitle>
                <CardDescription>
                  Reduce your carbon footprint by sharing rides and contributing to a greener planet
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Our dedicated support team is available round the clock to assist you with any issues
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start carpooling in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Search or Create</h3>
              <p className="text-muted-foreground">
                Find existing rides that match your route or create your own and earn money
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Book & Confirm</h3>
              <p className="text-muted-foreground">
                Book your seat with one click, receive instant confirmation, and chat with your driver
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy the Ride</h3>
              <p className="text-muted-foreground">
                Meet at the pickup point, enjoy your journey, and share the experience
              </p>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Image
              src="/images/community-ride.png"
              alt="Community ride sharing"
              width={1344}
              height={768}
              className="rounded-2xl shadow-xl max-w-4xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* For Drivers Section */}
      <section id="drivers" className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/car_logo.png"
                alt="RideBuddies Car"
                width={1344}
                height={768}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                💰 Earn Money
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Become a Driver & Earn Extra Income
              </h2>
              <p className="text-lg text-muted-foreground">
                Turn your daily commute into money. Share your car seats with passengers heading the same way and cover your fuel costs or earn extra income.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Cover Your Costs</p>
                    <p className="text-sm text-muted-foreground">
                      Share expenses with passengers and reduce your monthly driving costs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Full Insurance Coverage</p>
                    <p className="text-sm text-muted-foreground">
                      Get comprehensive insurance protection for every ride you offer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Choose Your Passengers</p>
                    <p className="text-sm text-muted-foreground">
                      Review passenger profiles and choose who you share your ride with
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 rounded-full p-1 mt-0.5">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Flexible Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      Drive when you want - offer rides that fit your routine
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" className="gap-2">
                  Start Earning Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Download Our Mobile App
              </h2>
              <p className="text-lg text-primary-foreground/90">
                Book rides on the go with our mobile app. Get real-time notifications, track your driver, and manage bookings from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  <span className="text-2xl"></span>
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/ride-sharing-app.png"
                alt="RideBuddies Mobile App"
                width={1024}
                height={1024}
                className="rounded-2xl shadow-2xl max-w-sm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative h-32 w-32">
                  <Image
                    src="/images/logo.png"
                    alt="RideBuddies Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Making travel affordable, safe, and social for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Safety</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RideBuddies. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <RidesList isOpen={ridesListOpen} onClose={() => setRidesListOpen(false)} />
      <CreateRideModal isOpen={createRideOpen} onClose={() => setCreateRideOpen(false)} />
    </div>
  );
}
