
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
        const toLeftOrRightStack = toLeftOrRightGameStackInSingleCardDealing(cardIndex, cardCount)
        if (toLeftOrRightStack === 'right') {
            const rightPackPositionX = spacing + (1/6 + 1 + 4/6 + 1 + 2/6) * scalingUnit
            return { x: rightPackPositionX, y: positionY }
        } else {
            const leftPackPositionX = spacing + (1/6 + 1 + 4/6) * scalingUnit
            return { x: leftPackPositionX, y: positionY }
        }
    }

}


export const toLeftOrRightGameStackInSingleCardDealing = (cardIndex, playerCardCount) => {
    const countOfPlayerCardsToDeal = playerCardCount - 15 > 0 ? playerCardCount - 15 : 0
    const computerCardCount = 52 - playerCardCount
    const countOfComputerCardsToDeal = computerCardCount - 15 > 0 ? computerCardCount - 15 : 0
    const numberOfBothPlayersDealCards = Math.min(countOfPlayerCardsToDeal, countOfComputerCardsToDeal)
    if (cardIndex < 15 + numberOfBothPlayersDealCards) {
        return 'right'
    } else {
        if (computerCardCount % 2 === 0 && cardIndex% 2 === 0) {
            return 'right'
        } else {
            return 'left'
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


export const getGameStackForDealingSingleCard = (cardIndex, cardCount) => {

}