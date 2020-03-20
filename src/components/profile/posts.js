import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data })
    }
  }

  componentDidUpdate() {
    console.log("posts didupdate: ", this.props)
  }

  render() {
    console.log("postsdata", this.props, this.state)
    return (
      <View style={{ height: '100%', backgroundColor: '' }}>
        {/* <Text> posts </Text> */}
        <FlatList
          numColumns={3}
          data={this.props.data}
          renderItem={({ item, index }) => this.props.renderItem(item, index)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
