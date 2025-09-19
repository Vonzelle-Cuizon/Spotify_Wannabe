import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register: saves username (password = username)
  const handleRegister = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    try {
      await AsyncStorage.setItem("user_name", username);
      Alert.alert("Success", "User registered!");
    } catch (err) {
      console.error("Failed to save username", err);
    }
  };

  // Login: checks if username & password match
  const handleLogin = async () => {
    try {
      const savedName = await AsyncStorage.getItem("user_name");
      if (savedName && username === savedName && password === savedName) {
        Alert.alert("Login successful!");
        navigation.replace("Home"); // ✅ goes to Home
      } else {
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <LinearGradient colors={["#1914147c", "#191414"]} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://logos-world.net/wp-content/uploads/2020/09/Spotify-Emblem.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Spotify</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#b3b3b3"
          style={[styles.input, styles.inputShadow]}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          style={[styles.input, styles.inputShadow]}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>

      {/* Sign In */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
        <View style={styles.shadowWrapper}>
          <LinearGradient
            colors={["#1c9c49ff", "#1ed760"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>

      <Text style={styles.beConnect}>Be Connect With</Text>

      <View style={styles.iconRow}>
        <View style={styles.fbCircle}>
          <Text style={styles.fbText}>f</Text>
        </View>
        <Image
          source={{
            uri: "https://freelogopng.com/images/all_img/1657955547black-google-icon.png",
          }}
          style={styles.google}
          resizeMode="contain"
        />
      </View>

      {/* Register button */}
      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
        <Text style={{ color: "#716767ff", fontSize: 14 }}>
          Don’t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "green", fontSize: 14, fontWeight: "bold" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: -10,
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  form: {
    width: "80%",
  },
  input: {
    width: 300,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginLeft: -4,
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
  forgotPassword: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#a0a0a0",
    marginTop: -2,
  },
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 25,
    alignSelf: "center",
  },
  button: {
    width: 300,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  beConnect: {
    alignSelf: "center",
    fontSize: 15,
    color: "#1c9c49ff",
    fontWeight: "500",
    marginTop: 15,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  google: {
    width: 40,
    height: 40,
    marginBottom: -10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 0,
    borderBlockColor: "#5b1010ff",
  },
  fbCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
  },
  fbText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -4,
  },
});
