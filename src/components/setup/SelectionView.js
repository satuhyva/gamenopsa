import React, { useState } from 'react'
import { View, TouchableOpacity,  StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { setGameSettings } from '../../reducers/gameReducer'
import DottedSlider from './DottedSlider'


const SelectionView = (props) => {

    const scaleUnit = props.scaleUnit
    const styles = getStyles(scaleUnit)

    const referenceSkill = React.createRef()
    const referenceSpeed = React.createRef()

    const saveSelectedSettings = () => {
        console.log('referenceSkill', referenceSkill.current.getSelectedValue())
    }


    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>select opponent skill level</Text>
            <DottedSlider
                scaleUnit={scaleUnit}
                optionCount={3}
                ref={referenceSkill}
            />
            <Text style={styles.instructionText}>select opponent speed</Text>
            <DottedSlider
                scaleUnit={scaleUnit}
                optionCount={5}
                ref={referenceSpeed}
            />
            <TouchableOpacity onPress={saveSelectedSettings} style={styles.buttonView}>
                <Text style={styles.buttonText}>save settings</Text>
            </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

const ConnectedSelectionView = connect(mapStateToProps, mapDispatchToProps)(SelectionView)

export default ConnectedSelectionView


const getStyles = (scaleUnit) => {
    return  StyleSheet.create({
        container: {
            alignItems: 'center',
            marginTop: 50,
        },
        instructionText: {
            fontSize: scaleUnit / 2.5,
            color: '#B9CC3F',
            fontFamily: 'Arial',
            marginBottom: scaleUnit / 3,
        },
        spacer: {
            height: scaleUnit / 2,
        },
        buttonView: {
            backgroundColor: '#B9CC3F',
            padding: scaleUnit / 5,
            borderRadius: 8,
            marginTop: scaleUnit / 5,
        },
        buttonText: {
            color: 'green',
            fontFamily: 'Arial',
            fontSize: scaleUnit / 2.5,
        },
    })
}


