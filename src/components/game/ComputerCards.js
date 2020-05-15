import React, { useState, useImperativeHandle } from 'react'
import { View } from 'react-native'
import ControllableComputerCard from './ControllableComputerCard'
import { toLeftOrRightGameStackInSingleCardDealing, getIndexOfPossibleCardBelow } from './helperFunctions.js'




const ComputerCards = React.forwardRef((props, ref) => {

    const [computerCards] = useState(props.computerCards)
    const [cardReferences] = useState(computerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.computerCards.length > 15 ? 15 : 100)

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

    useImperativeHandle(ref, () => {
        return { dealSolitaireCards, dealSingleCard }
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


