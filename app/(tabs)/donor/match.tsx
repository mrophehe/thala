import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MapPin, Heart, Clock, Info, Send } from 'lucide-react-native';

export default function DonorMatch() {
  const patientProfile = {
    name: 'Ahmed Hassan',
    age: 28,
    bloodType: 'O+',
    location: 'Downtown Medical Center',
    urgency: 'High',
    distance: '2.3 km',
    condition: 'Thalassemia Major',
  };

  const matchedDonors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      bloodType: 'O+',
      distance: '1.2 km',
      lastDonation: '45 days ago',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      matchScore: 98,
    },
    {
      id: 2,
      name: 'Michael Chen',
      bloodType: 'O+',
      distance: '2.8 km',
      lastDonation: '32 days ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      matchScore: 94,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      bloodType: 'O+',
      distance: '3.1 km',
      lastDonation: '28 days ago',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      matchScore: 91,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Patient Profile */}
      <View style={styles.patientCard}>
        <View style={styles.urgencyBadge}>
          <Text style={styles.urgencyText}>{patientProfile.urgency} Priority</Text>
        </View>
        
        <View style={styles.patientHeader}>
          <View style={styles.patientAvatar}>
            <Text style={styles.patientInitials}>AH</Text>
          </View>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{patientProfile.name}</Text>
            <Text style={styles.patientDetails}>Age {patientProfile.age} • {patientProfile.condition}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.locationText}>{patientProfile.location}</Text>
            </View>
          </View>
          <View style={styles.bloodTypeContainer}>
            <Text style={styles.bloodTypeNeeded}>{patientProfile.bloodType}</Text>
            <Text style={styles.neededLabel}>Needed</Text>
          </View>
        </View>
      </View>

      {/* AI Match Explanation */}
      <View style={styles.aiExplanation}>
        <View style={styles.aiHeader}>
          <Info size={20} color="#3B82F6" />
          <Text style={styles.aiTitle}>How this match was predicted</Text>
        </View>
        <Text style={styles.aiDescription}>
          Our AI analyzed location proximity, blood type compatibility, donation history, 
          and availability patterns to find the best donors for this urgent request.
        </Text>
      </View>

      {/* Matched Donors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Matched Donors</Text>
        
        {matchedDonors.map((donor) => (
          <View key={donor.id} style={styles.donorCard}>
            <Image source={{ uri: donor.avatar }} style={styles.donorAvatar} />
            
            <View style={styles.donorInfo}>
              <View style={styles.donorHeader}>
                <Text style={styles.donorName}>{donor.name}</Text>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchScore}>{donor.matchScore}%</Text>
                </View>
              </View>
              
              <View style={styles.donorDetails}>
                <View style={styles.detailItem}>
                  <Heart size={14} color="#DC2626" />
                  <Text style={styles.detailText}>{donor.bloodType}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{donor.distance}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{donor.lastDonation}</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.requestButton} disabled>
              <Send size={16} color="#FFFFFF" />
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Mock Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          🔬 This is a demonstration of AI-powered donor matching. 
          In production, this would connect to real donor databases and send actual requests.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  patientCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  urgencyBadge: {
    backgroundColor: '#FEE2E2',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  urgencyText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  patientInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  patientDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  bloodTypeContainer: {
    alignItems: 'center',
  },
  bloodTypeNeeded: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  neededLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  aiExplanation: {
    backgroundColor: '#EFF6FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  donorCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  donorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  donorInfo: {
    flex: 1,
  },
  donorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  donorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  matchBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchScore: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  donorDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  requestButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    opacity: 0.7,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimer: {
    backgroundColor: '#F3F4F6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
  },
});