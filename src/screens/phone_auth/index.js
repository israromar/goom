import React, {Component} from 'react';
import PhoneAuthComponent from '../../components/phone_auth';

class PhoneAuthScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
           <PhoneAuthComponent {...this.props}/>
        );
    }
}

export default PhoneAuthScreen;