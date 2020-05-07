import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'



const Game = (props) => {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

    return (
        <View>
            <Text>gameeeeeeee</Text>
            <Text>{screenWidth.toString()}</Text>
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