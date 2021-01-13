import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, ActivityIndicator } from 'react-native'

import Svg, { Path, Polyline } from 'react-native-svg'

const dimensions = Dimensions.get('window')

function Graph({ exercise }) {
    const [line, setLine] = useState('')
    const [width, setWidth] = useState(dimensions.width - 24)

    useEffect(() => {
        if(exercise){
            let coordinates = ''
            let weights = exercise.weight
            let x = 0
            const minWeight = Math.min(...weights)
            const maxWeight = Math.max(...weights)
            const weightDiff = maxWeight - minWeight
            const xIncrement = width / (exercise.date.length - 1)

            weights.forEach(weight => {
                let a = weight - minWeight
                let b = (weightDiff - a) / weightDiff
                let y = 180 * b + 10

                coordinates = coordinates.concat(`${x},${y} `)
                x = x + xIncrement
            });

            setLine(coordinates)

        }
    }, [ exercise ])

    // const line = exercise && `0,190 387,10`

    return(
        <View style={{ margin: 10, borderColor: 'black', borderWidth: 2, backgroundColor: '#c2c2c2' }}>
            { line[0] && (
                <Svg height="200" width={width}>
                    <Polyline
                        points={line}
                        fill="none"
                        stroke="blue"
                        strokeWidth="3"
                    />
                </Svg>
            )}
        </View>
    )
}

export default Graph