import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

export const { width: SIZE} = Dimensions.get('window')

export const data = [
  {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
  {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
  {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
  {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
  {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
  {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
  {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
];

function RoutineExercise({route}) {
  const [customSelected, setCustomSelected] = useState(false);
  const [customSets, setCustomSets] = useState([[0, 0]])

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
