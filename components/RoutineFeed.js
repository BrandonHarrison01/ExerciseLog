import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TextInput,
} from 'react-native';

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
    const weekdays = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };
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

  const list = () => {
    return routines.map((element) => {
      return (
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  console.log(date, 'date');

  return (
    <View>
      {date && (
        <View>
          <Text>{date.day}</Text>
          <Text>{`${date.month} ${date.date}, ${date.year}`}</Text>
        </View>
      )}
      <TextInput placeholder="Search..." />
      {routines && list()}
      <TouchableOpacity style={{margin: 20}} onPress={() => props.navigation.navigate('ExerciseList')}>
        <Text>see exercises</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RoutineFeed;
