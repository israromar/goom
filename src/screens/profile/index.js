import React, { Fragment } from 'react';
import SideMenu from 'react-native-side-menu';
import ProfileScreenComp from '../../components/profile';
import Menu from './menu';

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
    }

    toggleSideMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const menu = <Menu  {...this.props} />;
        return (
            <SideMenu menuPosition="right" isOpen={this.state.isOpen} menu={menu}>
                <ProfileScreenComp {...this.props} toggleSideMenu={this.toggleSideMenu.bind(this)} />
            </SideMenu>
        )
    }
}

export default ProfileScreen;