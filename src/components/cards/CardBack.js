import React from 'react'
import { View, Text } from 'react-native'

const CardBack = ({ scaleUnit }) => {

    const viewStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B9CC3F',
        width: scaleUnit,
        height: scaleUnit * 1.7,
        borderRadius: 6,
    }

    const displayCards = () => {
        let rows = []
        for (let i = 0; i < 9 ; i++) {
            rows.push(<Text key={i} style={{ color: 'green', fontSize: scaleUnit / 7 }}>©©©©©©©</Text>)
        }
        return rows
    }

    return (
        <View  style={viewStyle}>
            {displayCards()}
        </View>
    )
}

export default CardBack

