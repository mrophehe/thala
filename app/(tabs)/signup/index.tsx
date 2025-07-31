import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Heart, User, Users, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function SignUpScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    location: '',
    phone: '',
  });

  const roles = [
    {
      id: 'donor',
      title: 'Blood Donor',
      description: 'Help save lives by donating blood to Thalassemia patients',
      icon: Heart,
      color: '#DC2626',
      benefits: ['Earn badges and rewards', 'Track your impact', 'Find nearby patients'],
    },
    {
      id: 'patient',
      title: 'Patient',
      description: 'Get connected with blood donors and manage your treatment',
      icon: User,
      color: '#3B82F6',
      benefits: ['Schedule transfusions', 'Connect with doctors', 'Emergency support'],
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Support the community by helping coordinate donations',
      icon: Users,
      color: '#10B981',
      benefits: ['Organize drives', 'Assist patients', 'Build community'],
    },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    // Mock sign up - in real app would create account and navigate to dashboard
    console.log('Sign up:', { role: selectedRole, ...formData });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Join ThalaCare</Text>
        <Text style={styles.subtitle}>Choose your role to get started</Text>
      </View>

      {!selectedRole ? (
        /* Role Selection */
        <>
          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={styles.roleCard}
                onPress={() => handleRoleSelect(role.id)}
              >
                <View style={[styles.roleIcon, { backgroundColor: role.color }]}>
                  <role.icon size={32} color="#FFFFFF" />
                </View>
                
                <View style={styles.roleContent}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                  
                  <View style={styles.benefitsList}>
                    {role.benefits.map((benefit, index) => (
                      <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
                    ))}
                  </View>
                </View>
                
                <ChevronRight size={24} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Why Join ThalaCare?</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>🤖 AI-powered donor matching</Text>
              <Text style={styles.featureItem}>📱 Easy-to-use mobile interface</Text>
              <Text style={styles.featureItem}>🏥 Connect with healthcare providers</Text>
              <Text style={styles.featureItem}>🎯 Track your impact and progress</Text>
              <Text style={styles.featureItem}>🔒 Secure and private platform</Text>
            </View>
          </View>
        </>
      ) : (
        /* Registration Form */
        <View style={styles.formContainer}>
          <View style={styles.selectedRoleHeader}>
            <View style={[styles.selectedRoleIcon, { 
              backgroundColor: roles.find(r => r.id === selectedRole)?.color || '#DC2626' 
            }]}>
              {(() => {
                const role = roles.find(r => r.id === selectedRole);
                const IconComponent = role?.icon || Heart;
                return <IconComponent size={24} color="#FFFFFF" />;
              })()}
            </View>
            <View>
              <Text style={styles.selectedRoleTitle}>
                Signing up as {roles.find(r => r.id === selectedRole)?.title}
              </Text>
              <TouchableOpacity onPress={() => setSelectedRole(null)}>
                <Text style={styles.changeRoleText}>Change role</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Blood Group</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bloodGroupSelector}>
                {bloodGroups.map((group) => (
                  <TouchableOpacity
                    key={group}
                    style={[styles.bloodGroupOption, 
                      formData.bloodGroup === group && styles.selectedBloodGroup
                    ]}
                    onPress={() => handleInputChange('bloodGroup', group)}
                  >
                    <Text style={[styles.bloodGroupText,
                      formData.bloodGroup === group && styles.selectedBloodGroupText
                    ]}>
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(value) => handleInputChange('location', value)}
                placeholder="City, State"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      )}
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
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 8,
  },
  rolesContainer: {
    padding: 16,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitsList: {
    gap: 4,
  },
  benefitItem: {
    fontSize: 12,
    color: '#4B5563',
  },
  infoSection: {
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
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  formContainer: {
    padding: 16,
  },
  selectedRoleHeader: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedRoleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedRoleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  changeRoleText: {
    fontSize: 14,
    color: '#DC2626',
    marginTop: 2,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  bloodGroupSelector: {
    flexDirection: 'row',
  },
  bloodGroupOption: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedBloodGroup: {
    backgroundColor: '#DC2626',
  },
  bloodGroupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedBloodGroupText: {
    color: '#FFFFFF',
  },
  signUpButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
});