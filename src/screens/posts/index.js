import React, { Component } from 'react';
import PostComponent from '../../components/posts';

class PostsScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PostComponent {...this.props} />
        );
    }
}

export default PostsScreen;