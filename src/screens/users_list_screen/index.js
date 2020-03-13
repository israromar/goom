import React, { Component } from 'react';
import UsersListComponent from '../../components/users_list';

class UsersListScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <UsersListComponent {...this.props} />
        );
    }
}

export default UsersListScreen;