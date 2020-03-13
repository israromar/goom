import React, { Fragment } from 'react';
import UserProfileScreenComp from '../../components/user_profile';

class UserProfileScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <UserProfileScreenComp {...this.props} />
        )
    }
}

export default UserProfileScreen;