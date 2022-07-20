import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { theme } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { RoutesApplication } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={theme}>
        <Loading />
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
      <RoutesApplication />
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
    </NativeBaseProvider>
  );
}

//<SignIn />
