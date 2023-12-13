import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Button, Icon, IconButton } from 'react-native-paper';
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { handleSignIn } from '../../../context/actions/authAction';

const Socials = () => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    signInWithEmailAndPassword(auth, "test@gmail.com", "Learn4good")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push('/profile');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  };

  const handleAppleSignIn =  () => {
    
    dispatch(handleSignIn("test2@gmail.com", "Learn4good"));
    
  };

  const handleLinkedInSignIn = () => {
    Alert.alert('Error', 'Failed to sign in with LinkedIn');
    
  };

  const handleSnapchatSignIn = () => {
    Alert.alert('Error', 'Failed to sign in with Snapchat');
    
  }


  return (
    <View style={styles.container}>
        <IconButton icon="google" mode="contained" onPress={handleGoogleSignIn} style={styles.iconButton}/>
        <IconButton icon="apple" mode="contained" onPress={handleAppleSignIn} style={styles.iconButton}/>
        <IconButton icon="linkedin" mode="contained" onPress={handleLinkedInSignIn} style={styles.iconButton}/>
        <IconButton icon="snapchat" mode="contained"onPress={handleSnapchatSignIn}  style={styles.iconButton}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    iconButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 16,
        padding: 0,
        backgroundColor: '#fff',
    },
});

export default Socials;
