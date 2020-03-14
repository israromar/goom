import React, { Component } from 'react';
import ChatViewComponent from '../../components/chat_view';
import ChatViewTwoComponent from '../../components/chat_view_two';
class ChatViewScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ChatViewComponent {...this.props} />
        );
    }
}

export default ChatViewScreen;