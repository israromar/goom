import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SideMenu from 'react-native-side-menu';
import BottomTabNavigation from './bottom_tab_navigation';
import Menu from '../screens/profile/menu';

export default class BottomTabNavigationWithSideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
    }
    toggleSideMenu() {
        console.log("btm---", this.state)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const menu = <Menu />;
        return (
            <SideMenu menuPosition="right" isOpen={this.state.isOpen} menu={menu}>
                <BottomTabNavigation navigation={this.props.navigation} />
            </SideMenu>
        )
    }
}
