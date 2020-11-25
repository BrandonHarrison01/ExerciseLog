import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function ExerciseList() {
  const [exercises, setExercises] = useState(null)

  useEffect(() => {
    firestore()
      .collection('users1')
      .doc('initial')
      .collection('exercises')
      .get()
      .then((querySnapshot) => {
        let r = [];
        querySnapshot.forEach((doc) => {
          r.push(doc.data());
        });
        setExercises(r);
      });
  }, []);

  const list = () => {
    return exercises.map((element) => {
      return (
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
        <Text>exercises ↓</Text>
      {exercises && list()}
    </View>
  );
}

export default ExerciseList;
