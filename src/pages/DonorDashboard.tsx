import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Award, Bell, Users, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { donorAPI } from '../services/api';
import { Donor, Badge } from '../types';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { toast } from 'react-toastify';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'donor') {
      loadDonorData();
    }
  }, [user]);

  const loadDonorData = async () => {
    try {
      if (user) {
        const data = await donorAPI.getDonorProfile(user.id);
        setDonor(data);
      }
    } catch (error) {
      toast.error('Failed to load donor data');
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    if (!donor) return;
    
    try {
      const updatedDonor = await donorAPI.updateAvailability(donor.id, !donor.availability);
      if (updatedDonor) {
        setDonor(updatedDonor);
        toast.success(`You are now ${updatedDonor.availability ? 'available' : 'unavailable'} for donations`);
      }
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Blood Request Match',
      message: 'Emma Wilson (O+) needs blood donation in your area',
      time: '2 hours ago',
      type: 'urgent'
    },
    {
      id: 2,
      title: 'Donation Reminder',
      message: 'You\'re eligible to donate again starting March 15th',
      time: '1 day ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'New Badge Earned!',
      message: 'Congratulations! You\'ve earned the "Lifesaver" badge',
      time: '3 days ago',
      type: 'success'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Donor Not Found</h2>
          <p className="text-gray-600">Please try again or contact support.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {donor.name}!</h1>
          <p className="text-gray-600 mt-1">Your blood donations are making a difference in lives</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{donor.totalDonations}</div>
            <div className="text-sm text-gray-600">Total Donations</div>
          </Card>

          <Card className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{donor.totalDonations * 3}</div>
            <div className="text-sm text-gray-600">Lives Impacted</div>
          </Card>

          <Card className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{donor.badges.length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </Card>

          <Card className="text-center">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
              donor.availability ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {donor.availability ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-gray-600" />
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {donor.availability ? 'Available' : 'Unavailable'}
            </div>
            <div className="text-sm text-gray-600">Current Status</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Availability Toggle */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Donation Availability</h3>
                  <p className="text-gray-600 text-sm">Let patients know if you're available to donate</p>
                </div>
                <Button
                  onClick={toggleAvailability}
                  variant={donor.availability ? 'danger' : 'primary'}
                  icon={donor.availability ? XCircle : CheckCircle}
                >
                  {donor.availability ? 'Set Unavailable' : 'Set Available'}
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Blood Type:</span>
                  <span className="font-medium text-gray-900">{donor.bloodType}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{donor.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Next Eligible:</span>
                  <span className="font-medium text-gray-900">{donor.nextEligibleDate}</span>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donor.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border ${getBadgeColor(badge.level)}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm opacity-75">{badge.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Next Badge Preview */}
                <div className="p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl opacity-50">🏅</div>
                    <div>
                      <div className="font-medium text-gray-700">Platinum Hero</div>
                      <div className="text-sm text-gray-600">3 more donations to unlock</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Donation History */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h3>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', patient: 'Emma Wilson', location: 'NYC Medical Center', status: 'completed' },
                  { date: '2023-12-20', patient: 'John Smith', location: 'Downtown Clinic', status: 'completed' },
                  { date: '2023-11-25', patient: 'Sarah Davis', location: 'Community Hospital', status: 'completed' }
                ].map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{donation.patient}</div>
                        <div className="text-sm text-gray-600">{donation.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{donation.date}</div>
                      <div className="text-xs text-green-600 capitalize">{donation.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="h-5 w-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.type === 'urgent' ? 'border-red-400 bg-red-50' :
                      notification.type === 'success' ? 'border-green-400 bg-green-50' :
                      'border-blue-400 bg-blue-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900 text-sm">{notification.title}</div>
                    <div className="text-gray-600 text-sm mt-1">{notification.message}</div>
                    <div className="text-gray-500 text-xs mt-1">{notification.time}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" icon={Calendar}>
                  Schedule Donation
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Activity}>
                  View Health Tips
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Users}>
                  Find Nearby Centers
                </Button>
              </div>
            </Card>

            {/* Impact Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Impact</h3>
              <p className="text-blue-800 text-sm mb-4">
                Your {donor.totalDonations} donations have potentially saved {donor.totalDonations * 3} lives!
              </p>
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-blue-700 text-xs">
                Keep up the amazing work! Every donation matters.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;