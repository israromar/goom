import React from 'react';
import {View, Text} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

export default class IconWithBadge extends React.Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 30, height: 24, marginVertical:10, marginHorizontal:10 }}>
                <SimpleLineIcon name={name} size={size} color={color} />
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -2,
                            top: -5,
                            backgroundColor: 'red',
                            borderRadius: 50,
                            width: 19,
                            height: 19,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'normal' }}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}