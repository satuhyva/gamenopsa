import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Game from './game/Game'
import SetUpGame from './setup/SetUpGame'



const GameOfNopsa = (props) => {
    const isOn = props.game.gameIsOn
    return (
        <View>
            {!isOn ?
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




