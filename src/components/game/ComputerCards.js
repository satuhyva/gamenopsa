import React, { useState, useImperativeHandle, useEffect } from 'react'
import { View } from 'react-native'
import ControllableComputerCard from './ControllableComputerCard'
import { toLeftOrRightGameStackInSingleCardDealing,
    getIndexOfPossibleCardBelow,
    getVisibleComputerCardsAtStart,
    getIndexOfCardToMoveAndTargetStack,
    getTargetPackLocation,
} from './helperFunctions.js'


const getComputerCardsPlayedStates = (cardCount) => {
    let playedStates = []
    for (let i = 0; i < cardCount; i++) {
        playedStates.push(false)
    }
    return playedStates
}


const ComputerCards = React.forwardRef((props, ref) => {

    const [computerCards] = useState(props.computerCards)
    const [cardReferences] = useState(computerCards.map(card => React.createRef()))
    const [indexDealNext, setIndexDealNext] = useState(props.computerCards.length > 15 ? 15 : 100)
    const [visibleCards, setVisibleCards] = useState(getVisibleComputerCardsAtStart(computerCards.length))
    const [playedStates, setPlayedStates] = useState(getComputerCardsPlayedStates(props.computerCards.length))

    useEffect(() => {
        let gameOver = true
        let min = Math.min(15, computerCards.length)
        for (let i = 0; i < min; i++) {
            if (playedStates[i] === false) {
                gameOver = false
            }
        }
        if (gameOver) {
            props.gameOverEndRound('computer')
        }
    },[playedStates, computerCards.length, props])


    const setComputerCardToPlayed = (cardIndex) => {
        const updatedPlayedCards = [...playedStates]
        updatedPlayedCards[cardIndex] = true
        setPlayedStates(updatedPlayedCards)
    }

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
        const indexOfCardToMove = getIndexOfCardToMoveAndTargetStack(computerCards, visibleCards, props.topmostLeft, props.topmostRight)
        // console.log('indexOfCardToMove',indexOfCardToMove)
        if (indexOfCardToMove.cardIndex !== -1) {
            const targetPackLocation = getTargetPackLocation(indexOfCardToMove.target, props.scaleUnit, props.spacing)
            // console.log('targetPackLocation',targetPackLocation)
            cardReferences[indexOfCardToMove.cardIndex].current.moveAndNull(targetPackLocation, true)
            //puuttuu vielä se, että palautetaan takaisin omalle paikalleen, mikäli pelaaja on jo
            // ehtinyt tässä välissä tuomaan kortin pinoon
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
                        setComputerCardToPlayed={setComputerCardToPlayed}
                    />
                )
            })}
        </View>
    )


})

export default ComputerCards


