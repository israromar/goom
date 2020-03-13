import React, {Component} from 'react';
import Search from '../../components/search';

class SearchScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Search {...this.props} />
        );
    }
}

export default SearchScreen;