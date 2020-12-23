import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {weekdays, months} from '../dates';

import firestore from '@react-native-firebase/firestore';

function RoutineFeed(props) {
  const [routines, setRoutines] = useState(null);
  const [searchResults, setSearchResults] = useState(null)
  const [search, setSearch] = useState('')
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

  useEffect(() => {
    if(search){
      let results = []
      routines.map(routine => {
        if(routine.title.includes(search)){
          results.push(routine)
        }
      })
      setSearchResults(results)
    } else {
      setSearchResults(null)
    }
  }, [search])

  const selectRoutine = async (routine) => {
    await AsyncStorage.setItem('document', `${routine.document}`);
    props.navigation.navigate('Routine');
  };

  const listRoutines = (arr) => {
    return(
      arr.map((element) => (
        <TouchableOpacity
          key={element.document}
          style={styles.routine}
          onPress={() => selectRoutine(element)}>
          <Text>{element.title}</Text>
          {element.exercises.map((exercise) => (
            <Text
              key={
                exercise.title
              }>{`${exercise.title} ${exercise.sets} X ${exercise.reps} | ${exercise.weight} lbs`}</Text>
          ))}
        </TouchableOpacity>
      ))
    )
  }

  return (
    <View>
      {date && (
        <View>
          <Text>{date.day}</Text>
          <Text>{`${date.month} ${date.date}, ${date.year}`}</Text>
        </View>
      )}
      <TextInput placeholder="Search..." value={search} onChangeText={text => setSearch(text)} />
      {
        searchResults ? listRoutines(searchResults) :
        routines ? listRoutines(routines) : 
        <ActivityIndicator size='large' color='gray' />
      }
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => props.navigation.navigate('ExerciseList')}>
        <Text>SEE EXERCISES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => props.navigation.navigate('NewRoutine')}>
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
    borderRadius: 5,
  },
  navButton: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
  },
});

export default RoutineFeed;
