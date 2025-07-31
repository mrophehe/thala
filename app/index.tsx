import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Heart, Users, Shield, ArrowRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Heart size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>ThalaCare</Text>
        </View>
        
        <Text style={styles.tagline}>AI-Powered Support for Thalassemia Patients</Text>
        <Text style={styles.description}>
          Connecting blood donors with patients through intelligent matching and comprehensive care coordination
        </Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.featureRow}>
          <View style={styles.featureCard}>
            <Heart size={32} color="#DC2626" />
            <Text style={styles.featureTitle}>Smart Matching</Text>
            <Text style={styles.featureText}>AI finds the best donors</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Users size={32} color="#10B981" />
            <Text style={styles.featureTitle}>Community</Text>
            <Text style={styles.featureText}>Connect with supporters</Text>
          </View>
        </View>
        
        <View style={styles.featureRow}>
          <View style={styles.featureCard}>
            <Shield size={32} color="#3B82F6" />
            <Text style={styles.featureTitle}>Secure Care</Text>
            <Text style={styles.featureText}>Protected health data</Text>
          </View>
          
          <View style={styles.featureCard}>
            <ArrowRight size={32} color="#F59E0B" />
            <Text style={styles.featureTitle}>Quick Access</Text>
            <Text style={styles.featureText}>Emergency support 24/7</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)/signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/donor')}
        >
          <Text style={styles.secondaryButtonText}>Explore Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Supporting Thalassemia patients worldwide with technology and compassion
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    backgroundColor: '#DC2626',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    maxWidth: 300,
  },
  features: {
    padding: 20,
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  cta: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#DC2626',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DC2626',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});