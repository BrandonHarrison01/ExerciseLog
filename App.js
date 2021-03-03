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

import RegisterEmail from './components/auth/RegisterEmail'
import LoginEmail from './components/auth/LoginEmail'
import RoutineFeed from './components/RoutineFeed'
import Routine from './components/Routine';
import NewRoutine from './components/NewRoutine';
import EditRoutine from './components/EditRoutine';
import ExerciseList from './components/ExerciseList';
import RoutineExercise from './components/RoutineExercise';
import AddExercise from './components/AddExercise';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='RegisterEmail'
          component={RegisterEmail}
        />
        <Stack.Screen 
          name='LoginEmail'
          component={LoginEmail}
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
        <Stack.Screen 
          name='AddExercise'
          component={AddExercise}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
