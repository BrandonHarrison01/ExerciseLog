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
            <Text style={styles.border} >Custom Set</Text>
            <TouchableOpacity style={styles.border} >
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
