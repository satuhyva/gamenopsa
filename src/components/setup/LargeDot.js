import React from 'react'
import {  View, TouchableOpacity } from 'react-native'


const LargeDot = ({ value, dotNumber, dotViewWidth, handleSelectionChanged }) => {

    const changingOpacity = (value >= dotNumber) ? 1 : 0.2

    const styleOuterView = {
        width: dotViewWidth,
        height: dotViewWidth * 1.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        opacity: changingOpacity,
        borderColor: '#B9CC3F',
        borderRadius: dotViewWidth,
    }
    const styleInnerView = {
        width: 4,
        height: 4,
        backgroundColor: '#B9CC3F',
        borderRadius: 2.0,
    }


    return (
        <TouchableOpacity onPress={() => handleSelectionChanged(dotNumber)}>
            <View style={styleOuterView}>
                <View  style={styleInnerView}/>
            </View>
        </TouchableOpacity>
    )
}

export default LargeDot

