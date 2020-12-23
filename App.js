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
import NewRoutine from './components/NewRoutine';
import EditRoutine from './components/EditRoutine';
import ExerciseList from './components/ExerciseList';
import RoutineExercise from './components/RoutineExercise';

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
        <Stack.Screen 
          name='ExerciseList'
          component={ExerciseList}
        />
        <Stack.Screen 
          name='NewRoutine'
          component={NewRoutine}
        />
        <Stack.Screen 
          name='EditRoutine'
          component={EditRoutine}
        />
        <Stack.Screen 
          name='RoutineExercise'
          component={RoutineExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
