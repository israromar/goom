import React, {Component} from 'react';
import GoogleMapComponent from '../../components/google_map';

class SearchScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <GoogleMapComponent {...this.props} />
        );
    }
}

export default SearchScreen;