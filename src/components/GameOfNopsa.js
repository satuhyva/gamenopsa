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

    const gameIsOn = props.game.isOn

    const [winner, setWinner] = useState('none')

    const gameRoundOver = (theWinner) => {

        setWinner(theWinner)
    }
    const GameWithRounds = () => {
        if (winner === 'none') {
            return <Game scaleUnit={scaleUnit} spacing={spacing} gameRoundOver={gameRoundOver}/>
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



