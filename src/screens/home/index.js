import React, {Component} from 'react';
import HomeComponent from '../../components/home';
import HomeComp from '../../components/home/home';
class HomeScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
           <HomeComponent {...this.props}/>
        );
    }
}

export default HomeScreen;