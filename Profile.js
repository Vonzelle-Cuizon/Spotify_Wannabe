// Profile.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({ name: "", email: "" });

  // CHANGE: state for profile image
  const [profileImage, setProfileImage] = useState(require("./error.webp"));

  // CHANGE: Refs for shake animation
  const shakeName = useRef(new Animated.Value(0)).current;
  const shakeEmail = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem("user_name");
        const savedEmail = await AsyncStorage.getItem("user_email");

        setName(savedName || "Clarke Steven Cañal");
        setEmail(savedEmail || "23103439@usc.edu.ph");
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    loadProfile();
  }, []);

  const triggerShake = (shakeAnim) => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 3, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -3, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const validateAndSave = async () => {
    let valid = true;
    let newError = { name: "", email: "" };

    if (name.trim().length < 1) {
      newError.name = "Name must be at least 1 character.";
      triggerShake(shakeName);
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newError.email = "Please enter a valid email address.";
      triggerShake(shakeEmail);
      valid = false;
    }

    setError(newError);

    // CHANGE: temporarily change profile pic on error
    if (!valid) {
      setProfileImage(require("./clark.jpeg"));
      setTimeout(() => setProfileImage(require("./error.webp")), 900);
      return;
    }

    // save profile if valid
    try {
      await AsyncStorage.setItem("user_name", name);
      await AsyncStorage.setItem("user_email", email);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={profileImage} style={styles.profileImage} />

      {isEditing ? (
        <>
          {/* CHANGE: wrap input in Animated.View to shake only on error */}
          <Animated.View style={{ transform: [{ translateX: shakeName }], width: 250, left: 25 }}>
            <TextInput
              style={[
                styles.input,
                error.name ? { borderColor: "red", borderWidth: 2 } : {}
              ]}
              value={name}
              onChangeText={text => {
                setName(text);
                setError(prev => ({ ...prev, name: "" }));
              }}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </Animated.View>
          {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

          <Animated.View style={{ transform: [{ translateX: shakeEmail }], width: 250, left: 25 }}>
            <TextInput
              style={[
                styles.input,
                error.email ? { borderColor: "red", borderWidth: 2 } : {}
              ]}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError(prev => ({ ...prev, email: "" }));
              }}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </Animated.View>
          {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}
        </>
      ) : (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </>
      )}

      <TouchableOpacity
        style={styles.editButton}
        onPress={isEditing ? validateAndSave : () => setIsEditing(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? "Save" : "Edit Profile"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('MainPage')}
        activeOpacity={0.8}
      >
        <Text style={styles.editButtonText}>
          To Main Page
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#191414",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#1ed760",
    marginTop: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#b3b3b3",
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: "#1ed760",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#191414",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    width: "80%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});
