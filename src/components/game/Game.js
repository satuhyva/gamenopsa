import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

// const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').height
// const cardWidthIfScreenWidthIsUsed = screenWidth / 6
// const cardWidthIfScreenHeightIsUsed = screenHeight / ((0.5 + 1 + 0.75 + 1 + 0.75 + 1.5 + 0.5) * 1.7)
// const cardWidth = Math.min(cardWidthIfScreenWidthIsUsed, cardWidthIfScreenHeightIsUsed)
// const cardHeight = 1.7 * cardWidth
// const spacing = (screenWidth - 6 * cardWidth) / 2


const Game = (props) => {

    return (
        <View>
            <Text>GAME</Text>
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