import React, { useState, useImperativeHandle } from 'react'
import { View } from 'react-native'
import ControllablePlayerCard from './ControllablePlayerCard'


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
                setIndexDealNext(indexDealNext + 1)
            }, 2000)
        }
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
                    />
                )
            })}
        </View>
    )
})


export default PlayerCards

