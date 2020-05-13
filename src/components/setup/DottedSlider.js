import React, { useState, useImperativeHandle } from 'react'
import {  View, StyleSheet } from 'react-native'
import SmallDot from './SmallDot'
import LargeDot from './LargeDot'




const DottedSlider = React.forwardRef((props, ref) => {

    const scaleUnit = props.scaleUnit
    const index = props.optionCount - 1
    const [selectedValue, setSelectedValue] = useState(1)
    const dotViewWidth = 6 * scaleUnit / 30

    const handleSelectionChanged = (newValue) => {
        let startValue = selectedValue
        const changes = Math.max(newValue - selectedValue, selectedValue - newValue)
        function changeUpOrDown(direction) {
            return setInterval(() => {
                if (direction === 'up' && startValue < newValue) {
                    startValue++
                    setSelectedValue(startValue)
                } else if (direction === 'down' && newValue < startValue) {
                    startValue--
                    setSelectedValue(startValue)
                }
            }, 180 / changes)
        }
        let changeInterval
        if (selectedValue < newValue) {
            changeInterval = changeUpOrDown('up')
        } else if (selectedValue > newValue) {
            changeInterval = changeUpOrDown('down')
        }
        setTimeout(() => {
            clearInterval(changeInterval)
        }, 180 * changes)
    }

    const getSelectedValue = () => {
        return (selectedValue - 1) / 6 + 1
    }
    useImperativeHandle(ref, () => {
        return { getSelectedValue }
    })


    const displayDotSlider = () => {
        let dots = []
        for (let i = 1; i <= index * 6 + 1; i++) {
            if ((i - 1) % 6 !== 0) {
                dots.push(
                    <SmallDot
                        key={i}
                        value={selectedValue}
                        dotViewWidth={dotViewWidth}
                        dotNumber={i}
                    />)
            } else {
                dots.push(
                    <LargeDot
                        key={i}
                        value={selectedValue}
                        dotViewWidth={dotViewWidth}
                        handleSelectionChanged={handleSelectionChanged}
                        dotNumber={i}
                    />)
            }
        }
        return dots
    }

    return (
        <View style={styles.container}>
            <View style={styles.dotSliderView}>
                {displayDotSlider()}
            </View>
        </View>

    )


})

export default DottedSlider


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 50,
    },
    instructionText: {
        color: '#B9CC3F',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    dotSliderView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

