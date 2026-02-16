import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, query, where, getDocs} from 'firebase/firestore';
import {auth, db} from '../firebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  userName: string;
  userUsername: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  searchUsers: (searchQuery: string) => Promise<{id: string; name: string; username: string}[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setHasSeenOnboarding(data.hasSeenOnboarding ?? true);
            setUserName(data.name ?? '');
            setUserUsername(data.username ?? '');
          }
        } catch {
          // If we can't read the doc, assume onboarding is done
        }
      } else {
        setHasSeenOnboarding(true);
        setUserName('');
        setUserUsername('');
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string, username: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', credential.user.uid), {
      email,
      name,
      username: username.toLowerCase(),
      createdAt: serverTimestamp(),
      hasSeenOnboarding: false,
    });
    setUserName(name);
    setUserUsername(username.toLowerCase());
    setHasSeenOnboarding(false);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const completeOnboarding = useCallback(async () => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), {
      hasSeenOnboarding: true,
    });
    setHasSeenOnboarding(true);
  }, [user]);

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    try {
      const usersRef = collection(db, 'users');
      const usernameQuery = query(
        usersRef,
        where('username', '>=', q),
        where('username', '<=', q + '\uf8ff'),
      );
      const snapshot = await getDocs(usernameQuery);
      const results: {id: string; name: string; username: string}[] = [];
      snapshot.forEach(docSnap => {
        if (docSnap.id !== user?.uid) {
          const data = docSnap.data();
          results.push({
            id: docSnap.id,
            name: data.name ?? '',
            username: data.username ?? '',
          });
        }
      });
      return results;
    } catch {
      return [];
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasSeenOnboarding,
        userName,
        userUsername,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
        searchUsers,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
