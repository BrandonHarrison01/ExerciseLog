// ./gradlew clean

import 'react-native-gesture-handler'
import React from 'react';
  import {
    StyleSheet,
    View,
    Text,
  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './components/auth/Login'
import RoutineFeed from './components/RoutineFeed'
import Routine from './components/Routine';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login'
          component={Login}
        />
        <Stack.Screen 
          name='RoutineFeed'
          component={RoutineFeed}
        />
        <Stack.Screen 
          name='Routine'
          component={Routine}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
