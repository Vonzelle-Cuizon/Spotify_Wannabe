import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register({ navigation }) {
  return (
    <LinearGradient colors={['#1914147c', '#191414']} style={styles.container}>
      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#b3b3b3"
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#b3b3b3"
          keyboardType="email-address"
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          style={[styles.input, styles.inputShadow]}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry
          style={[styles.input, styles.inputShadow]}
        />

        {/* Sign Up Button → MainPage */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have account → Login */}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 42,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#222',
    color: '#fff',
  },
  inputShadow: {
    shadowColor: '#7d6e6eff',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 1,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#111',
  },
  button: {
    width: 300,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#1db954',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
