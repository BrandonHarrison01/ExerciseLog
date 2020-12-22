import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'

import firestore from '@react-native-firebase/firestore';

function EditRoutine() {
    const [routineExercises, setRoutineExercises] = useState(null)

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
            setRoutineExercises(routineData)
        }
        fetchRoutineExercises()
    }, [])

    return(
        <View>
            <Text>Edit Routine</Text>
            {routineExercises && <Text>{routineExercises.title}</Text>}
            <ScrollView>
                {routineExercises && routineExercises.exercises.map(exercise => (
                    <TouchableOpacity>
                        <Text>{exercise.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default EditRoutine