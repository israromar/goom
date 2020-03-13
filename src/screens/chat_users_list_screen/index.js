import React, { Component } from 'react';
import ChatUserListComponent from '../../components/chat_users_list';

class ChatUsersListScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ChatUserListComponent {...this.props} />
        );
    }
}

export default ChatUsersListScreen;