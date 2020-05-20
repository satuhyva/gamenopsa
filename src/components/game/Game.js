import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import PlayerCards from './PlayerCards'
import CommonGameStacks from './CommonGameStacks'
import ComputerCards from './ComputerCards'
import ControlPanel from './ControlPanel'



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
    const [roundIsActive, setRoundIsActive] = useState(false)

    const dealSolitaireCards = () => {
        referencePlayerCards.current.dealSolitaireCards()
        referenceComputerCards.current.dealSolitaireCards()
    }
    const dealSingleCards = () => {
        referencePlayerCards.current.dealSingleCard()
        referenceComputerCards.current.dealSingleCard()
    }

    const changeTopmostLeft = (card) => {
        setTopmostLeft(card)
        let updated = [...cumulativeLeftStack]
        updated.push(card)
        setCumulativeLeftStack(updated)
    }

    const changeTopmostRight = (card) => {
        setTopmostRight(card)
        let updated = [...cumulativeRightStack]
        updated.push(card)
        setCumulativeRightStack(updated)
    }

    const endRound = (theWinner) => {
        const gameRoundOverPlayerStateData = referencePlayerCards.current.returnGameRoundOverStateData()
        const gameRoundOverComputerStateData = referenceComputerCards.current.returnGameRoundOverStateData()
        const topmostValues = referencePlayerCards.current.returnTopmostValues()
        props.gameRoundOver(theWinner, gameRoundOverPlayerStateData, gameRoundOverComputerStateData, topmostValues, cumulativeLeftStack, cumulativeRightStack)
    }

    const topmostStuff = {
        valueLeft: topmostLeft,
        valueRight: topmostRight,
        changeLeft: changeTopmostLeft,
        changeRight: changeTopmostRight,
    }


    const changeGameIsActiveState = () => {
        const isNewCardDealingNeeded = checkIfNewCardDealingIsNeeded()
        if (isNewCardDealingNeeded) {
            setRoundIsActive(false)
        } else {
            setRoundIsActive(true)
            setTimeout(() => {
                performRecurrentComputerCardAction()
            }, 4000)
        }
    }

    const performRecurrentComputerCardAction = () => {
        if (referenceComputerCards !== null && referenceComputerCards.current !== null) {
            const occupancyDataComputer = referenceComputerCards.current.returnOccupancyData()
            const couldMoveCardToEmptyPosition = couldMoveCardsToEmptyPosition(occupancyDataComputer)
            if (couldMoveCardToEmptyPosition) {
                referenceComputerCards.current.moveCardToEmptyPosition()
            } else {
                const topmostValues = referencePlayerCards.current.returnTopmostValues()
                const occupancyDataPlayer = referencePlayerCards.current.returnOccupancyData()
                const dealingNewCardsIsNeeded = newCardsAreNeeded(occupancyDataPlayer, occupancyDataComputer, topmostValues.left, topmostValues.right, playerCards, computerCards)
                if (dealingNewCardsIsNeeded) {
                    setRoundIsActive(false)
                } else {
                    referenceComputerCards.current.startComputerCardMoveIfPossible()
                }
            }
            setTimeout(() => {
                performRecurrentComputerCardAction()
            }, 4000)
        }
    }


    const checkIfNewCardDealingIsNeeded = () => {
        const occupancyDataPlayer = referencePlayerCards.current.returnOccupancyData()
        const occupancyDataComputer = referenceComputerCards.current.returnOccupancyData()
        const topmostValues = referencePlayerCards.current.returnTopmostValues()
        return newCardsAreNeeded(occupancyDataPlayer, occupancyDataComputer, topmostValues.left, topmostValues.right, playerCards, computerCards)
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
                endRound={endRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
                roundIsActive={roundIsActive}
            />
            <ComputerCards
                computerCards={computerCards}
                ref={referenceComputerCards}
                endRound={endRound}
                unitsAndLocations={unitsAndLocations}
                topmostStuff={topmostStuff}
                roundIsActive={roundIsActive}
            />
            <ControlPanel
                unitsAndLocations={unitsAndLocations}
                dealSolitaireCards={dealSolitaireCards}
                dealSingleCards={dealSingleCards}
                roundIsActive={roundIsActive}
                changeGameIsActiveState={changeGameIsActiveState}
            />
            <Text style={{ position: 'absolute', top: (0.5 + 1.5) * 1.7 * unitsAndLocations.unit, fontStyle: 'bold' }}>PROTOTYPE: PLAY VERY SLOWLY</Text>
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




// HELPER FUNCTIONS FOR COMPONENT ConnectedGame

const newCardsAreNeeded = (occupancyDataPlayer, occupancyDataComputer, topmostLeft, topmostRight, playerCards, computerCards) => {
    const visiblePlayerCardValues = getVisibleCards(occupancyDataPlayer, playerCards)
    const visibleComputerCardValues = getVisibleCards(occupancyDataComputer, computerCards)
    if (couldMoveCardsToEmptyPosition(occupancyDataPlayer) || couldMoveCardsToEmptyPosition(occupancyDataComputer)) {
        return false
    }
    const playerCardsNeedNewDealing = newOneCardDealingIsNeeded(visiblePlayerCardValues, topmostLeft, topmostRight)
    if (!playerCardsNeedNewDealing) {
        return false
    }
    const computerCardsNeedNewDealing = newOneCardDealingIsNeeded(visibleComputerCardValues, topmostLeft, topmostRight)
    if (!computerCardsNeedNewDealing) {
        return false
    }
    return true
}

const couldMoveCardsToEmptyPosition = (occupancyData) => {
    let emptyPositionsAvailable = false
    const number = Math.min(5, occupancyData.length)
    for (let i = 0; i < number; i++) {
        if (occupancyData[i] === -1) {
            emptyPositionsAvailable = true
        }
    }
    let cardAvailabelForMovingToEmptyPosition = false
    if (emptyPositionsAvailable) {
        const count = Math.min(9, occupancyData.length)
        for (let i = 5; i < count; i++) {
            if (occupancyData[i] !== -1) {
                cardAvailabelForMovingToEmptyPosition = true
            }
        }
    }
    return cardAvailabelForMovingToEmptyPosition
}

const newOneCardDealingIsNeeded = (visibleCardValues, leftValue, rightValue) => {
    for (let i = 0; i < visibleCardValues.length; i++) {
        const leftOK = valueIsOKforPlacingOntoAStack(visibleCardValues[i], leftValue)
        if (leftOK) {
            return false
        }
        const rightOK = valueIsOKforPlacingOntoAStack(visibleCardValues[i], rightValue)
        if (rightOK) {
            return false
        }
    }
    return true
}

const getVisibleCards = (occupancies, cards) => {
    let visibleCardValues = []
    const sets = [[0], [5,1], [9,6,2], [12,10,7,3], [14,13,11,8,4]]
    let i = 0
    while (i < 5) {
        let j = 0
        let look = true
        while (look && j < sets[i].length) {
            if (sets[i][j] < cards.length) {
                const indexOfCardAtThisPosition = occupancies[sets[i][j]]
                if (indexOfCardAtThisPosition !== -1) {
                    visibleCardValues.push(cards[indexOfCardAtThisPosition].value)
                    look = false
                }
            }
            j++
        }
        i++
    }
    return visibleCardValues
}

export const valueIsOKforPlacingOntoAStack = (newValue, currentTopmostValue) => {
    if (currentTopmostValue === 1) {
        if (newValue === 2 || newValue === 13) {
            return true
        }
    } else if (currentTopmostValue === 13) {
        if (newValue === 12 || newValue === 1) {
            return true
        }
    } else {
        if (newValue === currentTopmostValue + 1 || newValue === currentTopmostValue - 1) {
            return true
        } else {
            return false
        }
    }
}




