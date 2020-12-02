import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TextInput,
} from 'react-native';

import { weekdays, months } from '../dates'

import firestore from '@react-native-firebase/firestore';

function RoutineFeed(props) {
  const [routines, setRoutines] = useState(null);
  const [date, setDate] = useState();

  useEffect(() => {
    firestore()
      .collection('users1')
      .doc('initial')
      .collection('created-routines')
      .get()
      .then((querySnapshot) => {
        let r = [];
        querySnapshot.forEach((doc) => {
          r.push(doc.data());
        });
        setRoutines(r);
      });
  }, []);

  useEffect(() => {
    const getDate = {
      day: weekdays[new Date().getDay()],
      month: months[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear(),
    };

    setDate(getDate);
  }, []);

  const selectRoutine = async (routine) => {
    console.log(routine.document, 'routine');
    await AsyncStorage.setItem('document', `${routine.document}`);
    props.navigation.navigate('Routine');
  };

  return (
    <View>
      {date && (
        <View>
          <Text>{date.day}</Text>
          <Text>{`${date.month} ${date.date}, ${date.year}`}</Text>
        </View>
      )}
      <TextInput placeholder="Search..." />
      {routines && routines.map((element) => (
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
          {element.exercises.map(exercise => (
            <Text>{`${exercise.title} ${exercise.sets} of ${exercise.reps} at ${exercise.weight} lbs`}</Text>
          ))}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={{margin: 20}} onPress={() => props.navigation.navigate('ExerciseList')}>
        <Text>see exercises</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RoutineFeed;
