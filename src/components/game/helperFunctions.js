
export const getPlayerCardStartLocation = (scalingUnit, spacing) => {
    const positionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6 + 1 + 4/6) * scalingUnit
    const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
    return { x: positionX, y: positionY }
}

export const getCardFlipStateAfterDealing = (cardIndex, cardCount) => {
    let flip = false
    switch (cardIndex) {
    case 0: case 5: case 9: case 12: case 14:
        flip = true
        break
    case 1: case 2: case 3: case 4:
        if (cardIndex + 4 >= cardCount) {
            flip = true
        }
        break
    case 6: case 7: case 8:
        if (cardIndex + 3 >= cardCount) {
            flip = true
        }
        break
    case 10: case 11:
        if (cardIndex + 2 >= cardCount) {
            flip = true
        }
        break
    case 13:
        if (cardIndex + 1 >= cardCount) {
            flip = true
        }
        break
    default:
        break
    }
    if (cardIndex > 14) {
        flip = true
    }
    return flip
}






const getPlayerCardSolitaireLocation = (cardIndex, scalingUnit, spacing) => {

    const unitHeight = 1.7 * scalingUnit
    const origoY =  (0.5 + 1.5 + 0.75 + 1.0 + 0.75) * unitHeight

    let positionX
    switch (cardIndex) {
    case 0:
        positionX = spacing + 1 / 6 * scalingUnit
        break
    case 1: case 5:
        positionX = spacing + (2 / 6  + 1)* scalingUnit
        break
    case 2: case 6: case 9:
        positionX = spacing +  (3 / 6 + 2) * scalingUnit
        break
    case 3: case 7: case 10: case 12:
        positionX = spacing +  (4 / 6 + 3) * scalingUnit
        break
    default:
        positionX = spacing +  (5 / 6 + 4) * scalingUnit
    }

    let positionY
    switch (cardIndex) {
    case 14:
        positionY = origoY + (4 * 0.125) * unitHeight
        break
    case 12: case 13:
        positionY = origoY + (3 * 0.125) * unitHeight
        break
    case 9: case 10: case 11:
        positionY = origoY + (2 * 0.125) * unitHeight
        break
    case 5: case 6: case 7: case 8:
        positionY = origoY + (1 * 0.125) * unitHeight
        break
    default:
        positionY = origoY
    }

    return { x: positionX, y: positionY }
}

export const whatStackWasReleasedOn = (releaseX, releaseY, scaleUnit, spacing) => {
    const wasReleasedOnLeft = wasReleasedOnLeftStack(releaseX, releaseY, scaleUnit, spacing)
    const wasReleasedOnRight = wasReleasedOnRightStack(releaseX, releaseY, scaleUnit, spacing)
    if (wasReleasedOnLeft) {
        return 'left'
    } else if (wasReleasedOnRight) {
        return 'right'
    } else {
        return 'none'
    }
}

const wasReleasedOnRightStack = (releaseX, releaseY, scaleUnit, spacing) => {
    const gamingStackRightX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit
    const gamingStackRightY = (0.5 + 1.5 + 0.75) * scaleUnit * 1.7
    if (!(releaseX > gamingStackRightX && releaseX < gamingStackRightX + scaleUnit)) {
        return false
    }
    if (!(releaseY > gamingStackRightY && releaseY < gamingStackRightY + scaleUnit * 1.7)) {
        return false
    }
    return true
}

const wasReleasedOnLeftStack = (releaseX, releaseY, scaleUnit, spacing) => {
    const gamingStackLeftX = spacing + (1/6 + 1 + 4/6) * scaleUnit
    const gamingStackLeftY = (0.5 + 1.5 + 0.75) * scaleUnit * 1.7
    if (!(releaseX > gamingStackLeftX && releaseX < gamingStackLeftX + scaleUnit)) {
        return false
    }
    if (!(releaseY > gamingStackLeftY && releaseY < gamingStackLeftY + scaleUnit * 1.7)) {
        return false
    }
    return true
}


