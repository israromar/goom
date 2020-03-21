import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { DataTableIcon, TagPostIcon } from '../../assets/images';


export default class Tagged extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} /> */}
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 100, height: 100, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'black', borderRadius: 100
        }} >
          {/* <Icon style={{ fontSize: 70, color: 'black' }} type="MaterialIcons" name="perm-contact-calendar" /> */}
          <TagPostIcon fill="#000000" style={{ marginTop: 15 }} width={105} height={105} />

        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center', backgroundColor: 'transparent'
        }}>
          <Text style={{ paddingTop: 25, backgroundColor: 'transparent', color: 'black', fontSize: 25 }}>Photos and Videos of you</Text>
          <Text style={{ textAlign: 'center', lineHeight: 20, paddingVertical: 20, paddingHorizontal: 30, backgroundColor: 'transparent', color: 'grey', fontSize: 14 }}>When people tag you in photos and videos, they'll appear here.</Text>
        </View>
      </View>
    );
  }
}
