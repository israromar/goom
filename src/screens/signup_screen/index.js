import React, {Component} from 'react';
import SignUpComp from '../../components/signup';

class SignUpScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
           <SignUpComp {...this.props}/>
        );
    }
}

export default SignUpScreen;