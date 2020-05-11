import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Game from './game/Game'
import SetUpGame from './setup/SetUpGame'



const GameOfNopsa = (props) => {

    const gameIsOn = props.game.isOn
    console.log('GameOfNopsa')

    return (
        <View>
            {gameIsOn ?
                <Game/>
                :
                <SetUpGame/>
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




