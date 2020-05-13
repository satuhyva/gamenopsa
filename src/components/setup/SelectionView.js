import React from 'react'
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { setGameSettings } from '../../reducers/gameReducer'
import DottedSlider from './DottedSlider'
import StackSelection from './StackSelection'
import { createStacks } from './createStacks.js'


const SelectionView = (props) => {

    const scaleUnit = props.scaleUnit
    const styles = getStyles(scaleUnit)

    const referenceSkill = React.createRef()
    const referenceSpeed = React.createRef()
    const referenceStack = React.createRef()

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }

    const saveSelectedSettings = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()
        const stacks = createStacks()
        setTimeout(() => {
            props.setGameSettings({
                skill: referenceSkill.current.getSelectedValue(),
                speed: referenceSpeed.current.getSelectedValue(),
                playerStack: stacks[referenceStack.current.getSelectedStack().player],
                computerStack : stacks[referenceStack.current.getSelectedStack().computer],
                isOn: true,
            })
        }, 1000)

    }


    return (
        <Animated.View style={[styles.container, animatedVisibility]}>
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
            <Text style={styles.instructionText}>select your stack</Text>
            <StackSelection
                scaleUnit={scaleUnit}
                ref={referenceStack}
            />
            <View style={styles.spacer}></View>
            <TouchableOpacity onPress={saveSelectedSettings} style={styles.buttonView}>
                <Text style={styles.buttonText}>save settings</Text>
            </TouchableOpacity>
        </Animated.View>
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


