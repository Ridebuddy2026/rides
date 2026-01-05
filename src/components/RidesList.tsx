'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Users, Star, Clock, Search, Filter, ChevronLeft, ChevronRight, Car, CreditCard } from 'lucide-react';
import Image from 'next/image';

interface Ride {
  id: string;
  from: string;
  to: string;
  departureTime: Date;
  arrivalTime: Date;
  seatsAvailable: number;
  seatsTotal: number;
  price: number;
  driverName: string;
  driverRating: number;
  driverTrips: number;
  vehicle: string;
  status: string;
}

interface RidesListProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for demonstration
const mockRides: Ride[] = [
  {
    id: '1',
    from: 'Downtown Station',
    to: 'Airport Terminal 1',
    departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    seatsAvailable: 3,
    seatsTotal: 4,
    price: 25.00,
    driverName: 'Sarah Johnson',
    driverRating: 4.9,
    driverTrips: 342,
    vehicle: 'Toyota Camry',
    status: 'active'
  },
  {
    id: '2',
    from: 'University Campus',
    to: 'Shopping Mall',
    departureTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
    seatsAvailable: 2,
    seatsTotal: 3,
    price: 12.50,
    driverName: 'Michael Chen',
    driverRating: 4.8,
    driverTrips: 215,
    vehicle: 'Honda Civic',
    status: 'active'
  },
  {
    id: '3',
    from: 'Business District',
    to: 'Residential Area',
    departureTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
    seatsAvailable: 4,
    seatsTotal: 4,
    price: 18.00,
    driverName: 'Emily Davis',
    driverRating: 5.0,
    driverTrips: 189,
    vehicle: 'Nissan Altima',
    status: 'active'
  },
  {
    id: '4',
    from: 'Train Station',
    to: 'Convention Center',
    departureTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 8.5 * 60 * 60 * 1000),
    seatsAvailable: 1,
    seatsTotal: 3,
    price: 15.00,
    driverName: 'David Wilson',
    driverRating: 4.7,
    driverTrips: 156,
    vehicle: 'Ford Focus',
    status: 'active'
  },
  {
    id: '5',
    from: 'Hospital',
    to: 'City Park',
    departureTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    arrivalTime: new Date(Date.now() + 24.5 * 60 * 60 * 1000),
    seatsAvailable: 2,
    seatsTotal: 3,
    price: 10.00,
    driverName: 'Lisa Anderson',
    driverRating: 4.9,
    driverTrips: 298,
    vehicle: 'Hyundai Elantra',
    status: 'active'
  }
];

export function RidesList({ isOpen, onClose }: RidesListProps) {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPassengers, setFilterPassengers] = useState('1');
  const [sortBy, setSortBy] = useState('departure');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [bookingSeats, setBookingSeats] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const ridesPerPage = 6;

  const filteredRides = mockRides.filter(ride => {
    const matchesFrom = !searchFrom || ride.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchesTo = !searchTo || ride.to.toLowerCase().includes(searchTo.toLowerCase());
    const matchesDate = !filterDate || ride.departureTime.toDateString() === new Date(filterDate).toDateString();
    const matchesPassengers = ride.seatsAvailable >= parseInt(filterPassengers);
    return matchesFrom && matchesTo && matchesDate && matchesPassengers;
  });

  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'departure') return a.departureTime.getTime() - b.departureTime.getTime();
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'seats') return b.seatsAvailable - a.seatsAvailable;
    if (sortBy === 'rating') return b.driverRating - a.driverRating;
    return 0;
  });

  const paginatedRides = sortedRides.slice(
    (currentPage - 1) * ridesPerPage,
    currentPage * ridesPerPage
  );

  const totalPages = Math.ceil(sortedRides.length / ridesPerPage);

  const handleBookRide = () => {
    console.log('Booking ride:', selectedRide?.id, 'Seats:', bookingSeats);
    setSelectedRide(null);
    onClose();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Available Rides</DialogTitle>
          <DialogDescription>
            Find the perfect ride for your journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="From"
                  className="pl-9"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="To"
                  className="pl-9"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-9"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <Select value={filterPassengers} onValueChange={setFilterPassengers}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departure">Earliest Departure</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="seats">Most Seats</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Badge variant="secondary">
                {sortedRides.length} rides found
              </Badge>
            </div>
          </div>

          {/* Results */}
          {paginatedRides.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => {
                setSearchFrom('');
                setSearchTo('');
                setFilterDate('');
                setFilterPassengers('1');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {paginatedRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {ride.from} → {ride.to}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(ride.departureTime)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTime(ride.departureTime)} - {formatTime(ride.arrivalTime)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${ride.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">per seat</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{ride.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{ride.driverName}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {ride.driverRating}
                            </span>
                            <span>•</span>
                            <span>{ride.driverTrips} trips</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {ride.vehicle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{ride.seatsAvailable}</span>
                            <span className="text-muted-foreground">/ {ride.seatsTotal} seats</span>
                          </div>
                          {ride.seatsAvailable === 1 && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Only 1 seat left!
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        setSelectedRide(ride);
                        setBookingSeats(1);
                      }}
                      disabled={ride.seatsAvailable === 0}
                      className="w-full"
                    >
                      {ride.seatsAvailable === 0 ? 'Fully Booked' : 'Book Now'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Dialog */}
        <Dialog open={!!selectedRide} onOpenChange={() => setSelectedRide(null)}>
          <DialogContent className="max-w-md">
            {selectedRide && (
              <>
                <DialogHeader>
                  <DialogTitle>Book Your Ride</DialogTitle>
                  <DialogDescription>
                    Review your booking details
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{selectedRide.from}</h4>
                          <p className="text-sm text-muted-foreground">to</p>
                          <h4 className="font-semibold text-lg">{selectedRide.to}</h4>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-medium">
                          {formatDate(selectedRide.departureTime)} at {formatTime(selectedRide.departureTime)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Driver</span>
                        <span className="font-medium">{selectedRide.driverName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vehicle</span>
                        <span className="font-medium">{selectedRide.vehicle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per seat</span>
                        <span className="font-medium">${selectedRide.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Label htmlFor="seats">Number of Seats</Label>
                    <Select
                      value={bookingSeats.toString()}
                      onValueChange={(value) => setBookingSeats(parseInt(value))}
                    >
                      <SelectTrigger id="seats">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: selectedRide.seatsAvailable }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} seat{i > 0 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${(selectedRide.price * bookingSeats).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button onClick={handleBookRide} className="w-full gap-2" size="lg">
                    <CreditCard className="h-5 w-5" />
                    Confirm Booking
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedRide(null)} className="w-full">
                    Cancel
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
