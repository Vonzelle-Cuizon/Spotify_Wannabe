import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.trim().length < 1) {
      Alert.alert("Error", "Username must have at least 1 character.");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // ✅ If all checks pass, navigate to Home
    navigation.replace("Home");
  };

  return (
    <LinearGradient colors={['#1914147c', '#191414']} style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#b3b3b3"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#b3b3b3"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, styles.inputShadow]}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
          <Text style={{ color: '#716767ff', fontSize: 14 }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold' }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#222",
    color: "#fff",
  },
  inputShadow: {
    shadowColor: "#7d6e6eff",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#111",
  },
  button: {
    width: 300,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#1db954",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
