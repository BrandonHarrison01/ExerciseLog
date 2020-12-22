import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';

function Routine(props) {
    const [routine, setRoutine] = useState(null)
    const [allExercises, setAllExercises] = useState(null)

    useEffect(() => {
        const fetchRoutineExercises = async () => {
            const document = await AsyncStorage.getItem("document")
            const getRoutine = await firestore()
              .collection('users1')
              .doc('initial')
              .collection('created-routines')
              .doc(document)
              .get()
            const routineData = getRoutine.data()
            setRoutine(routineData)

            const exercises = await firestore()
                .collection('users1')
                .doc('initial')
                .collection('exercises')
                .get()

            let arr = []

            exercises.forEach(doc => {
                const exercise = doc.data()
                let push = true
                
                for(let i = 0; i < routineData.exercises.length; i++){
                    if(routineData.exercises[i].title === exercise.title){
                        push = false
                    }
                }

                if(push){
                    arr.push(exercise)
                }

            })
            setAllExercises(arr)
        };
        fetchRoutineExercises()
    }, []);

    return(
        <View>
            {routine && <Text>{routine.title}</Text>}
            <ScrollView>
                {routine && routine.exercises.map(exercise => (
                    <TouchableOpacity style={styles.exercises}>
                        <Text>{exercise.title}</Text>
                        <Text>{`Sets: ${exercise.sets} | Reps: ${exercise.reps} | Avg. ${exercise.weight} lbs`}</Text>
                    </TouchableOpacity>
                ))}
                {allExercises && allExercises.map(exercise => (
                    <TouchableOpacity>
                        <Text style={styles.exercises}>{exercise.title}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={{margin: 20, padding: 30}} onPress={() => props.navigation.navigate("EditRoutine")}>
                    <Text>Edit Routine</Text>
                </TouchableOpacity>
            </ScrollView>
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