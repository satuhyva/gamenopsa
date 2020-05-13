import React, { useState, useImperativeHandle } from 'react'
import { View } from 'react-native'
import ControllablePlayerCard from './ControllablePlayerCard'
import { toLeftOrRightGameStackInSingleCardDealing, getIndexOfPossibleCardBelow } from './helperFunctions.js'


const PlayerCards = React.forwardRef((props, ref) => {

    const [playerCards] = useState(props.playerCards)
    const [cardReferences] = useState(playerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.playerCards.length > 15 ? 15 : 100)

    const dealSolitaireCards = () => {
        const limit = Math.min(playerCards.length, 15)
        for (let i = 0; i < limit; i++) {
            cardReferences[i].current.moveAndPossiblyFlip()
        }
    }

    const dealSingleCard = () => {
        if (indexDealNext < props.playerCards.length) {
            cardReferences[indexDealNext].current.moveAndPossiblyFlip()
            setTimeout(() => {
                const toWhichStack = toLeftOrRightGameStackInSingleCardDealing(indexDealNext, playerCards.length)
                if (toWhichStack === 'right')  {
                    props.changeTopmostRight(playerCards[indexDealNext])
                } else {
                    props.changeTopmostLeft(playerCards[indexDealNext])
                }
                setIndexDealNext(indexDealNext + 1)
            }, 1600)
        }
    }

    const flipPossibleCardBelow = (cardIndex) => {
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        cardReferences[indexOfCardBelow].current.flip()
    }

    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard }
    })


    return (
        <View>
            {playerCards.map((card, index) => {
                return (
                    <ControllablePlayerCard
                        key={index}
                        index={index}
                        card={card}
                        ref={cardReferences[index]}
                        scaleUnit={props.scaleUnit}
                        spacing={props.spacing}
                        cardCount={playerCards.length}
                        topmostLeft={props.topmostLeft}
                        topmostRight={props.topmostRight}
                        changeTopmostRight={props.changeTopmostRight}
                        changeTopmostLeft={props.changeTopmostLeft}
                        flipPossibleCardBelow={flipPossibleCardBelow}
                    />
                )
            })}
        </View>
    )
})


export default PlayerCards

