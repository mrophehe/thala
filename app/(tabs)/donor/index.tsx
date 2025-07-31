import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Bell, Calendar, Users, Award, MapPin, MessageCircle, Heart } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DonorDashboard() {
  const userData = {
    name: 'Sarah Johnson',
    bloodType: 'O+',
    nextDonationDate: '2024-02-15',
    level: 'Gold Donor',
    livesSaved: 42,
    totalDonations: 14,
  };

  const badges = [
    { name: 'First Timer', icon: '🏆', earned: true },
    { name: 'Life Saver', icon: '💝', earned: true },
    { name: 'Hero', icon: '🦸‍♀️', earned: true },
    { name: 'Champion', icon: '👑', earned: false },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#DC2626" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bloodTypeCard}>
          <Text style={styles.bloodTypeLabel}>Blood Type</Text>
          <Text style={styles.bloodType}>{userData.bloodType}</Text>
        </View>
      </View>

      {/* Next Donation */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Calendar size={20} color="#DC2626" />
          <Text style={styles.cardTitle}>Next Eligible Donation</Text>
        </View>
        <Text style={styles.donationDate}>February 15, 2024</Text>
        <Text style={styles.donationSubtext}>28 days from last donation</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/donor/match')}
        >
          <Users size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Find Patients</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Heart size={24} color="#DC2626" />
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Donate Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Award size={24} color="#DC2626" />
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>My Badges</Text>
        </TouchableOpacity>
      </View>

      {/* Gamification Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Impact</Text>
        <View style={styles.impactStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.livesSaved}</Text>
            <Text style={styles.statLabel}>Lives Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.totalDonations}</Text>
            <Text style={styles.statLabel}>Total Donations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Gold</Text>
            <Text style={styles.statLabel}>Current Level</Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Progress to Platinum Level</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%' }]} />
          </View>
          <Text style={styles.progressText}>7/10 donations</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Achievement Badges</Text>
        <View style={styles.badgeGrid}>
          {badges.map((badge, index) => (
            <View key={index} style={[styles.badge, !badge.earned && styles.badgeDisabled]}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, !badge.earned && styles.badgeNameDisabled]}>
                {badge.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Heart size={16} color="#DC2626" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Blood donated successfully</Text>
            <Text style={styles.activityDate}>January 18, 2024</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Award size={16} color="#059669" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Life Saver badge earned</Text>
            <Text style={styles.activityDate}>January 18, 2024</Text>
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bloodTypeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bloodTypeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  bloodType: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  donationDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  donationSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#DC2626',
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressSection: {
    marginTop: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DC2626',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  badge: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    minWidth: 80,
  },
  badgeDisabled: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  badgeNameDisabled: {
    color: '#9CA3AF',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  activityDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});