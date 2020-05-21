import React from 'react'
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { endGame } from '../../reducers/gameReducer'

const EndView = ({ winner, styles, animatedVisibility, fadeOut }) => {
    let outcome = winner === 'player' ? 1 : 2
    const textOptions = {
        title: { 1: 'yippee!', 2: 'oh no...' },
        text1: { 1: 'you won the game', 2: 'you lost the game' },
        text2: { 1: 'congratulations!', 2: 'better luck next time...' },
    }
    return (
        <View>
            <Animated.View style={animatedVisibility}>
                <View style={styles.contents}>
                    <Text style={styles.titleText}>{textOptions.title[outcome]}</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>{textOptions.text1[outcome]}</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>{textOptions.text2[outcome]}</Text>
                    <View style={styles.spacer}></View>
                    <View style={styles.spacer}></View>
                    <TouchableOpacity onPress={fadeOut} style={styles.buttonView}>
                        <Text style={styles.buttonText}>new game</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}


const ContinueView = ({  styles, animatedVisibility, fadeOut, playerCardsCount, computerCardsCount  }) => {
    return (
        <View>
            <Animated.View style={animatedVisibility}>
                <View style={styles.contents}>
                    <Text style={styles.titleText}>situation</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>number of your cards:</Text>
                    <Text style={styles.infoText}>{playerCardsCount}</Text>
                    <View style={styles.spacer}></View>
                    <Text style={styles.infoText}>number of computer cards:</Text>
                    <Text style={styles.infoText}>{computerCardsCount}</Text>
                    <View style={styles.spacer}></View>
                    <TouchableOpacity onPress={fadeOut} style={styles.buttonView}>
                        <Text style={styles.buttonText}>continue to next round</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}



const Winner = (props) => {

    const styles = getStyles(props.unitsAndLocations.unit)
    const visibility = new Animated.Value(1)
    const animatedVisibility = { opacity: visibility }

    const fadeOut = () => {
        Animated.timing(visibility, {
            toValue: 0, duration: 1000,
        }).start()
        if (props.game.playerStack.length === 0 || props.game.computerStack.length === 0) {
            props.continueToNextRound()
            props.endGame()
        } else {
            setTimeout(() => {
                props.continueToNextRound()
            }, 1000)
        }

    }

    if (props.game.playerStack.length === 0 || props.game.computerStack.length === 0) {
        return (
            <EndView
                styles={styles}
                animatedVisibility={animatedVisibility}
                fadeOut={fadeOut}
                winner={props.winner}
            />
        )
    } else {
        return (
            <ContinueView
                styles={styles}
                animatedVisibility={animatedVisibility}
                fadeOut={fadeOut}
                playerCardsCount={props.game.playerStack.length}
                computerCardsCount={props.game.computerStack.length}
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    endGame,
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


