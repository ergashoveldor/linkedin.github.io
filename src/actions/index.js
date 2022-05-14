import { signInWithPopup, signOut } from 'firebase/auth';
import {} from 'react-router-dom';
import { auth, provider } from '../firebase';

export function signInAPI(navigate) {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
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
