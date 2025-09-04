// MainPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191414',
    padding: 20,
  },
  button: {
    width: 200,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#1ed760',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // red for logout
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
