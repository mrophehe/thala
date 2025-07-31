import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Users, Activity, TrendingUp, MapPin, Award, Calendar } from 'lucide-react-native';

export default function AdminDashboard() {
  const stats = {
    totalDonors: 2847,
    totalPatients: 1293,
    requestsThisMonth: 284,
    successfulMatches: 267,
    activeVolunteers: 156,
  };

  const topContributors = [
    {
      name: 'Sarah Johnson',
      donations: 18,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Platinum',
    },
    {
      name: 'Michael Chen',
      donations: 15,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Gold',
    },
    {
      name: 'Emma Wilson',
      donations: 12,
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Gold',
    },
  ];

  const recentRequests = [
    { id: 1, patient: 'Ahmed Hassan', bloodType: 'O+', urgency: 'High', status: 'Matched' },
    { id: 2, patient: 'Maria Garcia', bloodType: 'A-', urgency: 'Medium', status: 'Pending' },
    { id: 3, patient: 'John Smith', bloodType: 'B+', urgency: 'Low', status: 'Fulfilled' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ThalaCare Admin</Text>
          <Text style={styles.subtitle}>Platform Overview</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Activity size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.primaryStatCard]}>
            <Users size={24} color="#FFFFFF" />
            <Text style={styles.statNumber}>{stats.totalDonors.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Registered Donors</Text>
          </View>
          
          <View style={[styles.statCard, styles.secondaryStatCard]}>
            <Users size={24} color="#DC2626" />
            <Text style={[styles.statNumber, styles.secondaryStatNumber]}>{stats.totalPatients.toLocaleString()}</Text>
            <Text style={[styles.statLabel, styles.secondaryStatLabel]}>Patients</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Calendar size={20} color="#6B7280" />
            <Text style={styles.statNumberSmall}>{stats.requestsThisMonth}</Text>
            <Text style={styles.statLabelSmall}>Requests This Month</Text>
          </View>
          
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.statNumberSmall}>{stats.successfulMatches}</Text>
            <Text style={styles.statLabelSmall}>Successful Matches</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award size={20} color="#F59E0B" />
            <Text style={styles.statNumberSmall}>{stats.activeVolunteers}</Text>
            <Text style={styles.statLabelSmall}>Active Volunteers</Text>
          </View>
        </View>
      </View>

      {/* Donor Heatmap */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Donor Distribution Heatmap</Text>
        <View style={styles.heatmapContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2' }}
            style={styles.heatmapImage}
          />
          <View style={styles.heatmapOverlay}>
            <MapPin size={20} color="#FFFFFF" />
            <Text style={styles.heatmapText}>Interactive map showing donor concentration across regions</Text>
          </View>
        </View>
      </View>

      {/* Recent Requests */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Blood Requests</Text>
        {recentRequests.map((request) => (
          <View key={request.id} style={styles.requestItem}>
            <View style={styles.requestInfo}>
              <Text style={styles.patientName}>{request.patient}</Text>
              <Text style={styles.bloodTypeText}>Blood Type: {request.bloodType}</Text>
            </View>
            <View style={styles.requestStatus}>
              <View style={[styles.urgencyBadge, 
                request.urgency === 'High' ? styles.highUrgency : 
                request.urgency === 'Medium' ? styles.mediumUrgency : styles.lowUrgency
              ]}>
                <Text style={styles.urgencyText}>{request.urgency}</Text>
              </View>
              <View style={[styles.statusBadge,
                request.status === 'Matched' ? styles.matchedStatus :
                request.status === 'Fulfilled' ? styles.fulfilledStatus : styles.pendingStatus
              ]}>
                <Text style={styles.statusText}>{request.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Top Contributors */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Contributors This Month</Text>
        {topContributors.map((contributor, index) => (
          <View key={index} style={styles.contributorItem}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <Image source={{ uri: contributor.avatar }} style={styles.contributorAvatar} />
            <View style={styles.contributorInfo}>
              <Text style={styles.contributorName}>{contributor.name}</Text>
              <Text style={styles.contributorLevel}>{contributor.level} Donor</Text>
            </View>
            <View style={styles.donationCount}>
              <Text style={styles.donationNumber}>{contributor.donations}</Text>
              <Text style={styles.donationLabel}>donations</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Performance Metrics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Platform Performance</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>94%</Text>
            <Text style={styles.metricLabel}>Match Success Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>2.3 hrs</Text>
            <Text style={styles.metricLabel}>Avg Response Time</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>98%</Text>
            <Text style={styles.metricLabel}>User Satisfaction</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>156</Text>
            <Text style={styles.metricLabel}>Lives Saved</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#DC2626',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryStatCard: {
    flex: 2,
    backgroundColor: '#DC2626',
  },
  secondaryStatCard: {
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  secondaryStatNumber: {
    color: '#DC2626',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    textAlign: 'center',
  },
  secondaryStatLabel: {
    color: '#6B7280',
  },
  statNumberSmall: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabelSmall: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  heatmapContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  heatmapImage: {
    width: '100%',
    height: 200,
  },
  heatmapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heatmapText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  requestInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  bloodTypeText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  requestStatus: {
    alignItems: 'flex-end',
    gap: 4,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highUrgency: {
    backgroundColor: '#FEE2E2',
  },
  mediumUrgency: {
    backgroundColor: '#FEF3C7',
  },
  lowUrgency: {
    backgroundColor: '#DCFCE7',
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchedStatus: {
    backgroundColor: '#DBEAFE',
  },
  fulfilledStatus: {
    backgroundColor: '#DCFCE7',
  },
  pendingStatus: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  contributorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contributorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  contributorInfo: {
    flex: 1,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contributorLevel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  donationCount: {
    alignItems: 'center',
  },
  donationNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  donationLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
});