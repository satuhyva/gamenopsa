import React from 'react'
import {  View } from 'react-native'

const SmallDot = ({ value, dotViewWidth, dotNumber }) => {

    const changingOpacity = (value >= dotNumber) ? 1 : 0.2

    const styleOuterView = {
        width: dotViewWidth,
        height: dotViewWidth * 1.4,
        justifyContent: 'center',
        alignItems: 'center',
    }
    const styleInnerView = {
        width: 4,
        height: 4,
        opacity: changingOpacity,
        backgroundColor: '#B9CC3F',
        borderRadius: 3,
    }


    return (
        <View style={styleOuterView}>
            <View style={styleInnerView}/>
        </View>
    )
}

export default SmallDot

