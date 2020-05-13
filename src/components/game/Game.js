import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import PlayerCards from './PlayerCards'
import CommonGameStacks from './CommonGameStacks'


const Game = (props) => {

    const [topmostLeft, setTopmostLeft] = useState('')
    const [topmostRight, setTopmostRight] = useState('')
    const [playerCards] = useState(props.game.playerStack)
    const referencePlayerCards = React.createRef()

    const dealSolitaireCards = () => {
        referencePlayerCards.current.dealSolitaireCards()
    }
    const dealSingleCards = () => {
        referencePlayerCards.current.dealSingleCard()
    }

    const changeTopmostRight = (card) => {
        setTopmostRight(card)
    }
    const changeTopmostLeft = (card) => {
        console.log('changeTopmostLeft')
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


