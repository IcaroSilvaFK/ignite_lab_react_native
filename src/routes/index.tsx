import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';
import { SignIn } from '../screens/SignIn';
import { Routes } from './app.routes';

export function RoutesApplication() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscirber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });

    return subscirber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>{user ? <Routes /> : <SignIn />}</NavigationContainer>
  );
}
