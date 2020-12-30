import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

function AddExercise() {
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
    }
    });

export default AddExercise