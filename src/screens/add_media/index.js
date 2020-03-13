import React, { Component } from 'react';
import AddMediaComponent from '../../components/add_media';
import DataForm from '../../components/data_form';
class AddMediaScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <DataForm {...this.props} />
        );
    }
}

export default AddMediaScreen;