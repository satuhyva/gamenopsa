import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'



const Game = (props) => {

    return (
        <View>

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