import { auth } from "../../firebase";
import { router } from 'expo-router';
import { AuthStateChanged } from "../reducers/authSlice";
import { signInWithEmailAndPassword } from 'firebase/auth';

export const handleAuthStateChanged = () => async (dispatch) => {
  try {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(AuthStateChanged(user));
      }
    });
    } catch (error) {
      console.log(error);
    }
};

export const handleSignOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    router.push('/login');
  } catch (error) {
    console.log(error);
  }
}

export const handleSignIn = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(AuthStateChanged(userCredential.user));
    router.push('/profile');
  } catch (error) {
    console.log(error);
  }
}

export const handleSignUp = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,email, password);
    // Dispatch an action here if needed, e.g.:
    // dispatch(AuthStateChanged(userCredential.user));
  } catch (error) {
    console.log(error);
  }
}
