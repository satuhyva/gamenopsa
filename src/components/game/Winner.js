import React from 'react'
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'


const Winner = (props) => {
    const styles = getStyles(props.unitsAndLocations.unit)

    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }
    const fadeOut = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()
        setTimeout(() => {
            props.continueToNextRound()
        }, 1000)
    }

    return (
        <View>
            <Animated.View style={animatedVisibility}>
                <View style={styles.contents}>
                    <Text style={styles.infoText}>current situation</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>number of your cards:</Text>
                    <Text style={styles.infoText}>{props.game.playerStack.length}</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>number of computer cards:</Text>
                    <Text style={styles.infoText}>{props.game.computerStack.length}</Text>
                    <View style={styles.spacer}></View>
                    <TouchableOpacity onPress={fadeOut} style={styles.buttonView}>
                        <Text style={styles.buttonText}>continue to next round</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}


const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
}

const ConnectedWinner = connect(mapStateToProps, mapDispatchToProps)(Winner)

export default ConnectedWinner


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
            fontSize: scaleUnit / 2.5,
            color: '#B9CC3F',
            fontFamily: 'Arial',
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


