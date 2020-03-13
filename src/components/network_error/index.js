//import liraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Wifi } from '../../assets';
import Button from '../../components/button';
import colors from '../../styles/colors';

// create a component
const NetworkError = ({ networkErrMsg, _onPressButton }) => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.badgeView}>
                    <Wifi fill={colors.red} width={140} height={140} style={styles.sectionTitle} />
                    <Text style={styles.titleText}>{networkErrMsg}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button btnType={'default'} btnText={'Try Again'} btnFlag={'try_again'} _onPressButton={_onPressButton} />
                <Button btnType={'default'} btnText={'Cancel'} btnFlag={'cancel'} _onPressButton={_onPressButton} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 20,
        color: colors.red
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
    badgeView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        height: '100%'
    },
    buttonContainer: {
        margin: 7,
        flex: 1,
        justifyContent: 'flex-end'
    },
    badgeView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'stretch',
        width: '100%',
        marginBottom: 30,
        marginTop: 30
    },
    sectionTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'stretch',
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 30
    }
});
//make this component available to the app
export default NetworkError;
