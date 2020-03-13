//import liraries
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import colors from '../../styles/colors';
// create a component
const Button = ({ btnType, btnText, btnFlag, SvgImgSrc, _onPressButton }) => {
    {/* <View style={[{ marginTop: 0, marginHorizontal: 8, }, styles.buttonContainer]}></View> */ }
    return (
        <View>
            <TouchableOpacity
                style={btnType === 'square' ? styles.squareButton : styles.defaultButton}
                onPress={() => _onPressButton(btnFlag)}
            >
                {btnType === 'square' && <SvgImgSrc fill={colors.white} width={50} height={60} />}
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    buttonContainer: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    defaultButton: {
        backgroundColor: colors.blue,
        height: 45,
        display: 'flex',
        minWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff'
    },
    squareButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        shadowColor: colors.blue,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingLeft: 10,
        paddingRight: 10,
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingBottom: 13,
        backgroundColor: colors.blue,
        height: 130,
        width: 140,
        borderRadius: 25,
        marginLeft: 8,
        marginRight: 8
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.white
    }
});

//make this component available to the app
export default Button;
