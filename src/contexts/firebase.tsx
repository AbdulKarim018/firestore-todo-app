import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCGtoSc9NjPetoeOlLmfIvkJeUrHnPKC0M",
  authDomain: "fir-auth-fd62a.firebaseapp.com",
  projectId: "fir-auth-fd62a",
  storageBucket: "fir-auth-fd62a.appspot.com",
  messagingSenderId: "58743354643",
  appId: "1:58743354643:web:22e2dda711927c9e0316e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirebaseContext = createContext<{
  firebase: FirebaseApp,
  db: typeof db,
} | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseContext.Provider value={{
      firebase: app,
      db,
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context
}