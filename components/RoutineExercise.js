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
  const [customSelected, setCustomSelected] = useState(false);
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
          <View>
            {selectedExercise.sets.map(ex => (
              <TouchableOpacity style={ selectedSet === ex ? styles.selectedSet : styles.set } onPress={() => setSelectedSet(ex)} >
                <Text>{ex}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <TouchableOpacity
        style={
          !customSelected ? styles.customButton : styles.customButtonSelected
        }
        onPress={() => setCustomSelected(!customSelected)}>
        <Text>Custom</Text>
      </TouchableOpacity>
      {!customSelected ? (
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
  customButton: {
    padding: 10,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
  },
  customButtonSelected: {
    padding: 10,
    borderColor: 'red',
    backgroundColor: '#fa9189',
    borderWidth: 1,
    alignItems: 'center',
  },
  set: {
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  selectedSet: {
    margin: 10,
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1
  }
});

export default RoutineExercise;
