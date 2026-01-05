'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, DollarSign, Car, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';

interface CreateRideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  from: string;
  to: string;
  date: string;
  time: string;
  seatsTotal: number;
  price: string;
  vehicle: string;
  description: string;
}

export function CreateRideModal({ isOpen, onClose }: CreateRideModalProps) {
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    date: '',
    time: '',
    seatsTotal: 1,
    price: '',
    vehicle: '',
    description: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.from.trim()) newErrors.from = 'Starting location is required';
    if (!formData.to.trim()) newErrors.to = 'Destination is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.seatsTotal < 1) newErrors.seatsTotal = 'At least 1 seat is required';
    if (formData.seatsTotal > 8) newErrors.seatsTotal = 'Maximum 8 seats allowed';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) newErrors.price = 'Invalid price';
    if (!formData.vehicle.trim()) newErrors.vehicle = 'Vehicle details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Creating ride:', formData);

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after showing success
    setTimeout(() => {
      setShowSuccess(false);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setFormData({
      from: '',
      to: '',
      date: '',
      time: '',
      seatsTotal: 1,
      price: '',
      vehicle: '',
      description: ''
    });
    setErrors({});
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md text-center">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">Ride Created Successfully!</DialogTitle>
            <DialogDescription>
              Your ride is now live and visible to passengers. You'll receive notifications when someone books a seat.
            </DialogDescription>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleClose} className="min-w-[120px]">
                Done
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Create Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Offer a Ride</DialogTitle>
          <DialogDescription>
            Fill in the details below to create your ride and start earning
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">
                    From <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="from"
                    placeholder="e.g., Downtown Station"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className={errors.from ? 'border-destructive' : ''}
                  />
                  {errors.from && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.from}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">
                    To <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="to"
                    placeholder="e.g., Airport Terminal 1"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className={errors.to ? 'border-destructive' : ''}
                  />
                  {errors.to && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.to}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`pl-9 ${errors.date ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">
                    Time <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={`pl-9 ${errors.time ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.time && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Seats & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">
                    Total Seats <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.seatsTotal.toString()}
                    onValueChange={(value) => setFormData({ ...formData, seatsTotal: parseInt(value) })}
                  >
                    <SelectTrigger id="seats" className={errors.seatsTotal ? 'border-destructive' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} seat{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.seatsTotal && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.seatsTotal}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Note: 1 seat is reserved for you as the driver
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price per Seat <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className={`pl-9 ${errors.price ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.price}
                    </p>
                  )}
                  {formData.price && !errors.price && (
                    <p className="text-xs text-muted-foreground">
                      Estimated earnings: ${((parseFloat(formData.price) || 0) * (formData.seatsTotal - 1)).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle">
                  Vehicle <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vehicle"
                  placeholder="e.g., Toyota Camry - Silver"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className={errors.vehicle ? 'border-destructive' : ''}
                />
                {errors.vehicle && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.vehicle}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Additional Notes
                  <span className="text-muted-foreground font-normal"> (optional)</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Any additional information for passengers (e.g., pets allowed, music preference, luggage space)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Keep it short and helpful. Max 200 characters.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-sm">Important Notes</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your ride will be visible to passengers after creation</li>
                  <li>• You can cancel rides up to 1 hour before departure</li>
                  <li>• All bookings include insurance coverage</li>
                  <li>• Payment is processed after the ride is completed</li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting ? 'Creating...' : 'Create Ride'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
