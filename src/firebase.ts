import {initializeApp} from 'firebase/app';
import {getAnalytics, isSupported} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyACvNxKM1cYz15QdepYLddiA1F0VBkOd6A',
  authDomain: 'olive-447fa.firebaseapp.com',
  projectId: 'olive-447fa',
  storageBucket: 'olive-447fa.firebasestorage.app',
  messagingSenderId: '485878457604',
  appId: '1:485878457604:web:cc8a284f6028353c851c51',
  measurementId: 'G-5E52SQ6Q4Y',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics is only supported in browser environments
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};
