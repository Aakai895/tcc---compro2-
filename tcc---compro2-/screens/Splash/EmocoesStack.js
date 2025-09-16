import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import Emocoes from '../TelasUsuario/Emocoes';
import SplashEmocoes from './EmocoesSplash';

const Stack = createNativeStackNavigator();

let splashShown = false; // controla se já mostramos a splash

export default function EmocoesStack() {
  const [showSplash, setShowSplash] = useState(!splashShown);

  useFocusEffect(
    React.useCallback(() => {
      if (!splashShown) {
        setShowSplash(true);
        splashShown = true;
      }
    }, [])
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showSplash && (
        <Stack.Screen name="SplashEmocoes" component={SplashEmocoes} />
      )}
      <Stack.Screen name="Emocoes" component={Emocoes} />
    </Stack.Navigator>
  );
}
