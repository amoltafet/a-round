
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Registered
          const user = userCredential.user;
          updateProfile(user, {
              displayName: name,
              //photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
          })
          .then(() => {
              alert('Registered, please login.');
              // add user to firestore
              const db = getFirestore();
              const userRef = doc(db, 'users', user.uid);
              setDoc(userRef, {
                  id: user.uid,
                  name: name,
                  username: username,
                  email: email,
                  avatar: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                  bio: '',
                  followers: [],
                  following: [],
                  posts: [],
                  saved: [],
              })
              .then(() => {
                  console.log('Document successfully written!');
              })
              .catch((error) => {
                  console.error('Error writing document: ', error);
              });

              router.push('/nerby');
          })
          .catch((error) => {
              alert(error.message);
          })
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
  }

  const handleRegister = () => {
    // handle registration logic here
    register();
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Already have an account?</Text>
        <TouchableOpacity style={{
          backgroundColor: '#1c8adb',
          width: '80%',
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }} onPress={ e => { e.preventDefault(); router.push('/login'); } }>
          <Text style={styles.buttonText}>Login</Text>  
        </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#1c8adb',
    width: '80%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
