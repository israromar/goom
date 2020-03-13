// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
]

const MenuComponent = (
    <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
        <List containerStyle={{ marginBottom: 20 }}>
            {
                list.map((item, i) => (
                    <ListItem
                        roundAvatar
                        onPress={() => console.log(item.avatar_url)}
                        avatar={{ uri: item.avatar_url }}
                        key={i}
                        title={item.name}
                        subtitle={item.subtitle} />
                ))
            }
        </List>
    </View>
)

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                }
            ]
        }
    }
    
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
                <List containerStyle={{ marginBottom: 20 }}>
                    {
                        this.state.list.map((item, i) => (
                            <ListItem
                                roundAvatar
                                onPress={() => console.log(item.avatar_url)}
                                avatar={{ uri: item.avatar_url }}
                                key={i}
                                title={item.name}
                                subtitle={item.subtitle} />
                        ))
                    }
                </List>
            </View>
        );
    }
}

// SideMenu.propTypes = {
//     navigation: PropTypes.object
// };

export default SideMenu;