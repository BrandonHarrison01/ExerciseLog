import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Graph from './Graph';

function RoutineExercise({route}) {
  const [setSelector, setSetSelector] = useState('fixed');
  const [customSets, setCustomSets] = useState([[0, 0]])
  const [selectedExercise, setSelectedExercise] = useState()
  const [selectedSet, setSelectedSet] = useState()

  useEffect(() => {
    const fetchExercise = async () => {
      const getExercise = await firestore()
        .collection('users1')
        .doc('initial')
        .collection('exercises')
        .doc(route.params.document)
        .get();
      const exercise = getExercise.data()
      setSelectedExercise(exercise)
      setSelectedSet(exercise.sets[0])
    }
    fetchExercise()
  }, [])

  return (
    <View>
      {selectedExercise && (
        <View>
          <Text>{selectedExercise.title}</Text>
          <Graph exercise={selectedExercise.stats[selectedSet]} />
          <View style={{ flexDirection: 'row' }} >
            {selectedExercise.sets.map(ex => (
              <TouchableOpacity style={ selectedSet === ex ? styles.selectedTab : styles.tab } onPress={() => setSelectedSet(ex)} >
                <Text>{ex}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity
          style={
            setSelector === 'fixed' ? styles.selectedTab : styles.tab
          }
          onPress={() => setSetSelector('fixed')}>
          <Text>Fixed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            setSelector === 'custom' ? styles.selectedTab : styles.tab
          }
          onPress={() => setSetSelector('custom')}>
          <Text>Custom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            setSelector === 'pyramid' ? styles.selectedTab : styles.tab
          }
          onPress={() => setSetSelector('pyramid')}>
          <Text>Pyramid</Text>
        </TouchableOpacity>
      </View>
      {setSelector === 'fixed' ? (
        <View style={styles.setContainer}>
          <TextInput
            style={styles.border}
            placeholder={route.params.sets.toString()}
          />
          <Text style={styles.border}>X</Text>
          <TextInput
            style={styles.border}
            placeholder={route.params.reps.toString()}
          />
          <Text style={styles.border}>OF</Text>
          <TextInput
            style={styles.border}
            placeholder={route.params.weight.toString()}
          />
          <Text style={styles.border}>LBS</Text>
        </View>
      ) : (
        <View>
            {customSets.map(set => (
                <Text style={styles.border}>{`${set[0]} reps | ${set[1]} lbs`}</Text>
            ))}
            <TouchableOpacity style={styles.border} onPress={() => setCustomSets(sets => [...sets, [4, 20]])}>
                <Text>Add Set</Text>
            </TouchableOpacity>
        </View>
      )}
      <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
        <Text style={{marginLeft: 20}}>NOTES</Text>
      </View>
      <TouchableOpacity style={{ padding: 10, borderColor: 'green', borderWidth: 1, margin: 20 }}>
        <Text>ADD NOTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  border: {
    borderColor: 'blue',
    borderWidth: 1,
    marginTop: 10,
    padding: 5
  },
  tab: {
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  selectedTab: {
    backgroundColor: '#c2c2c2',
    margin: 10,
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1
  }
});

export default RoutineExercise;
