import React from 'react'
import { View, Text } from 'react-native'

const CardFront = ({ card }) => {

    let color = 'black'
    let char = ''
    switch (card.suit) {
    case 2:
        char = '♥'
        color = 'red'
        break
    case 3:
        char = '♣'
        break
    case 4:
        char = '♦'
        color = 'red'
        break
    default:
        char = '♠'
        break
    }

    const cardText = card.value === 1 ? 'A' : card.value

    return (
        <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color, fontSize: 30 }}>{char}</Text>
            <Text style={{ color: color, fontSize: 30 }}>{cardText}</Text>
        </View>
    )
}


export default CardFront


