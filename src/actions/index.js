// eslint-disable-next-line
import { signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, provider, storage } from '../firebase';
import { db } from '../firebase';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType';

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export function signInAPI(navigate) {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
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
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    console.log(payload);
    if (payload.image !== '') {
      let url = '';
      const file = payload?.image;

      const storageRef = ref(
        storage,
        `postImages/${payload?.user?.uid}/${Date.now()}`
      );

      const urlPic = await uploadBytes(storageRef, file);
      url = await getDownloadURL(ref(storage, urlPic?.ref?.fullPath));

      await setDoc(doc(db, 'posts', `${payload?.user?.uid + Date.now()}`), {
        actor: {
          description: payload?.user?.email,
          title: payload?.user?.displayName,
          date: payload?.timestamp,
          image: payload?.user?.photoURL,
        },
        video: payload?.video,
        sharedImg: url,
        comments: 0,
        description: payload?.description,
        createdAt: Timestamp.fromDate(new Date()),
      });
      dispatch(setLoading(false));
      console.log('url', url);
    } else if (payload.video) {
      await setDoc(doc(db, 'posts', `${payload?.user?.uid + Date.now()}`), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: '',
        comments: 0,
        description: payload.description,
        createdAt: Timestamp.fromDate(new Date()),
      });
      dispatch(setLoading(false));
      window.location.reload(false);
    }
  };
}

export function getArticlesAPI(setState) {
  return async (dispatch) => {
    let payload = [];
    const q = query(collection(db, 'posts'), orderBy('actor.date', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot?.forEach((doc) => {
      payload.unshift(doc?.data());
      dispatch(getArticles(payload));
      setState(payload);
    });
  };
}
