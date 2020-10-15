import React from 'react';
import { useFonts } from 'expo-font';
import Routes from './src/routes';



export default function App() {
  const [fontsLoaded] = useFonts({
    nunito600: require('./assets/fonts/Nunito-SemiBold.ttf'),
    nunito700: require('./assets/fonts/Nunito-Bold.ttf'),
    nunito800: require('./assets/fonts/Nunito-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Routes />
  );
}