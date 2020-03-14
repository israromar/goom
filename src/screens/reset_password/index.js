import React, {Component} from 'react';
import ResetPassword from '../../components/reset_password';

class ResetPasswordScreen extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
           <ResetPassword {...this.props} />
        );
    }
}

export default ResetPasswordScreen;