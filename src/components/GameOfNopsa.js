import React, { useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Game from './game/Game'
import SetUpGame from './setup/SetUpGame'
import Winner from './game/Winner'


const GameOfNopsa = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const scaleUnit = Math.min(screenWidth / 6, screenHeight /(6 * 1.7))
    const styles = getStyles(screenWidth, screenHeight)
    const spacing = (screenWidth - 6 * scaleUnit) / 2
    const unitsAndLocations = getUnitsAndLocations(scaleUnit, spacing)
    const gameIsOn = props.game.isOn

    const [winner, setWinner] = useState('none')

    const gameRoundOver = (theWinner) => {

        setWinner(theWinner)
    }
    const GameWithRounds = () => {
        if (winner === 'none') {
            return <Game scaleUnit={scaleUnit} spacing={spacing} gameRoundOver={gameRoundOver} unitsAndLocations={unitsAndLocations}/>
        } else {
            return <Winner winner={winner}/>
        }
    }


    return (
        <View style={styles.screen}>
            {gameIsOn ?
                <GameWithRounds/>
                :
                <SetUpGame scaleUnit={scaleUnit}/>
            }
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

const ConnectedGameOfNopsa = connect(mapStateToProps, mapDispatchToProps)(GameOfNopsa)

export default ConnectedGameOfNopsa

const getStyles = (screenWidth, screenHeight) => {
    return StyleSheet.create({
        screen: {
            width: screenWidth,
            height: screenHeight,
            backgroundColor: 'green',
        },
    })
}


const getUnitsAndLocations = (unit, spacing) => {

    const leftDealingStackXY = {
        x: spacing + (1/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const leftGamingStackXY = {
        x: spacing + (1/6 + 1 + 4/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const rightGamingStackXY = {
        x: spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }
    const rightDealingStackXY = {
        x: spacing + (1/6 + 1 + 4/6 + 1 + 2/6 + 1 + 4/6) * unit,
        y: (0.5 + 1.5 + 0.75) * 1.7 * unit,
    }

    return {
        unit: unit,
        spacing: spacing,
        leftDealingStackXY: leftDealingStackXY,
        leftGamingStackXY: leftGamingStackXY,
        rightGamingStackXY: rightGamingStackXY,
        rightDealingStackXY: rightDealingStackXY,
        timing: {
            moveDurationDealing: 1000,
            flipDurationDealing: 600,
            veryfast: 50,
            fast: 100,
            medium: 200,
            slow: 600,
            veryslow: 1000,

        },
    }
}

// timings:
// flip card completely (2 halve animations together)       medium



