import axios from 'axios';
import { User, Donor, Patient, BloodWarrior, DonorMatch, AnalyticsData, Transfusion } from '../types';

const API_BASE_URL = 'https://api.thalacare.com'; // Mock URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock data
const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'donor',
    bloodType: 'O+',
    location: 'New York, NY',
    phone: '+1-555-0123',
    availability: true,
    lastDonation: '2024-01-15',
    totalDonations: 12,
    badges: [
      { id: '1', name: 'Lifesaver', description: '10+ donations', icon: '🏆', level: 'gold' },
      { id: '2', name: 'Hero', description: '5+ donations', icon: '⭐', level: 'silver' }
    ],
    nextEligibleDate: '2024-03-15'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    role: 'donor',
    bloodType: 'A+',
    location: 'Los Angeles, CA',
    phone: '+1-555-0124',
    availability: true,
    lastDonation: '2024-02-01',
    totalDonations: 8,
    badges: [
      { id: '2', name: 'Hero', description: '5+ donations', icon: '⭐', level: 'silver' }
    ],
    nextEligibleDate: '2024-04-01'
  }
];

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'patient',
    bloodType: 'O+',
    location: 'New York, NY',
    phone: '+1-555-0125',
    nextTransfusion: '2024-02-20',
    transfusionHistory: [
      { id: '1', date: '2024-01-20', donorId: '1', donorName: 'Alex Johnson', location: 'NYC Medical Center', status: 'completed' },
      { id: '2', date: '2024-02-20', location: 'NYC Medical Center', status: 'scheduled' }
    ],
    assignedWarrior: '1'
  }
];

const mockWarriors: BloodWarrior[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    email: 'michael@example.com',
    role: 'warrior',
    assignedPatients: ['1'],
    assignedDonors: ['1', '2']
  }
];

const mockAnalytics: AnalyticsData = {
  totalDonors: 1250,
  activeDonors: 890,
  totalPatients: 320,
  monthlyDonations: 145,
  successfulMatches: 98.5,
  avgResponseTime: 2.3
};

// Mock API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const allUsers = [...mockDonors, ...mockPatients, ...mockWarriors];
    const user = allUsers.find(u => u.email === email);
    
    if (user && password === 'password') {
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token: 'mock-jwt-token' };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (userData: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    } as User;
    
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(newUser));
    return { user: newUser, token: 'mock-jwt-token' };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const donorAPI = {
  getDonorProfile: async (id: string): Promise<Donor> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const donor = mockDonors.find(d => d.id === id);
    if (!donor) throw new Error('Donor not found');
    return donor;
  },

  updateAvailability: async (id: string, availability: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const donor = mockDonors.find(d => d.id === id);
    if (donor) {
      donor.availability = availability;
    }
    return donor;
  }
};

export const patientAPI = {
  getPatientProfile: async (id: string): Promise<Patient> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const patient = mockPatients.find(p => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return patient;
  },

  requestBlood: async (patientId: string, requestData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, requestId: Date.now().toString() };
  }
};

export const matchingAPI = {
  getDonorMatches: async (patientId: string): Promise<DonorMatch[]> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return [];

    return mockDonors.map((donor, index) => ({
      id: `match-${donor.id}`,
      donor,
      patient,
      compatibility: 95 - (index * 5),
      distance: 2.5 + (index * 1.2),
      lastDonation: donor.lastDonation || '2024-01-01',
      aiConfidence: 92 - (index * 3)
    }));
  }
};

export const analyticsAPI = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockAnalytics;
  },

  getMonthlyData: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      { month: 'Jan', donations: 98, matches: 45 },
      { month: 'Feb', donations: 85, matches: 52 },
      { month: 'Mar', donations: 112, matches: 48 },
      { month: 'Apr', donations: 127, matches: 61 },
      { month: 'May', donations: 145, matches: 58 },
      { month: 'Jun', donations: 134, matches: 63 }
    ];
  }
};

export default api;