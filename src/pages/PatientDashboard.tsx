import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MessageCircle, Book, MapPin, Clock, User, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { patientAPI } from '../services/api';
import { Patient, Transfusion } from '../types';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { toast } from 'react-toastify';
import { format, parseISO, isFuture } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    if (user && user.role === 'patient') {
      loadPatientData();
    }
  }, [user]);

  const loadPatientData = async () => {
    try {
      if (user) {
        const data = await patientAPI.getPatientProfile(user.id);
        setPatient(data);
      }
    } catch (error) {
      toast.error('Failed to load patient data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBlood = async () => {
    if (!patient) return;
    
    try {
      await patientAPI.requestBlood(patient.id, {
        urgency: 'normal',
        location: patient.location,
        preferredDate: new Date().toISOString()
      });
      toast.success('Blood request submitted successfully!');
      setShowRequestForm(false);
    } catch (error) {
      toast.error('Failed to submit blood request');
    }
  };

  const getStatusColor = (status: Transfusion['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const educationalContent = [
    {
      title: 'Understanding Thalassemia',
      description: 'Learn about the basics of thalassemia and how it affects your body',
      readTime: '5 min read',
      category: 'Basics'
    },
    {
      title: 'Iron Overload Management',
      description: 'Tips for managing iron levels and chelation therapy',
      readTime: '8 min read',
      category: 'Treatment'
    },
    {
      title: 'Nutrition Guidelines',
      description: 'Diet recommendations for thalassemia patients',
      readTime: '6 min read',
      category: 'Lifestyle'
    },
    {
      title: 'Exercise and Activity',
      description: 'Safe exercise practices for thalassemia patients',
      readTime: '4 min read',
      category: 'Lifestyle'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Not Found</h2>
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
          <h1 className="text-3xl font-bold text-gray-900">Hello, {patient.name}</h1>
          <p className="text-gray-600 mt-1">Manage your transfusions and stay informed about your care</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{patient.bloodType}</div>
            <div className="text-sm text-gray-600">Blood Type</div>
          </Card>

          <Card className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{patient.transfusionHistory.length}</div>
            <div className="text-sm text-gray-600">Total Transfusions</div>
          </Card>

          <Card className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {patient.nextTransfusion ? format(parseISO(patient.nextTransfusion), 'MMM dd') : 'TBD'}
            </div>
            <div className="text-sm text-gray-600">Next Transfusion</div>
          </Card>

          <Card className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Dr. Chen</div>
            <div className="text-sm text-gray-600">Blood Warrior</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Transfusion */}
            {patient.nextTransfusion && (
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-900">Upcoming Transfusion</h3>
                  <Button size="sm" onClick={() => setShowRequestForm(true)}>
                    <Heart className="mr-2 h-4 w-4" />
                    Request Blood
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">
                        {format(parseISO(patient.nextTransfusion), 'EEEE, MMMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-blue-700">
                        {isFuture(parseISO(patient.nextTransfusion)) ? 'Scheduled' : 'Past Due'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">NYC Medical Center</div>
                      <div className="text-sm text-blue-700">Hematology Department</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Transfusion History */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfusion History</h3>
              <div className="space-y-3">
                {patient.transfusionHistory.map((transfusion) => (
                  <div key={transfusion.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transfusion.location}</div>
                        <div className="text-sm text-gray-600">
                          {transfusion.donorName ? `Donor: ${transfusion.donorName}` : 'Donor info pending'}
                        </div>
                        <div className="text-sm text-gray-500">{format(parseISO(transfusion.date), 'MMM dd, yyyy')}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transfusion.status)}`}>
                      {transfusion.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Educational Content */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationalContent.map((content, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{content.title}</h4>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{content.category}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{content.description}</p>
                    <div className="flex items-center space-x-2">
                      <Book className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{content.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blood Warrior Contact */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Blood Warrior</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Dr. Michael Chen</div>
                  <div className="text-sm text-gray-600">Blood Specialist</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  <span>Available for chat</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" icon={MessageCircle}>
                Send Message
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full justify-start" 
                  icon={Heart}
                  onClick={() => setShowRequestForm(true)}
                >
                  Request Blood
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Calendar}>
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Book}>
                  View Lab Results
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Phone}>
                  Emergency Contact
                </Button>
              </div>
            </Card>

            {/* Health Tips */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Today's Health Tip</h3>
              <p className="text-green-800 text-sm mb-4">
                Stay hydrated before your transfusion! Drink plenty of water 24 hours before your appointment.
              </p>
              <div className="text-2xl mb-2">💧</div>
              <p className="text-green-700 text-xs">
                This helps with the transfusion process and reduces side effects.
              </p>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency</h3>
              <p className="text-red-800 text-sm mb-4">
                If you experience severe symptoms, contact emergency services immediately.
              </p>
              <Button variant="danger" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Emergency: 911
              </Button>
            </Card>
          </div>
        </div>

        {/* Blood Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Blood Donation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Normal (within 7 days)</option>
                    <option>Urgent (within 3 days)</option>
                    <option>Emergency (within 24 hours)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                  <input 
                    type="text" 
                    defaultValue={patient.location}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Any special requirements or notes..."
                  />
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleRequestBlood}
                    className="flex-1"
                  >
                    Submit Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;