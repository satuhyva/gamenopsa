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
    const [unitsAndLocations] = useState(props.unitsAndLocations)
    const [cumulativeLeftStack, setCumulativeLeftStack] = useState([])
    const [cumulativeRightStack, setCumulativeRightStack] = useState([])
    const [touchingDisabled, setTouchingDisabled] = useState(true)

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
        // lisättävä tieto cumulative stackkiin, että mistä pinosta
        // kortti on tulossa ja talletetaan cumulativeen esim. muodossa
        // { card: ###, from: ### }
    }
    const changeTopmostLeft = (card) => {
        setTopmostLeft(card)
        // lisättävä tieto cumulative stackkiin, että mistä pinosta
        // kortti on tulossa ja talletetaan cumulativeen esim. muodossa
        // { card: ###, from: ### }
    }


    const computerPlay = () => {
        setInterval(() => {
            referenceComputerCards.current.performComputerCardMoveIfPossible()
        }, 4000)
    }

    const gameOverEndRound = (theWinner) => {
        setTimeout(() => {
            props.gameRoundOver(theWinner)
        }, 2000)
    }

    const topmostStuff = {
        valueLeft: topmostLeft,
        valueRight: topmostRight,
        changeLeft: changeTopmostLeft,
        changeRight: changeTopmostRight,
    }

    return (
        <View>
            <CommonGameStacks
                topmostLeft={topmostLeft}
                topmostRight={topmostRight}
                unitsAndLocations={unitsAndLocations}
            />
            <PlayerCards
                playerCards={playerCards}
                ref={referencePlayerCards}
                gameOverEndRound={gameOverEndRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
            />
            <ComputerCards
                computerCards={computerCards}
                ref={referenceComputerCards}
                gameOverEndRound={gameOverEndRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
            />
            <Text style={{ backgroundColor: 'powderblue' }}>PROTOTYPE, UNDER DEVELOPMENT!!!</Text>
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


