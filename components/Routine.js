import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';

function Routine({navigation}) {
  const [routineExercises, setRoutineExercises] = useState(null);
  const [allExercises, setAllExercises] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRoutineExercises = async () => {
      const document = await AsyncStorage.getItem('document');
      const getRoutine = await firestore()
        .collection('users1')
        .doc('initial')
        .collection('created-routines')
        .doc(document)
        .get();
      const routineData = getRoutine.data();
      setRoutineExercises(routineData.exercises);

      const exercises = await firestore()
        .collection('users1')
        .doc('initial')
        .collection('exercises')
        .get();

      let arr = [];

      exercises.forEach((doc) => {
        const exercise = doc.data();
        let push = true;

        for (let i = 0; i < routineData.exercises.length; i++) {
          if (routineData.exercises[i].title === exercise.title) {
            push = false;
          }
        }

        if (push) {
          arr.push(exercise);
        }
      });
      setAllExercises(arr);
    };
    fetchRoutineExercises();
  }, []);

  useEffect(() => {
    if (search) {
      let results = [];

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

  const listExercises = (arr) => {
    return arr.map((ex) => (
      <TouchableOpacity key={ex.title} style={styles.exercises}>
        <Text>{ex.title}</Text>
      </TouchableOpacity>
    ));
  };

  const completeExercise = (doc) => {
    routineExercises.map((ex, i) => {
        if(ex.document === doc){
            const selected = routineExercises[i]
            selected.status = 'complete'
            setRoutineExercises([...routineExercises])
        }
    })
  }

  return (
    <View>
      {/* {routine && <Text>{routine.title}</Text>} */}
      <ScrollView>
        {routineExercises &&
          routineExercises.map(
            (exercise) =>
              exercise.status === 'complete' && (
                <TouchableOpacity
                  style={styles.exercises}
                  key={exercise.title}
                  onPress={() =>
                    navigation.navigate('RoutineExercise', exercise)
                  }>
                  <View>
                    <Text>{exercise.title}</Text>
                    <Text>{`Sets: ${exercise.sets} | Reps: ${exercise.reps} | ${exercise.weight} lbs`}</Text>
                  </View>
                  <TouchableOpacity
                    style={{borderWidth: 1, borderColor: 'blue', padding: 5}}>
                    <Text>checked</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ),
          )}
        <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
          <Text style={{marginLeft: 20}}>INCOMPLETE</Text>
        </View>
        {routineExercises &&
          routineExercises.map(
            (exercise) =>
              exercise.status === 'incomplete' && (
                <TouchableOpacity
                  style={styles.exercises}
                  key={exercise.title}
                  onPress={() =>
                    navigation.navigate('RoutineExercise', exercise)
                  }>
                  <View>
                    <Text>{exercise.title}</Text>
                    <Text>{`Sets: ${exercise.sets} | Reps: ${exercise.reps} | ${exercise.weight} lbs`}</Text>
                  </View>
                  <TouchableOpacity
                    style={{borderWidth: 1, borderColor: 'blue', padding: 5}}
                    onPress={() => completeExercise(exercise.document)}>
                    <Text>unchecked</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ),
          )}
        <TouchableOpacity
          style={{margin: 20, padding: 30}}
          onPress={() => navigation.navigate('EditRoutine')}>
          <Text>Edit Routine</Text>
        </TouchableOpacity>
        <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
          <Text style={{marginLeft: 20}}>ALL EXERCISES</Text>
        </View>
        <TextInput
          placeholder="SEARCH..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {searchResults ? (
          listExercises(searchResults)
        ) : allExercises ? (
          listExercises(allExercises)
        ) : (
          <ActivityIndicator size="large" color="gray" />
        )}
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Routine;
