// Profile.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require('./clark.jpeg')} // replace with your local image
        style={styles.profileImage}
      />

      {/* Name & Email */}
      <Text style={styles.name}>Clarke Steven Cañal</Text>
      <Text style={styles.email}>23103439@usc.edu.ph</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#1ed760',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#1ed760',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  editButtonText: {
    color: '#191414',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
