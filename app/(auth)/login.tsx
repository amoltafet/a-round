
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Socials from './components/Socials';
import { CheckBox } from 'react-native-elements';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { handleSignIn } from '../../context/actions/authAction';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleLogin = () => {
    dispatch(handleSignIn(email, password));
  };

  return (
    <LinearGradient 
    colors={['#1c8adb', 'white']}
    style={styles.container}
    >
      <Link href={{ pathname: "/", params: { lastSlide: "true" } }} asChild >
        <Ionicons name="arrow-back" size={24} color="white"  style={{
          alignSelf: "flex-start",
          marginLeft: 10,
          marginTop: 10,
        }}/>
      </Link>
      <Text style={styles.title}>Login</Text>
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
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
        {
          checked ? 
          <Pressable onPress={() => setChecked(!checked)}>
           <Ionicons name="checkmark-circle" size={24} color="green" />
          </Pressable>
          :
          <Pressable onPress={() => setChecked(!checked)}>
          <Ionicons name="ellipse-outline" size={24} color="grey" />
          </Pressable>
        }
      
        <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 5}}>Remember me</Text>
      <Pressable onPress={ e => { e.preventDefault(); router.push('/forgot-password'); } }
        style={{ marginBottom:15, marginLeft: "auto"}}
      >
      <Text style={{ color: "grey", fontSize: 12, fontWeight: "500"}}>Forgot Password?</Text>
      </Pressable>
    </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Socials />

      <Text style={{
        fontSize: 12,
        fontWeight: '500',
        marginTop: 16,
        color: 'grey',
      }}>Don't have an account?</Text>
      <TouchableOpacity style={{
        borderColor: '#1c8adb',
        borderWidth: 1,
        width: '80%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 16,
      }} onPress={ e => { e.preventDefault(); router.push('/register'); } }>
        <Text style={{
          color: '#1c8adb',
          fontSize: 16,
        }}>Register</Text>  
      </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 16, alignItems: "center", justifyContent: "center", 
        flexWrap: "wrap", width: "100%"
       }}>
      <Text style={{
        fontSize: 10,
        fontWeight: '500',
        marginTop: 16,
        color: 'grey',
      }}>By using an account, you agree to our </Text>
      <TouchableOpacity onPress={ e => { e.preventDefault(); router.push('/terms'); } }>
        <Text style={{
          color: '#1c8adb',
          fontSize: 10,
          fontWeight: "600",
        }}>Terms of Service</Text>
      </TouchableOpacity>
      <Text style={{
        fontSize: 10,
        fontWeight: '500',
        marginTop: 16,
        color: 'grey',
      }}> and </Text>
      <TouchableOpacity onPress={ e => { e.preventDefault(); router.push('/privacy'); } }>
        <Text style={{
          color: '#1c8adb',
          fontSize: 10,
          fontWeight: "600",
        }}>Privacy Policy</Text>
      </TouchableOpacity>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 32,
    color: "white"
  },
  input: {
    width: '100%',
    height: 48,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#1c8adb',
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'white',
    width: '80%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: '#1c8adb',
    fontSize: 16,
    fontWeight: '600',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 10,    
  }
});

export default Login;
