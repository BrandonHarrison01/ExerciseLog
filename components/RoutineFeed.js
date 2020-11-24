import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function RoutineFeed(props) {
  const [routines, setRoutines] = useState(null);

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

  const selectRoutine = async (routine) => {
    console.log(routine.document, 'routine')
    await AsyncStorage.setItem('document', `${routine.document}`)
    props.navigation.navigate("Routine")
  }

  const list = () => {
    return routines.map((element) => {
      return (
        <TouchableOpacity style={{ margin: 10 }} onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
      {routines && list()}
    </View>
  );
}

export default RoutineFeed;
