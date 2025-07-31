export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'patient' | 'warrior';
  bloodType?: string;
  location?: string;
  phone?: string;
  avatar?: string;
}

export interface Donor extends User {
  role: 'donor';
  bloodType: string;
  location: string;
  availability: boolean;
  lastDonation?: string;
  totalDonations: number;
  badges: Badge[];
  nextEligibleDate?: string;
}

export interface Patient extends User {
  role: 'patient';
  bloodType: string;
  location: string;
  nextTransfusion?: string;
  transfusionHistory: Transfusion[];
  assignedWarrior?: string;
}

export interface BloodWarrior extends User {
  role: 'warrior';
  assignedPatients: string[];
  assignedDonors: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
}

export interface Transfusion {
  id: string;
  date: string;
  donorId?: string;
  donorName?: string;
  location: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export interface DonorMatch {
  id: string;
  donor: Donor;
  patient: Patient;
  compatibility: number;
  distance: number;
  lastDonation: string;
  aiConfidence: number;
}

export interface AnalyticsData {
  totalDonors: number;
  activeDonors: number;
  totalPatients: number;
  monthlyDonations: number;
  successfulMatches: number;
  avgResponseTime: number;
}