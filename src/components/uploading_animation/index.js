//import liraries
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import colors from '../../styles/colors';

// create a component
const UploaderAnimation = ({ msg }) => {
    return (
        <View style={styles.container}>
            <View style={{ margin: 0 }}><Text style={styles.textDriving}>{msg}</Text></View>
            <TouchableOpacity>
                <View>
                    {/* <Text>{msg}</Text> */}
                    <AnimatedEllipsis
                        numberOfDots={3}
                        minOpacity={0.4}
                        animationDelay={150}
                        style={{
                            color: '#94939b',
                            fontSize: 100,
                            letterSpacing: -15,
                        }} />
                </View>
            </TouchableOpacity>
        </View>
    );
}; 

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
});

//make this component available to the app
export default UploaderAnimation;
