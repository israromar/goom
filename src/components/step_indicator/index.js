//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const labels = ["Scan DL", "Verify", "Scan FR QR", "Validate"];
const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.blue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.blue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.blue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.blue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: colors.black,
    stepIndicatorLabelFinishedColor: colors.black,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.blue
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
        name: 'autorenew',
        color: stepStatus === 'finished' ? '#ffffff' : position === 0 ? colors.blue : colors.Grey,
        size: 25
    }
    switch (position) {
        case 0: {
            iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-1'
            iconConfig.color = stepStatus === 'finished' ? '#ffffff' : stepStatus === 'current' ? colors.blue : colors.Grey
            break
        }
        case 1: {
            iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-2'
            iconConfig.color = stepStatus === 'finished' ? '#ffffff' : stepStatus === 'current' ? colors.blue : colors.Grey
            break
        }
        case 2: {
            iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-3'
            iconConfig.color = stepStatus === 'finished' ? '#ffffff' : stepStatus === 'current' ? colors.blue : colors.Grey
            break
        }
        case 3: {
            iconConfig.name = stepStatus === 'finished' ? 'check' : 'numeric-4'
            iconConfig.color = stepStatus === 'finished' ? '#ffffff' : stepStatus === 'current' ? colors.blue : colors.Grey
            break
        }
        default: {
            break
        }
    }
    return iconConfig
}

// create a component
class StepIndicatorComp extends Component {
    constructor() {
        super();
    }

    renderStepIndicator = params => (
        <MaterialCommunityIcons {...getStepIndicatorIconConfig(params)} />
    )

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <StepIndicator
                    renderStepIndicator={this.renderStepIndicator}
                    customStyles={customStyles}
                    currentPosition={this.props.currentPosition}
                    labels={labels}
                    stepCount={4}
                />
            </View>
        );
    };
}

//make this component available to the app
export default StepIndicatorComp;
