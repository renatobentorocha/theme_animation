import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { AppProvider } from './src/model/provider/AppProvider';
import { App } from './src/App';

function Index() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default registerRootComponent(Index);
