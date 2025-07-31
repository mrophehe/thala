import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Mic } from 'lucide-react-native';
import { useState } from 'react';

export default function ChatInterface() {
  const [message, setMessage] = useState('');

  const chatHistory = [
    {
      id: 1,
      sender: 'doctor',
      name: 'Dr. Sarah Mitchell',
      message: 'Hello! Thank you for being available for donation. The patient Ahmed Hassan needs O+ blood urgently.',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'donor',
      message: 'Hi Dr. Mitchell! I\'m happy to help. When do you need me to come in?',
      timestamp: '10:32 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'doctor',
      name: 'Dr. Sarah Mitchell',
      message: 'We would prefer if you could come in today before 3 PM. Are you available?',
      timestamp: '10:33 AM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'donor',
      message: 'Yes, I can be there by 2 PM. Should I bring any specific documents?',
      timestamp: '10:35 AM',
      isOwn: true,
    },
    {
      id: 5,
      sender: 'doctor',
      name: 'Dr. Sarah Mitchell',
      message: 'Perfect! Please bring your ID and donor card. We\'ll have all the paperwork ready. Thank you so much for your quick response! 🙏',
      timestamp: '10:37 AM',
      isOwn: false,
    },
    {
      id: 6,
      sender: 'donor',
      message: 'You\'re welcome! See you at 2 PM. Is there parking available at the medical center?',
      timestamp: '10:40 AM',
      isOwn: true,
    },
    {
      id: 7,
      sender: 'doctor',
      name: 'Dr. Sarah Mitchell',
      message: 'Yes, there\'s visitor parking on the ground floor. Just tell security you\'re here for blood donation.',
      timestamp: '10:42 AM',
      isOwn: false,
    },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorInitials}>SM</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. Sarah Mitchell</Text>
          <Text style={styles.doctorStatus}>Hematologist • Online</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {chatHistory.map((chat) => (
          <View key={chat.id} style={[
            styles.messageRow,
            chat.isOwn ? styles.ownMessageRow : styles.otherMessageRow
          ]}>
            {!chat.isOwn && (
              <View style={styles.messageAvatar}>
                <Text style={styles.messageAvatarText}>SM</Text>
              </View>
            )}
            
            <View style={[
              styles.messageBubble,
              chat.isOwn ? styles.ownMessage : styles.otherMessage
            ]}>
              {!chat.isOwn && (
                <Text style={styles.senderName}>{chat.name}</Text>
              )}
              <Text style={[
                styles.messageText,
                chat.isOwn ? styles.ownMessageText : styles.otherMessageText
              ]}>
                {chat.message}
              </Text>
              <Text style={[
                styles.timestamp,
                chat.isOwn ? styles.ownTimestamp : styles.otherTimestamp
              ]}>
                {chat.timestamp}
              </Text>
            </View>
            
            {chat.isOwn && (
              <View style={styles.messageAvatar}>
                <Text style={styles.messageAvatarText}>SJ</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline
          />
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatHeader: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  doctorStatus: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  ownMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  ownMessage: {
    backgroundColor: '#DC2626',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#9CA3AF',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    maxHeight: 100,
    paddingVertical: 8,
  },
  voiceButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#DC2626',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});