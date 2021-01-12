import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native'

import Svg, { Path, Polyline } from 'react-native-svg'

const dimensions = Dimensions.get('window')

function Graph({ exercise }) {
    const [line, setLine] = useState('')

    useEffect(() => {
        if(exercise){
            let minWeight = exercise.weight[0]
            let maxWeight = exercise.weight[0]

            exercise.weight.forEach(element => {
                if(element < minWeight){
                    minWeight = element
                }

                if(element > maxWeight){
                    maxWeight = element
                }
            });

            console.log(minWeight, 'es')
            console.log(maxWeight, 'es')
        }
    }, [ exercise ])

    // const line = exercise && `0,190 387,10`

    return(
        <View style={{ margin: 10, borderColor: 'red', borderWidth: 2 }}>
            <Svg height="200" width={dimensions.width - 24}>
                <Polyline
                    points={line}
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
                {/* <Polyline
                    points="0,175 25,125 50,75 75,20 95,5 387,5"
                    fill="none"
                    stroke="blue"
                    strokeWidth="3"
                /> */}
            </Svg>
        </View>
    )
}

export default Graph