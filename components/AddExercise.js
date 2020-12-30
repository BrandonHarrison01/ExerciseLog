import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore'

function AddExercise() {
    const [routines, setRoutines] = useState()

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
    

    return (
        <View>
            <Text>Add Exercise</Text>
            <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
                <Text style={{marginLeft: 20}}>REQUIRED</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text>TITLE:</Text>
                <TextInput placeholder='enter title' />
            </View>
            <View>
                <Text>EXERCISE TYPE:</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <View style={styles.circle} />
                    <Text>TIME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <View style={styles.circle} />
                    <Text>SETS AND REPS NO WEIGHT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <View style={styles.circle} />
                    <Text>SETS AND REPS W/WEIGHT</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', margin: 30 }}>
                <TextInput placeholder='SETS'/>
                <Text>X</Text>
                <TextInput placeholder='REPS'/>
                <Text>OF</Text>
                <TextInput placeholder='WEIGHT'/>
                <Text>LBS</Text>
            </View>
            <View style={{borderTopColor: 'black', borderTopWidth: 1}}>
                <Text style={{marginLeft: 20}}>OPTIONAL</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text>ONE REP MAX</Text>
                <TextInput placeholder='WEIGHT' />
                <Text>LBS</Text>
            </View>
            <View>
                <Text>PLANNED DAYS:</Text>
                {
                    routines && routines.map(routine => (
                        <TouchableOpacity style={ styles.routines }>
                            <Text>{routine.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View>
                <Text>DESCRIPTION:</Text>
                <TextInput placeholder='description' multiline={true} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center', // To center the checked circle…
        justifyContent: 'center',
        marginHorizontal: 10
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#131313' // You can set it default or with yours one…
    },
    routines: {
        margin: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1
    }
});

export default AddExercise