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
      <View style={{ marginTop: 2 }}>
        {this.props.data && this.props.data.length > 0 ? <FlatList
          numColumns={3}
          data={this.props.data}
          renderItem={({ item, index }) => this.props.renderItem(item, index)}
          keyExtractor={item => item.id}
        /> : <View style={{
          alignItems: 'center',
          justifyContent: 'center', backgroundColor: 'transparent'
        }}>
            <Text style={{ paddingTop: 25, backgroundColor: 'transparent', color: 'black', fontSize: 25 }}>Profile</Text>
            <Text style={{ textAlign: 'center', lineHeight: 20, paddingVertical: 20, paddingHorizontal: 30, backgroundColor: 'transparent', color: 'grey', fontSize: 14 }}>
              When you share photos and videos, they'll appear on your profile.
              </Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddMedia')}>
              <Text style={{ textAlign: 'center', paddingVertical: 0, paddingHorizontal: 30, color: '#008ae6', fontWeight: 'Normal', fontSize: 16 }}>
                Share your first photo or video
              </Text>
            </TouchableOpacity>
          </View>}

      </View>
    );
  }
}
