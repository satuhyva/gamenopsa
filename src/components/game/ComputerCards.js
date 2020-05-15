import React, { useState, useImperativeHandle } from 'react'
import { View } from 'react-native'
import ControllableComputerCard from './ControllableComputerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getVisibleComputerCardsAtStart,
    getIndexOfCardToMoveAndTargetStack,
    getTargetPackLocation,
} from './helperFunctions.js'




const ComputerCards = React.forwardRef((props, ref) => {

    const [computerCards] = useState(props.computerCards)
    const [cardReferences] = useState(computerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.computerCards.length > 15 ? 15 : 100)
    const [visibleCards, setVisibleCards] = useState(getVisibleComputerCardsAtStart(computerCards.length))

    const dealSolitaireCards = () => {
        const limit = Math.min(computerCards.length, 15)
        for (let i = 0; i < limit; i++) {
            cardReferences[i].current.moveAndPossiblyFlip()
        }
    }

    const dealSingleCard = () => {
        if (indexDealNext < props.computerCards.length) {
            cardReferences[indexDealNext].current.moveAndPossiblyFlip()
            setTimeout(() => {
                const toWhichStack = toLeftOrRightGameStackInSingleCardDealing('left', indexDealNext, computerCards.length)
                if (toWhichStack === 'right')  {
                    props.changeTopmostRight(computerCards[indexDealNext])
                } else {
                    props.changeTopmostLeft(computerCards[indexDealNext])
                }
                setIndexDealNext(indexDealNext + 1)
            }, 1600)
        }
    }

    const performComputerCardMoveIfPossible = () => {
        console.log('visibleCards', visibleCards)
        const indexOfCardToMove = getIndexOfCardToMoveAndTargetStack(computerCards, visibleCards, props.topmostLeft, props.topmostRight)
        // console.log('indexOfCardToMove',indexOfCardToMove)
        if (indexOfCardToMove.cardIndex !== -1) {
            const targetPackLocation = getTargetPackLocation(indexOfCardToMove.target, props.scaleUnit, props.spacing)
            // console.log('targetPackLocation',targetPackLocation)
            cardReferences[indexOfCardToMove.cardIndex].current.moveAndNull(targetPackLocation, true)
            setTimeout(() => {
                if (indexOfCardToMove.target === 'right')  {
                    props.changeTopmostRight(computerCards[indexOfCardToMove.cardIndex])
                } else {
                    props.changeTopmostLeft(computerCards[indexOfCardToMove.cardIndex])
                }
                let updatedVisibleCards = visibleCards.filter(cardIndex => cardIndex !== indexOfCardToMove.cardIndex)
                const indexOfCardBelow = getIndexOfPossibleCardBelow(indexOfCardToMove.cardIndex)
                if (indexOfCardBelow !== -1) {
                    updatedVisibleCards.push(indexOfCardBelow)
                }
                setVisibleCards(updatedVisibleCards)
            }, 1000)
            setTimeout(() => {
                flipPossibleCardBelow(indexOfCardToMove.cardIndex)
            }, 1500)

        }

    }


    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard, performComputerCardMoveIfPossible }
    })

    const flipPossibleCardBelow = (cardIndex) => {
        const indexOfCardBelow = getIndexOfPossibleCardBelow(cardIndex)
        if (indexOfCardBelow !== -1) {
            cardReferences[indexOfCardBelow].current.flip()
        }
    }



    return (
        <View>
            {computerCards.map((card, index) => {
                return (
                    <ControllableComputerCard
                        key={index}
                        index={index}
                        card={card}
                        ref={cardReferences[index]}
                        scaleUnit={props.scaleUnit}
                        spacing={props.spacing}
                        cardCount={computerCards.length}
                        flipPossibleCardBelow={flipPossibleCardBelow}
                    />
                )
            })}
        </View>
    )


})

export default ComputerCards


