// Firebase
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, setDoc, getDoc, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// Types
import type { Auth, User } from 'firebase/auth';
import type { Firestore, DocumentReference, DocumentData, DocumentSnapshot } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth: Auth = getAuth();
export const db: Firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const handleUserProfile = async ({ userAuth }: Record<'userAuth', User | null>): Promise<DocumentReference | null> => {
  if (userAuth) {
    const { uid, displayName, email } = userAuth;
    const timeStamp = new Date();
    const userRoles = ['user'];
    const userRef: DocumentReference<DocumentData> = doc(db, 'users', uid);
    const userData: DocumentSnapshot<DocumentData> = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          email,
          displayName,
          createdDate: timeStamp,
          userRoles,
        });
      } catch (err) {
        console.error(err);
      }
    }
    return userRef;
  }
  return null;
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}