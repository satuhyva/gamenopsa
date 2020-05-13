import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import PlayerCards from './PlayerCards'


const Game = (props) => {

    const [playerCards] = useState(props.game.playerStack)
    const referencePlayerCards = React.createRef()

    const dealSolitaireCards = () => {
        referencePlayerCards.current.dealSolitaireCards()
    }
    const dealSingleCards = () => {
        referencePlayerCards.current.dealSingleCard()
    }


    return (
        <View>
            <PlayerCards
                playerCards={playerCards}
                ref={referencePlayerCards}
                scaleUnit={props.scaleUnit}
                spacing={props.spacing}
            />
            <TouchableOpacity onPress={dealSolitaireCards} >
                <Text >deal solitaire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={dealSingleCards} >
                <Text >deal single</Text>
            </TouchableOpacity>
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

const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game)


export default ConnectedGame



// console.log('props', props)

// const [some, setSome] = useState(true)
// const [show, setShow] = useState(true)

// const refMove = React.createRef()
// const flippaatms = () => {
//     refMove.current.moveToNewLocation({ x: 100, y: 200 })
// }
// const move2 = () => {
//     refMove.current.moveToNewLocation({ x: 100, y: 350 })
// }
// const flipInside = () => {
//     refMove.current.flip()
//     setTimeout(() => {
//         setShow(false)
//     }, 1000)
// }



// {/* <MovableFlippableCard
//     ref={refMove}
//     scaleUnit={props.scaleUnit}
//     startLocation={{ x: 0, y: 0 }}
// /> */}

// {/* <DraggableCard
//     card={{ suit: 2, value: 3 }}
//     size={props.scaleUnit}
//     startLocation={{ x: 0, y: 0 }}
// /> */}



// {/* <View>
//     <TouchableOpacity onPress={flippaatms} >
//         <Text >flippaatms</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={move2} >
//         <Text >move2</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={flipInside} >
//         <Text >flipInside</Text>
//     </TouchableOpacity>
// </View> */}