import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import PlayerCards from './PlayerCards'
import CommonGameStacks from './CommonGameStacks'
import ComputerCards from './ComputerCards'

const Game = (props) => {

    const [topmostLeft, setTopmostLeft] = useState('')
    const [topmostRight, setTopmostRight] = useState('')
    const [playerCards] = useState(props.game.playerStack)
    const [computerCards] = useState(props.game.computerStack)
    const [referencePlayerCards] = useState(React.createRef())
    const [referenceComputerCards] = useState(React.createRef())

    const dealSolitaireCards = () => {
        referencePlayerCards.current.dealSolitaireCards()
        referenceComputerCards.current.dealSolitaireCards()
    }
    const dealSingleCards = () => {
        referencePlayerCards.current.dealSingleCard()
        referenceComputerCards.current.dealSingleCard()
    }

    const changeTopmostRight = (card) => {
        setTopmostRight(card)
    }
    const changeTopmostLeft = (card) => {
        setTopmostLeft(card)
    }


    const computerPlay = () => {
        setInterval(() => {
            referenceComputerCards.current.performComputerCardMoveIfPossible()
        }, 3000)
    }


    return (
        <View>
            <CommonGameStacks
                topmostLeft={topmostLeft}
                topmostRight={topmostRight}
                scaleUnit={props.scaleUnit}
                spacing={props.spacing}
            />
            <PlayerCards
                playerCards={playerCards}
                ref={referencePlayerCards}
                scaleUnit={props.scaleUnit}
                spacing={props.spacing}
                changeTopmostRight={changeTopmostRight}
                changeTopmostLeft={changeTopmostLeft}
                topmostLeft={topmostLeft}
                topmostRight={topmostRight}
            />
            <ComputerCards
                computerCards={computerCards}
                ref={referenceComputerCards}
                scaleUnit={props.scaleUnit}
                spacing={props.spacing}
                changeTopmostRight={changeTopmostRight}
                changeTopmostLeft={changeTopmostLeft}
                topmostLeft={topmostLeft}
                topmostRight={topmostRight}
            />
            <Text style={{ backgroundColor: 'powderblue' }}>THIS APP IS NOT READY, IT IS UNDER DEVELOPMENT!!!</Text>
            <TouchableOpacity onPress={dealSolitaireCards} >
                <Text  style={{  backgroundColor: 'rosybrown' }}>BUTTON deal player solitaire (press only ONCE)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={dealSingleCards} >
                <Text  style={{  backgroundColor: 'powderblue' }}>BUTTON deal single card (press after solitaire animations)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={computerPlay} >
                <Text  style={{  backgroundColor: 'red' }}>BUTTON computer play</Text>
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


