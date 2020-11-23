import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function RoutineFeed() {
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

  const mapRoutines = () => {
    return(
        routines.map(routine => {
            <TouchableOpacity>
                <Text>test</Text>
            </TouchableOpacity>
        })
    )
  }

  return (
    <View>
        {
            routines ? mapRoutines() : <Text>Waiting...</Text>
        }
    </View>
  );
}

export default RoutineFeed;
