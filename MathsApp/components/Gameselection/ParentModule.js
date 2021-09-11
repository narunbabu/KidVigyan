import React from 'react';
import {View, Text} from 'react-native';
import UserTab from './UserTab';

const ParentModule = ({userdata, stackdata}) => {
  //Read score board and put up the summary

  return (
    <View style={{flex: 1}}>
      <View style={{height: '80%'}}>
        <UserTab userdata={userdata} />
      </View>
      <View style={{height: '20%'}}>
        <Text>Set Stack</Text>
      </View>
    </View>
  );
};

export default ParentModule;
