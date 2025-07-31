import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Heart, MessageCircle, Phone, CircleAlert as AlertCircle, ChevronRight, Stethoscope } from 'lucide-react-native';

export default function PatientDashboard() {
  const patientData = {
    name: 'Ahmed Hassan',
    bloodType: 'O+',
    nextTransfusion: '2024-02-10',
    doctor: {
      name: 'Dr. Sarah Mitchell',
      specialty: 'Hematologist',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    emergencyContact: {
      name: 'Fatima Hassan',
      relation: 'Mother',
      phone: '+1 (555) 123-4567',
    },
  };

  const upcomingAppointments = [
    { date: '2024-02-10', time: '10:00 AM', type: 'Blood Transfusion' },
    { date: '2024-02-15', time: '2:30 PM', type: 'Check-up' },
    { date: '2024-02-22', time: '11:00 AM', type: 'Lab Tests' },
  ];

  const healthTips = [
    {
      title: 'Stay Hydrated',
      description: 'Drink plenty of water before and after transfusions',
      icon: '💧',
    },
    {
      title: 'Iron-Rich Foods',
      description: 'Include spinach, lentils, and lean meats in your diet',
      icon: '🥬',
    },
    {
      title: 'Rest Well',
      description: 'Get 7-8 hours of sleep to help your body recover',
      icon: '😴',
    },
    {
      title: 'Monitor Symptoms',
      description: 'Track fatigue levels and report any concerns',
      icon: '📊',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{patientData.name}</Text>
        </View>
        <View style={styles.bloodTypeCard}>
          <Text style={styles.bloodTypeLabel}>Blood Type</Text>
          <Text style={styles.bloodType}>{patientData.bloodType}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.emergencyButton}>
          <AlertCircle size={24} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>Request Blood</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Phone size={20} color="#DC2626" />
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Next Transfusion */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Calendar size={20} color="#DC2626" />
          <Text style={styles.cardTitle}>Next Transfusion</Text>
        </View>
        <Text style={styles.transfusionDate}>February 10, 2024</Text>
        <Text style={styles.transfusionTime}>10:00 AM at Downtown Medical Center</Text>
        <View style={styles.reminderSection}>
          <Text style={styles.reminderText}>⏰ Reminder set for 1 hour before</Text>
        </View>
      </View>

      {/* Doctor Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Stethoscope size={20} color="#DC2626" />
          <Text style={styles.cardTitle}>Your Doctor</Text>
        </View>
        
        <View style={styles.doctorCard}>
          <Image source={{ uri: patientData.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{patientData.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{patientData.doctor.specialty}</Text>
            <Text style={styles.doctorStatus}>Available for consultation</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <MessageCircle size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Appointments</Text>
        {upcomingAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <View style={styles.appointmentDate}>
              <Text style={styles.appointmentDateText}>
                {new Date(appointment.date).getDate()}
              </Text>
              <Text style={styles.appointmentMonth}>
                {new Date(appointment.date).toLocaleDateString('en', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
        ))}
      </View>

      {/* Health Tips Carousel */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Health Tips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsContainer}>
          {healthTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Emergency Contact */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency Contact</Text>
        <View style={styles.contactCard}>
          <View style={styles.contactAvatar}>
            <Text style={styles.contactInitials}>FH</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{patientData.emergencyContact.name}</Text>
            <Text style={styles.contactRelation}>{patientData.emergencyContact.relation}</Text>
            <Text style={styles.contactPhone}>{patientData.emergencyContact.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
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
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  emergencyButton: {
    flex: 2,
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#DC2626',
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
  transfusionDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  transfusionTime: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  reminderSection: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#4B5563',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  doctorStatus: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 4,
  },
  chatButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  appointmentDate: {
    width: 50,
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  appointmentMonth: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  tipsContainer: {
    marginTop: 12,
  },
  tipCard: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 180,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactRelation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
});