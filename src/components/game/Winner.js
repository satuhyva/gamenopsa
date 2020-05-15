import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'


const Winner = (props) => {

    return (
        <View>
            <Text>Winner of the round:</Text>
            <Text>{props.winner}</Text>
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

const ConnectedWinner = connect(mapStateToProps, mapDispatchToProps)(Winner)

export default ConnectedWinner



