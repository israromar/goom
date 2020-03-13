import React, {Component} from 'react';
import SignInComp from '../../components/signin';

class SignInScreen extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
           <SignInComp {...this.props} />
        );
    }
}

export default SignInScreen;