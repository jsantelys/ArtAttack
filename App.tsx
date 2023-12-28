/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';


import { DarkTheme } from '@react-navigation/native';

import { MyTheme, MyDarkTheme } from './src/styles/Theme';

import AppRootStack from './src/navigation/AppRootStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3,  // optional, if not provided defaults to 0 ,
  retryDelay: 3000, // in milliseconds, optional, if not provided defaults to 0 ,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

//TODO: Implement themes and colors, fonts and typography correctly with modularized files

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppRootStack theme={isDarkMode ? MyDarkTheme : MyTheme} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;
