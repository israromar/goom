import React, { Component } from 'react';
import EditProfileComp from '../../components/edit_profile';

class EditProfileScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <EditProfileComp {...this.props} />
        );
    }
}

export default EditProfileScreen;