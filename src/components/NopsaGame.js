import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import SetUpNewGame from './setupGame/SetUpNewGame'
import Game from './game/Game'


// const NopsaGame = (props) => {
//     console.log(props.game)
//     const arvo = props.game.isOn
//     return (
//         <View>
//             <Text>nopsa game</Text>
//             <Text>muutos</Text>
//             <Text>{arvo ? 'totta' : 'valhetta'}</Text>
//         </View>
//     )
// }
const NopsaGame = (props) => {
    const gameIsOn = props.game.gameIsOn
    return (
        <View>
            {!gameIsOn ?
                <Text>blaah</Text>
                :
                <Text>zzzzzzz</Text>
            }
        </View>
    )
}

// const NopsaGame = (props) => {
//     const gameIsOn = props.game.gameIsOn
//     return (
//         <View>
//             {!gameIsOn ?
//                 <SetUpNewGame/>
//                 :
//                 <Game/>
//             }
//         </View>
//     )
// }

const mapStateToProps = state => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
}

const ConnectedNopsaGame = connect(mapStateToProps, mapDispatchToProps)(NopsaGame)

export default ConnectedNopsaGame




