import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function NewRoutine() {
  let [selectedExercises, setSelectedExercises] = useState(null);
  let [allExercises, setAllExercises] = useState(null);
  let [searchResults, setSearchResults] = useState(null);
  let [search, setSearch] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await firestore()
        .collection('users1')
        .doc('initial')
        .collection('exercises')
        .get();

      let arr = [];

      exercises.forEach((doc) => {
        arr.push(doc.data());
      });

      setAllExercises(arr);
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    if (search) {
      const results = [];

      allExercises.map((exercise) => {
        if (exercise.title.includes(search)) {
          results.push(exercise);
        }
      });

      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  }, [search]);

  const mappedExercises = (object) => {
    return (
        object.map((exercise) => (
            <View style={styles.exercises} id={exercise.id}>
              <Text>{exercise.title}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
        ))
    )
  }

  return (
    <View>
      <View>
        <Text>TITLE</Text>
        <TextInput placeholder="Routine Name..." />
      </View>
      <TextInput
        placeholder="SEARCH EXISTING EXERCISES"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {
        searchResults ? mappedExercises(searchResults) :
        allExercises ? mappedExercises(allExercises) :
        <ActivityIndicator />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  exercises: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'yellowgreen',
    padding: 5,
    width: 30,
  },
});

export default NewRoutine;
