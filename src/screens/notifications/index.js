import React, {Component} from 'react';
import NotificationComponent from '../../components/notifications';

class NotificationsScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <NotificationComponent {...this.props} />
        );
    }
}

export default NotificationsScreen;