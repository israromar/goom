// //import liraries
// import React from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     ScrollView
// } from 'react-native';
//
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import Button from '../../components/button';
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import colors from '../../styles/colors';
//
// // create a component
// const Scanner = ({ onSuccess, _onPressButton, reactivateScanner }) => {
//     if (reactivateScanner) {
//         Scanner.scanner.reactivate();
//     }
//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.cameraContainer}>
//                     <QRCodeScanner
//                         onRead={onSuccess}
//                         showMarker={true}
//                         ref={(node) => { Scanner.scanner = node }}
//                     />
//                 </View>
//                 <View style={[{ marginTop: 65, marginHorizontal: 8, }, styles.buttonContainer]}>
//                     <Button btnType={'default'} btnText={'Cancel'} btnFlag={'cancel'} _onPressButton={_onPressButton} />
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };
//
// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         display: 'flex',
//         justifyContent: 'flex-end',
//     },
//     scrollView: {
//         flexGrow: 1,
//         height: '100%',
//         backgroundColor: Colors.lighter,
//     },
//     cameraContainer: {
//         flex: 1,
//         marginTop: 60,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//     },
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1
//     },
//     button: {
//         backgroundColor: colors.blue,
//         height: 45,
//         display: 'flex',
//         minWidth: 300,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         borderRadius: 15,
//         borderWidth: 1,
//         borderColor: '#fff'
//     },
//     btnText: {
//         fontSize: 16,
//         color: colors.white
//     }
// });
//
// //make this component available to the app
// export default Scanner;
