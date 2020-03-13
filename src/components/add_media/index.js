import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

const AddMedia = (props) => (
    <View style={styles.container}>
        <Icon name='search' size={16} color='gray' style={styles.icon}/>
        <Text>Upload picture or video!</Text>
    </View>
);
export default AddMedia;