import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15,
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    icon: {
        marginHorizontal: 2,
        marginLeft: 1,
    },
    input: {
        flex: 0.9,
        padding: 5,
        marginHorizontal: 3,
    }
});

export default styles;