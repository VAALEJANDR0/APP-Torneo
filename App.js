import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navbar from './src/components/Navbar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navbar />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

