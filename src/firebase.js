import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3kg13AM8jcokgewhqDwgUPmOtOTz3APQ',
  authDomain: 'linkedin-clone-2d237.firebaseapp.com',
  projectId: 'linkedin-clone-2d237',
  storageBucket: 'linkedin-clone-2d237.appspot.com',
  messagingSenderId: '350087463394',
  appId: '1:350087463394:web:e994b1e8f16f50997c39bb',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, storage, provider, db };
