import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Game from './game/Game'
import SetUpGame from './setup/SetUpGame'



const GameOfNopsa = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const scaleUnit = Math.min(screenWidth / 6, screenHeight /(6 * 1.7))
    const styles = getStyles(screenWidth, screenHeight)
    const spacing = (screenWidth - 6 * scaleUnit) / 2

    const gameIsOn = props.game.isOn


    return (
        <View style={styles.screen}>
            {gameIsOn ?
                <Game scaleUnit={scaleUnit} spacing={spacing}/>
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



