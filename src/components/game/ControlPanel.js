import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'



const ControlPanel = ({ unitsAndLocations, dealSolitaireCards, dealSingleCards, roundIsActive, changeGameIsActiveState }) => {

    const [solitaireDealingDone, setSolitaireDealingDone] = useState(false)
    const [displayText, setDisplayText] = useState('deal solitaire cards')

    const styles = getStyles(unitsAndLocations.unit)

    const performActions = () => {
        if (solitaireDealingDone) {
            setDisplayText('')
            dealSingleCards()
            setTimeout(() => {
                changeGameIsActiveState()
                setDisplayText('continue')
            }, unitsAndLocations.timing.moveDurationDealing + unitsAndLocations.timing.flipDurationDealing)
        } else {
            setDisplayText('')
            dealSolitaireCards()
            setTimeout(() => {
                setSolitaireDealingDone(true)
                setDisplayText('continue')
            }, (unitsAndLocations.timing.moveDurationDealing + unitsAndLocations.timing.flipDurationDealing) + 15 * 500)
        }
    }

    if (displayText === '' || roundIsActive) {
        return null
    } else {
        return (
            <View style={{ position: 'absolute', top: 0, alignSelf: 'center' }}>
                <TouchableOpacity onPress={performActions} style={styles.buttonView}>
                    <Text style={styles.buttonText}>{displayText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ControlPanel



const getStyles = (scaleUnit) => {
    return StyleSheet.create({
        contents:{
            alignItems: 'center',
            marginTop: scaleUnit / 2,
        },
        titleText: {
            fontSize: scaleUnit / 1.5,
            fontWeigth: 'bold',
            color: '#B9CC3F',
            fontFamily: 'Arial Black',
        },
        infoText: {
            fontSize: scaleUnit / 2.75,
            color: '#B9CC3F',
            fontFamily: 'Arial',
        },
        spacer: {
            height: scaleUnit / 2,
        },
        buttonView: {
            backgroundColor: '#B9CC3F',
            padding: scaleUnit / 10,
            borderRadius: 8,
            marginTop: scaleUnit / 10,
        },
        buttonText: {
            color: 'green',
            fontFamily: 'Arial',
            fontSize: scaleUnit / 3,
        },
    })
}