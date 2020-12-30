import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function RoutineExercise({route}) {
  const [customSelected, setCustomSelected] = useState(false);
  const [customSets, setCustomSets] = useState([[0, 0]])

  const addSet = () => {
      let arr = customSets
      arr.push([6, 225])

      setCustomSets(arr)
  }

  console.log(customSets, 'rerender')

  return (
    <View>
      <Text>{route.params.title}</Text>
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
});

export default RoutineExercise;
