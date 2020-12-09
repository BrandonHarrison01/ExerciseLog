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
          key={element.document}
          style={styles.routine}
          onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
          {element.exercises.map(exercise => (
            <Text id={exercise.id}>{`${exercise.title} ${exercise.sets} X ${exercise.reps} | ${exercise.weight} lbs`}</Text>
          ))}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('ExerciseList')}>
        <Text>SEE EXERCISES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('NewRoutine')}>
        <Text>ADD NEW ROUTINE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  routine: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  navButton: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5
  }
})

export default RoutineFeed;