export const valueIsOKforPlacingOntoStack = (whatStack, topmostLeft, topmostRight, newCard) => {
    const currentTopmostValue = whatStack === 'left' ? topmostLeft.value : topmostRight.value
    const newValue = newCard.value
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

export const getIndexOfPossibleCardBelow = (cardIndex) => {
    const onTopAndBelowCardIndexPairs = new Map([
        [14, 13],
        [13, 11],
        [12, 10],
        [11, 8],
        [10, 7],
        [9, 6],
        [8, 4],
        [7, 3],
        [6, 2],
        [5, 1],
        ['default', -1],
    ])
    return onTopAndBelowCardIndexPairs.get(cardIndex) || onTopAndBelowCardIndexPairs.get('default')
}



export const whatEmptyPositionWasReleasedOn = (releaseX, releaseY, scaleUnit, spacing, occupancyData) => {
    const emptyPositionsX = []
    for (let i = 0; i < 5; i++) {
        emptyPositionsX.push(spacing + (1/6 + i * (1 + 1/6)) * scaleUnit)
    }
    const emptyPositionsY = (0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * scaleUnit
    let emptyPosition = 'none'
    for (let i = 0; i < 5; i++) {
        const indexOfCardAtPosition = occupancyData[i]
        if (indexOfCardAtPosition === -1) {
            if ((releaseX > emptyPositionsX[i] && releaseX < emptyPositionsX[i] + scaleUnit)) {
                if ((releaseY > emptyPositionsY && releaseY < emptyPositionsY + scaleUnit * 1.7)) {
                    emptyPosition = i
                }
            }
        }
    }
    return emptyPosition
}


export const getComputerCardStartLocation = (scalingUnit, spacing) => {
    const positionX = spacing + (1/6) * scalingUnit
    const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
    return { x: positionX, y: positionY }
}


export const getPlayerCardLocationAfterDealing = (cardIndex, scalingUnit, spacing, cardCount) => {
    if (cardIndex < 15) {
        return getPlayerCardSolitaireLocation(cardIndex, scalingUnit, spacing)
    } else {
        return getLeftOrRightStackXY(scalingUnit, spacing, 'right', cardIndex, cardCount)
    }
}

export const getComputerCardLocationAfterDealing = (cardIndex, scalingUnit, spacing, cardCount) => {
    if (cardIndex < 15) {
        return getComputerCardSolitaireLocation(cardIndex, scalingUnit, spacing)
    } else {
        return getLeftOrRightStackXY(scalingUnit, spacing, 'left', cardIndex, cardCount)
    }
}

const getLeftOrRightStackXY = (scalingUnit, spacing, side, cardIndex, cardCount) => {
    const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
    const toLeftOrRightStack = toLeftOrRightGameStackInSingleCardDealing(side, cardIndex, cardCount)
    if (toLeftOrRightStack === 'right') {
        const rightPackPositionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scalingUnit
        return { x: rightPackPositionX, y: positionY }
    } else {
        const leftPackPositionX = spacing + (1/6 + 1 + 4/6) * scalingUnit
        return { x: leftPackPositionX, y: positionY }
    }
}

export const toLeftOrRightGameStackInSingleCardDealing = (side, cardIndex, cardCount) => {
    const countOfThisPlayerCardsToDealTogether = cardCount - 15 > 0 ? cardCount - 15 : 0
    const opponentCardCount = 52 - cardCount
    const countOfOpponentCardsToDealTogether = opponentCardCount - 15 > 0 ? opponentCardCount - 15 : 0
    const numberOfDealingsDoneTogether = Math.min(countOfThisPlayerCardsToDealTogether, countOfOpponentCardsToDealTogether)
    if (cardIndex < 15 + numberOfDealingsDoneTogether) {
        return side
    } else {
        if (cardCount % 2 === 0 && cardIndex % 2 === 0) {
            return side
        } else if (cardCount % 2 !== 0 && cardIndex % 2 !== 0) {
            return side
        } else {
            return side === 'right' ? 'left' : 'right'
        }
    }
}


export const getComputerCardSolitaireLocation = (cardIndex, scalingUnit, spacing) => {
    const unitHeight = 1.7 * scalingUnit
    const origoY =  0.5 * unitHeight

    let positionX = spacing
    switch (cardIndex) {
    case 14: case 13: case 11: case 8: case 4:
        positionX += 1 / 6 * scalingUnit
        break
    case 12: case 10: case 7: case 3:
        positionX += (2 / 6  + 1)* scalingUnit
        break
    case 9: case 6: case 2:
        positionX +=  (3 / 6 + 2) * scalingUnit
        break
    case 5: case 1:
        positionX +=  (4 / 6 + 3) * scalingUnit
        break
    default:
        positionX +=  (5 / 6 + 4) * scalingUnit
    }

    let positionY = 0
    switch (cardIndex) {
    case 4: case 3: case 2: case 1: case 0:
        positionY = origoY + (4 * 0.125) * unitHeight
        break
    case 8: case 7: case 6: case 5:
        positionY = origoY + (3 * 0.125) * unitHeight
        break
    case 11: case 10: case 9:
        positionY = origoY + (2 * 0.125) * unitHeight
        break
    case 13: case 12:
        positionY = origoY + (1 * 0.125) * unitHeight
        break
    default:
        positionY = origoY
    }
    return { x: positionX, y: positionY }
}



export const getIndexOfCardToMoveAndTargetStack = (computerCards, occupancyData, topmostLeft, topmostRight) => {
    let visibleCardIndexes = []
    const sets = [[0], [5,1], [9,6,2], [12,10,7,3], [14,13,11,8,4]]
    let i = 0
    while (i < 5) {
        let j = 0
        let look = true
        while (look && j < sets[i].length) {
            if (sets[i][j] < computerCards.length) {
                const indexOfCardAtThisPosition = occupancyData[sets[i][j]]
                if (indexOfCardAtThisPosition !== -1) {
                    visibleCardIndexes.push(indexOfCardAtThisPosition)
                    look = false
                }
            }
            j++
        }
        i++
    }

    let cardAndTarget = { cardIndex: -1, stack: 'none' }
    let k = 0
    while (k < visibleCardIndexes.length) {
        let visibleCard = computerCards[visibleCardIndexes[k]]
        const leftOK =  valueIsOKforPlacingOntoStack('left', topmostLeft, topmostRight, visibleCard)
        const rightOK =  valueIsOKforPlacingOntoStack('right', topmostLeft, topmostRight, visibleCard)
        if (leftOK) {
            cardAndTarget = { cardIndex: visibleCardIndexes[k], target: 'left' }
            k = 100
        } else if (rightOK) {
            cardAndTarget = { cardIndex: visibleCardIndexes[k], target: 'right' }
            k = 100
        }
        k++
    }
    return cardAndTarget
}

export const getTargetPackLocation = (stack, scaleUnit, spacing) => {
    const locations = new Map([
        ['left', { x: spacing +(1/6 + 1 + 4/6) * scaleUnit, y: (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit }],
        ['right', { x: spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scaleUnit, y: (0.5 + 1.5 + 0.75) * 1.7 * scaleUnit }],
    ])
    return locations.get(stack)
}


export const getCardStatesAtStart = (cardCount) => {
    let cardStates = []
    for (let i = 0; i < cardCount; i++) {
        cardStates.push('movable')
    }
    return cardStates
}


export const getOccupancyDataAfterFirstDealingCards = (cardCount) => {
    let occupancies = []
    const number = Math.min(15, cardCount)
    for (let i = 0; i < number; i++) {
        occupancies.push(i)
    }
    return occupancies
}


export const isThereAPositionBelow = (cardIndex, occupancyData) => {
    let position
    for (let i = 0; i < occupancyData.length; i++) {
        if (occupancyData[i] === cardIndex) {
            position = i
        }
    }
    if (position < 5) {
        return false
    } else {
        return true
    }
}

export const getPlacementValidity = (card, targetStack, topmostStuff) => {
    if (targetStack === 'left') {
        return valueIsOKforPlacingOntoStack('left', topmostStuff.valueLeft, topmostStuff.valueRight, card)
    } else {
        return valueIsOKforPlacingOntoStack('right', topmostStuff.valueLeft, topmostStuff.valueRight, card)
    }
}

export const handleCardStateChanges = (cardsAndNewStates, cardStates, setCardStates) => {
    const updatedCardStates = [...cardStates]
    for (let i = 0; i < cardsAndNewStates.length; i++) {
        updatedCardStates[cardsAndNewStates[i].index] = cardsAndNewStates[i].newState
    }
    setCardStates(updatedCardStates)
}

export const handleOccupancyDataChanges = (cardIndex, action, positionToOccupy, occupancyData, setOccupancyData) => {
    let updatedOccupancyData = [...occupancyData]
    let locationToFree
    for (let j = 0; j < updatedOccupancyData.length; j++) {
        if (updatedOccupancyData[j] === cardIndex) {
            locationToFree = j
        }
    }
    updatedOccupancyData[locationToFree] = -1
    if (action === 'occupy') {
        updatedOccupancyData[positionToOccupy] = cardIndex
    }
    setOccupancyData(updatedOccupancyData)
}

export const handleEmptyMoveOccupancyDataChanges = (cardMovedIndex, positionToOccupy, occupancyData, setOccupancyData) => {
    let updatedOccupancyData = [...occupancyData]
    let locationToFree
    for (let j = 0; j < updatedOccupancyData.length; j++) {
        if (updatedOccupancyData[j] === cardMovedIndex) {
            locationToFree = j
        }
    }
    updatedOccupancyData[locationToFree] = -1
    updatedOccupancyData[positionToOccupy] = cardMovedIndex
    setOccupancyData(updatedOccupancyData)
}

export const getCurrentPosition = (cardIndex, occupancyData) => {
    let position
    for (let i = 0; i < occupancyData.length; i++) {
        if (occupancyData[i] === cardIndex) {
            position = i
        }
    }
    return position
}

export const updateGameStackTopmostCard = (side, topmostStuff, card) => {
    if (side === 'left') {
        topmostStuff.changeLeft(card)
    } else {
        topmostStuff.changeRight(card)
    }
}


export const getEmptyPositionAndCardToMoveThere = (occupancyData, cards) => {
    let firstEmptyPosition = -1
    let keepLooking = true
    for (let i = 0; i < occupancyData.length && keepLooking; i++) {
        if (occupancyData[i] === -1) {
            firstEmptyPosition = i
            keepLooking = false
        }
    }
    const visibleCardToMoveIndex = getVisibleCardToMoveIndex(occupancyData, cards)
    return { emptyPosition: firstEmptyPosition, cardToMoveIndex: visibleCardToMoveIndex }
}

const getVisibleCardToMoveIndex = (occupancies, cards) => {
    let visibleCardIndex = -1
    const sets = [[5], [9,6], [12,10,7], [14,13,11,8]]
    let i = 0
    while (i < 4) {
        let j = 0
        let look = true
        while (look && j < sets[i].length) {
            if (sets[i][j] < cards.length) {
                const indexOfCardAtThisPosition = occupancies[sets[i][j]]
                if (indexOfCardAtThisPosition !== -1) {
                    visibleCardIndex = indexOfCardAtThisPosition
                    look = false
                }
            }
            j++
        }
        i++
    }
    return visibleCardIndex
}
