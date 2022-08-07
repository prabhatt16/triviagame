/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './src/screens/Home';
import {t} from 'react-native-tailwindcss';

const App = () => {
  return (
    <SafeAreaView
    //  style={[t.flexCol, t.justifyCenter, t.itemsCenter, t.hFull]}
    >
      <HomeScreen />
    </SafeAreaView>
  );
};
export default App;
