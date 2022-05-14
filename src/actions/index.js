import { async } from '@firebase/util';
import { signInWithPopup, signOut } from 'firebase/auth';
import {} from 'react-router-dom';
import { auth, provider } from '../firebase';
import { SET_USER } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
})

export function signInAPI(navigate) {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user))
        console.log(payload);
        navigate('/home');
      })
      .catch((error) => alert(error.message));
  };
}

export function LogOutAPI(navigate) {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
}


export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if(user) {
        dispatch(setUser(user));
      }
    })
  }
}

export function signOutAPI() {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch(setUser(null))
    }).catch((error) => {
      console.log(error.message)
    })
  }
}