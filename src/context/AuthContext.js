import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { clearUserData, clearCurrentUser } from '../storage/storage';

// Configure Google Sign-In
// IMPORTANT: The webClientId must match the OAuth 2.0 Web Client ID from your Firebase project.
// To get it: Firebase Console > Authentication > Sign-in method > Google > Web SDK configuration > Web client ID
// Also ensure SHA-1 fingerprint is added to Firebase project for Android.
try {
  GoogleSignin.configure({
    webClientId: '12535374011-vqne20535365747l4ja6m4nrlg7trkva.apps.googleusercontent.com',
    
  });
} catch (e) {
  console.warn('Google Sign-In configure failed:', e.message);
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const signOutCallbacksRef = useRef([]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Register a callback to be called on sign out
  const registerSignOutCallback = useCallback((callback) => {
    signOutCallbacksRef.current.push(callback);
    return () => {
      signOutCallbacksRef.current = signOutCallbacksRef.current.filter(cb => cb !== callback);
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthError(null);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult?.data?.idToken;
      if (!idToken) {
        throw new Error('No se pudo obtener el token de Google');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.warn('Google sign-in error:', error);
      setAuthError(error.message || 'Error al iniciar sesión con Google');
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email, password, isRegistering = false) => {
    try {
      setAuthError(null);
      if (isRegistering) {
        await auth().createUserWithEmailAndPassword(email, password);
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.warn('Email auth error:', error);
      let message = 'Error al iniciar sesión';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        message = isRegistering
          ? 'Error al crear la cuenta'
          : 'Email o contraseña incorrectos';
      }
      if (error.code === 'auth/wrong-password') message = 'Contraseña incorrecta';
      if (error.code === 'auth/invalid-email') message = 'Email inválido';
      if (error.code === 'auth/weak-password') message = 'La contraseña debe tener al menos 6 caracteres';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Este email ya tiene cuenta. Si usaste Google para registrarte, inicia sesión con Google.';
      }
      setAuthError(message);
      throw error;
    }
  }, []);

  const signInAnonymously = useCallback(async () => {
    try {
      setAuthError(null);
      await auth().signInAnonymously();
    } catch (error) {
      console.warn('Anonymous sign-in error:', error);
      setAuthError('Error al continuar sin cuenta');
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    try {
      setAuthError(null);
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.warn('Password reset error:', error);
      let message = 'Error al enviar el correo de recuperación';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        message = 'No existe una cuenta con este email';
      }
      if (error.code === 'auth/invalid-email') message = 'Email inválido';
      setAuthError(message);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setAuthError(null);
      // Sign out from Google if that was the provider
      const currentUser = auth().currentUser;
      if (currentUser) {
        const isGoogle = currentUser.providerData.some(p => p.providerId === 'google.com');
        if (isGoogle) {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (e) {
            // Ignore Google sign-out errors
          }
        }
      }
      // Clear local user data and marker before signing out
      await clearUserData();
      await clearCurrentUser();
      // Notify all registered callbacks
      signOutCallbacksRef.current.forEach(cb => cb());
      await auth().signOut();
    } catch (error) {
      console.warn('Sign-out error:', error);
      setAuthError('Error al cerrar sesión');
    }
  }, []);

  const value = {
    user,
    authLoading,
    authError,
    isAuthenticated: !!user && !user.isAnonymous,
    isAnonymous: user?.isAnonymous || false,
    signInWithGoogle,
    signInWithEmail,
    signInAnonymously,
    signOut,
    resetPassword,
    registerSignOutCallback,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
