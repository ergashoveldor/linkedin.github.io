// eslint-disable-next-line
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, provider, storage } from '../firebase';
import { db } from '../firebase';
import { SET_USER } from './actionType';

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
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

      console.log('url', url);
      // const upload = storage
      //   .ref(`images/${payload.image.name}`)
      //   .put(payload.image);
      // upload.on(
      //   'state_changed',
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log(`Progress: ${progress}%`);
      //     if (snapshot.state === 'RUNNING') {
      //       console.log(`Progress: ${progress}%`);
      //     }
      //   },
      //   (error) => console.log(error.code),
      //   // eslint-disable-next-line
      //   async () => {
      //     const downloadURL = await upload.snapshot.ref.getDownloadURL();
      //     db.collection('articles').add({
      //       actor: {
      //         description: payload.user.email,
      //         title: payload.user.displayName,
      //         date: payload.timestamp,
      //         image: payload.user.photoURL,
      //       },
      //       video: payload.video,
      //       sharedImg: downloadURL,
      //       comments: 0,
      //       description: payload.description,
      //     });
      //   }
      // );
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

      // db.collection('articles').add({
      //   actor: {
      //     description: payload.user.email,
      //     title: payload.user.displayName,
      //     date: payload.timestamp,
      //     image: payload.user.photoURL,
      //   },
      //   video: payload.video,
      //   sharedImg: '',
      //   comments: 0,
      //   description: payload.description,
      // });
    }
  };
}
