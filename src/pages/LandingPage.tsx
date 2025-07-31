import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Activity, Shield, ArrowRight, Star, Award, Clock } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const LandingPage = () => {
  const features = [
    {
      icon: Heart,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI connects compatible donors with patients in real-time for optimal outcomes.'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Join thousands of blood warriors, donors, and patients in our life-saving community.'
    },
    {
      icon: Activity,
      title: 'Real-Time Tracking',
      description: 'Monitor transfusion schedules, donation history, and health metrics in one place.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security and privacy controls.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Thalassemia Patient',
      content: 'ThalaCare helped me find compatible donors quickly. The platform is a lifesaver!',
      rating: 5
    },
    {
      name: 'Dr. Johnson',
      role: 'Blood Warrior',
      content: 'Managing my patients is so much easier with ThalaCare\'s comprehensive dashboard.',
      rating: 5
    },
    {
      name: 'Mike R.',
      role: 'Regular Donor',
      content: 'Love the gamification! I\'ve earned 3 badges and helped save 12 lives so far.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Lives Saved' },
    { number: '5,000+', label: 'Active Donors' },
    { number: '98.5%', label: 'Success Rate' },
    { number: '2.3 min', label: 'Avg Response Time' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Lifeline for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Thalassemia Support</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with compatible blood donors instantly. Our AI matches patients with the right donors, 
              while Blood Warriors coordinate life-saving transfusions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/register?role=donor">
                <Button size="lg" className="w-full sm:w-auto">
                  <Heart className="mr-2 h-5 w-5" />
                  I'm a Donor
                </Button>
              </Link>
              <Link to="/register?role=patient">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  I'm a Patient
                </Button>
              </Link>
              <Link to="/register?role=warrior">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  I'm a Blood Warrior
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ThalaCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with human compassion to create 
              the most effective blood donation network for thalassemia patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ThalaCare Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to save lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register & Profile</h3>
              <p className="text-gray-600">Create your profile with blood type, location, and availability preferences.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Matching</h3>
              <p className="text-gray-600">Our AI instantly finds the best donor-patient matches based on compatibility.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coordinate & Save</h3>
              <p className="text-gray-600">Blood Warriors coordinate the process while you focus on saving lives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">Real stories from real heroes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of heroes in our mission to ensure no thalassemia patient 
            goes without the blood they need. Every registration saves lives.
          </p>
          
          <Link to="/register">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50 border-white">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;