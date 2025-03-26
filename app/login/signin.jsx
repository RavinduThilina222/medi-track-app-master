import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setLocalStorage } from '../../service/Storage';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnSignInClick = () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter email & Password', ToastAndroid.BOTTOM);
      Alert.alert('Please fill all fields');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        await setLocalStorage('userDetail', user);
        console.log('User:', user);
        router.replace('/(tabs)');

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-credentials') {
          ToastAndroid.show('Invalid email or password', ToastAndroid.BOTTOM);
          Alert.alert('Invalid email or password');
        } else {
          ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        }
      });
  }

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={styles.textInput}
          onChangeText={(value) => setEmail(value)} />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput placeholder='Password' style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)} />
      </View>
      <TouchableOpacity style={styles.button}
        onPress={OnSignInClick}>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 17
        }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCreate}
        onPress={() => router.navigate('login/signUp')}>
        <Text style={{
          color: Colors.PRIMARY,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 17
        }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.GRAY
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white'
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonCreate: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  }
});