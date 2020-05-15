
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
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 6: case 7: case 8:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 10: case 11:
        if (cardIndex + 4 > cardCount) {
            flip = true
        }
        break
    case 13:
        if (cardIndex + 4 > cardCount) {
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


export const getPlayerCardLocationAfterDealing = (cardIndex, scalingUnit, spacing, cardCount) => {

    if (cardIndex < 15) {
        return getPlayerCardSolitaireLocation(cardIndex, scalingUnit, spacing)
    } else {
        const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
        const toLeftOrRightStack = toLeftOrRightGameStackInSingleCardDealing('right', cardIndex, cardCount)
        if (toLeftOrRightStack === 'right') {
            const rightPackPositionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scalingUnit
            return { x: rightPackPositionX, y: positionY }
        } else {
            const leftPackPositionX = spacing + (1/6 + 1 + 4/6) * scalingUnit
            return { x: leftPackPositionX, y: positionY }
        }
    }

}


export const toLeftOrRightGameStackInSingleCardDealing = (side, cardIndex, cardCount) => {
    const countOfCardsToDeal = cardCount - 15 > 0 ? cardCount - 15 : 0
    const opponentCardCount = 52 - cardCount
    const countOfComputerCardsToDeal = opponentCardCount - 15 > 0 ? opponentCardCount - 15 : 0
    const numberOfBothPlayersDealCards = Math.min(countOfCardsToDeal, countOfComputerCardsToDeal)
    if (cardIndex < 15 + numberOfBothPlayersDealCards) {
        return side
    } else {
        if (opponentCardCount % 2 === 0 && cardIndex% 2 === 0) {
            return side
        } else {
            return side === 'right' ? 'left' : 'right'
        }
    }
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


export const whatEmptyPositionWasReleasedOn = (releaseX, releaseY, scaleUnit, spacing, emptyPositions) => {

    const positionsX = []
    for (let i = 0; i < 5; i++) {
        positionsX.push(spacing + (1/6 + i * (1 + 1/6)) * scaleUnit)
    }
    const positionY = (0.5 + 1.5 + 0.75 + 1 + 0.75) * 1.7 * scaleUnit

    let emptyPosition = 'none'
    for (let i = 0; i < 5; i++) {
        if (emptyPositions[i]) {
            if ((releaseX > positionsX[i] && releaseX < positionsX[i] + scaleUnit)) {
                if ((releaseY > positionY && releaseY < positionY + scaleUnit * 1.7)) {
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


export const getComputerCardLocationAfterDealing = (cardIndex, scalingUnit, spacing, cardCount) => {

    if (cardIndex < 15) {
        return getComputerCardSolitaireLocation(cardIndex, scalingUnit, spacing)
    } else {
        const positionY = (0.5 + 1.5 + 0.75) * 1.7 * scalingUnit
        const toLeftOrRightStack = toLeftOrRightGameStackInSingleCardDealing('left', cardIndex, cardCount)
        if (toLeftOrRightStack === 'right') {
            const rightPackPositionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scalingUnit
            return { x: rightPackPositionX, y: positionY }
        } else {
            const leftPackPositionX = spacing + (1/6 + 1 + 4/6) * scalingUnit
            return { x: leftPackPositionX, y: positionY }
        }
    }

}



export const getComputerCardSolitaireLocation = (cardIndex, scalingUnit, spacing) => {
    const unitHeight = 1.7 * scalingUnit
    const origoY =  0

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