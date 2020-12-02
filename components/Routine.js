import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, AsyncStorage, View, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore';

function Routine(props) {
    const [routine, setRoutine] = useState(null)
    const [allExercises, setAllExercises] = useState(null)

    useEffect(() => {
        const fetchRoutineExercises = async () => {
            const document = await AsyncStorage.getItem("document")
            const routine = await firestore()
              .collection('users1')
              .doc('initial')
              .collection('created-routines')
              .doc(document)
              .get()
            setRoutine(routine.data())
        };
        fetchRoutineExercises()
    }, []);

    useEffect(() => {
        const fetchExercises = async () => {
            const exercises = await firestore()
                .collection('users1')
                .doc('initial')
                .collection('exercises')
                .get()
            
            let arr = []

            exercises.forEach(doc => {
                arr.push(doc.data())
            })

            setAllExercises(arr)
        }
        fetchExercises()
    }, [])

    return(
        <View>
            {routine && <Text>{routine.title}</Text>}
            {routine && routine.exercises.map(exercise => (
                <TouchableOpacity style={styles.exercises}>
                    <Text>{exercise.title}</Text>
                    <Text>{`Sets: ${exercise.sets} | Reps: ${exercise.reps} | Avg. ${exercise.weight} lbs`}</Text>
                </TouchableOpacity>
            ))}
            {allExercises && allExercises.map(exercise => (
                <Text style={styles.exercises}>{exercise.title}</Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    exercises: {
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5
    }
})

export default Routine