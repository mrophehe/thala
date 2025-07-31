import React, { useState, useEffect } from 'react';
import { Users, Heart, Activity, TrendingUp, Clock, MapPin, Search, Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { matchingAPI, analyticsAPI } from '../services/api';
import { DonorMatch, AnalyticsData } from '../types';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [matches, setMatches] = useState<DonorMatch[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [analyticsData, matchData, monthlyStats] = await Promise.all([
        analyticsAPI.getAnalytics(),
        matchingAPI.getDonorMatches('1'), // Sample patient ID
        analyticsAPI.getMonthlyData()
      ]);
      
      setAnalytics(analyticsData);
      setMatches(matchData);
      setMonthlyData(monthlyStats);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const confirmMatch = async (matchId: string) => {
    toast.success('Match confirmed! Donor and patient have been notified.');
    // In a real app, this would make an API call
  };

  const exportData = () => {
    toast.success('Analytics data exported successfully!');
    // In a real app, this would trigger a CSV download
  };

  const pieData = [
    { name: 'Available Donors', value: 65, color: '#10B981' },
    { name: 'Busy Donors', value: 25, color: '#F59E0B' },
    { name: 'Unavailable', value: 10, color: '#EF4444' }
  ];

  const filteredMatches = matches.filter(match => 
    match.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blood Warrior Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}. Manage donations and save lives.</p>
          </div>
          <Button onClick={exportData} icon={Download}>
            Export Data
          </Button>
        </div>

        {/* Key Metrics */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.totalDonors.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Donors</div>
              <div className="text-xs text-green-600 mt-1">↑ {analytics.activeDonors} active</div>
            </Card>

            <Card className="text-center">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.totalPatients}</div>
              <div className="text-sm text-gray-600">Active Patients</div>
              <div className="text-xs text-blue-600 mt-1">24 new this month</div>
            </Card>

            <Card className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.monthlyDonations}</div>
              <div className="text-sm text-gray-600">This Month</div>
              <div className="text-xs text-green-600 mt-1">↑ 12% vs last month</div>
            </Card>

            <Card className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.successfulMatches}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="text-xs text-purple-600 mt-1">
                {analytics.avgResponseTime}min avg response
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Matching Dashboard */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">AI Donor-Patient Matching</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search matches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm" icon={Filter}>
                    Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <div key={match.id} className="p-4 bg-gray-50 rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center border-2 border-white">
                            <Heart className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {match.donor.name} → {match.patient.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {match.donor.bloodType} | {match.distance.toFixed(1)} miles away
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">
                            {match.compatibility}% compatible
                          </div>
                          <div className="text-xs text-gray-500">
                            AI Confidence: {match.aiConfidence}%
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => confirmMatch(match.id)}
                        >
                          Confirm Match
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Last donation: {match.lastDonation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Location: {match.donor.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-600">Patient: {match.patient.name}</div>
                        <div className="text-gray-600">Type: {match.patient.bloodType}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donations</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Successful Matches</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="matches" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donor Status */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Availability</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New donor registered', user: 'Sarah M.', time: '2 min ago', type: 'success' },
                  { action: 'Blood request submitted', user: 'John D.', time: '15 min ago', type: 'info' },
                  { action: 'Donation completed', user: 'Alex J.', time: '1 hour ago', type: 'success' },
                  { action: 'Match confirmed', user: 'Emma W.', time: '2 hours ago', type: 'success' },
                  { action: 'New patient added', user: 'Mike R.', time: '3 hours ago', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                      <div className="text-xs text-gray-600">{activity.user} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" icon={Users}>
                  View All Donors
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Heart}>
                  Manage Patients
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={Activity}>
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={TrendingUp}>
                  View Analytics
                </Button>
              </div>
            </Card>

            {/* System Status */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800">AI Matching</span>
                  <span className="text-green-600 font-medium">✓ Online</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800">Database</span>
                  <span className="text-green-600 font-medium">✓ Healthy</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800">Notifications</span>
                  <span className="text-green-600 font-medium">✓ Active</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-green-700">
                All systems operational • Last updated: 2 min ago
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;