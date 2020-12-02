import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'

import firestore from '@react-native-firebase/firestore';

function NewRoutine() {
    let [selectedExercises, setSelectedExercises] = useState(null)
    let [allExercises, setAllExercises] = useState(null)

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

    return (
        <View>
            <View>
                <Text>TITLE</Text>
                <TextInput placeholder="Routine Name..." />
            </View>
            <TextInput placeholder="SEARCH EXISTING EXERCISES" />
            {allExercises && allExercises.map(exercise => (
                <View style={styles.exercises}>
                    <Text>{exercise.title}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
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
    },
    addButton: {
        backgroundColor: 'yellowgreen',
        padding: 5,
        width: 30
    }
  })

export default NewRoutine