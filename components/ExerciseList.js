import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

function ExerciseList() {
  const [exercises, setExercises] = useState(null);
  const [searchResults, setSearchResults] = useState(null)
  const [search, setSearch] = useState('')

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

  useEffect(() => {
    if(search){
      let results = []
      exercises.map(exercise => {
        if(exercise.title.includes(search)){
          results.push(exercise)
        }
      })
      setSearchResults(results)
    } else {
      setSearchResults(null)
    }
  }, [search])

  const listExercises = (arr) => {
    return(
      arr.map((element) => (
        <TouchableOpacity
          key={element.title}
          style={{margin: 20}}
          // onPress={() => selectRoutine(element)}
        >
          <Text>{element.title}</Text>
        </TouchableOpacity>
      ))
    )
  }

  return (
    <View>
        <TextInput placeholder="SEARCH..." value={search} onChangeText={text => setSearch(text)} />
        <ScrollView>
        {
          searchResults ? listExercises(searchResults) :
          exercises ? listExercises(exercises) :
          <ActivityIndicator />
        }
        </ScrollView>
    </View>
  );
}

export default ExerciseList;
