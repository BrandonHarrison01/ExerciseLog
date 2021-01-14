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
  const [routineTitle, setRoutineTitle] = useState(null);
  const [routineExercises, setRoutineExercises] = useState(null);
  const [allExercises, setAllExercises] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredExercises, setFilteredExercises] = useState(null)

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
      setRoutineTitle(routineData.title);

      const exercises = await firestore()
        .collection('users1')
        .doc('initial')
        .collection('exercises')
        .get();
      let arr = []
      exercises.forEach(doc => {
        arr.push(doc.data())
      })
      // const exerciseData = exercises.data()
      // console.log(exerciseData, 'ex data')
      // setAllExercises(exerciseData) 

      setAllExercises(arr)
      console.log(arr, 'aarrg')
      filterExercises()
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

  const filterExercises = () => {
    let arr = [];

    // ↓ all exercises are null when component is rendered ↓
    console.log(allExercises, 'all')
    
    if(allExercises){
      allExercises.forEach((exercise) => {
      // const exercise = doc.data();
      // console.log(exercise, 'test')
        let push = true;

        for (let i = 0; i < routineExercises.length; i++) {
          if (routineExercises[i].title === exercise.title) {
            push = false;
          }
        }

        if (push) {
          arr.push(exercise);
        }
      });

    setFilteredExercises(arr);
    }
    // console.log(filteredExercises)
  }

  const completeExercise = (doc) => {
    routineExercises.map((ex, i) => {
      if (ex.document === doc) {
        const selected = routineExercises[i];
        selected.status =
          selected.status === 'complete' ? 'incomplete' : 'complete';
        console.log(selected);
        setRoutineExercises([...routineExercises]);
      }
    });
  };

  const removeExercise = (doc) => {
    let temp = routineExercises;

    routineExercises.forEach((ex, i) => {
      if (ex.document === doc) {
        console.log(i, 'i');
        temp.splice(i, 1);
        console.log(temp, 'temp');
        setRoutineExercises([...temp]);
        filterExercises()
      }
    });
  };
  
  const addExercise = (ex) => {
    let temp = routineExercises;
    temp.push(ex);
    console.log(temp, 'tempp');
    setRoutineExercises([...temp]);
    filterExercises()
  };

  const listExercises = (arr) => {
    return arr.map((ex) => (
      <TouchableOpacity key={ex.title} style={styles.exercises}>
        <Text>{ex.title}</Text>
        <TouchableOpacity
          style={{padding: 10, borderColor: 'green', borderWidth: 1}}
          onPress={() => addExercise(ex)}>
          <Text>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      {routineTitle && <Text>{routineTitle}</Text>}
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
                    onPress={() => completeExercise(exercise.document)}
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
                    style={{borderWidth: 1, borderColor: 'red', padding: 5}}
                    onPress={() => removeExercise(exercise.document)}>
                    <Text>-</Text>
                  </TouchableOpacity>
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
        ) : filteredExercises ? (
          listExercises(filteredExercises)
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
