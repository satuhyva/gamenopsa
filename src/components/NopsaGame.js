import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import SetUpNewGame from './setupGame/SetUpNewGame'
import Game from './game/Game'


const NopsaGame = (props) => {
    return (
        <View>
            {!props.game.gameIsOn ?
                <SetUpNewGame/>
                :
                <Game/>
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

const ConnectedNopsaGame = connect(mapStateToProps, mapDispatchToProps)(NopsaGame)

export default ConnectedNopsaGame




