import React, {Component, useEffect} from 'react';
import {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DynamicTabView from 'react-native-dynamic-tab-view';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const UserTab = ({userdata}) => {
  const [defaultIndex, seDefaultIndex] = useState(0);
  const [childdata, setChilddata] = useState('');
  var colors = ['#d1e8e5', '#dfe8d1', '#e7d1e8', '#e8e7d1'];

  useEffect(() => {
    let temp = userdata
      .filter(e => e.ischild)
      .map(e => {
        e['title'] = e['name'];
        e['color'] = colors[e['id']];
        return e;
      });

    console.log('temp', temp);
    setChilddata(temp);
  }, []);

  _renderItem = (item, index) => {
    console.log('renderItem', index);
    return (
      <View key={item['id']} style={{backgroundColor: item['color'], flex: 1}}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  onChangeTab = index => {};

  return (
    <DynamicTabView
      data={childdata}
      renderTab={_renderItem}
      defaultIndex={defaultIndex}
      containerStyle={styles.container}
      headerBackgroundColor={'white'}
      headerTextStyle={styles.headerText}
      onChangeTab={onChangeTab}
      headerUnderlayColor={'blue'}
    />
  );
};

export default UserTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 16,
  },
  headerText: {
    color: 'black',
  },
  tabItemContainer: {
    backgroundColor: '#cf6bab',
  },
});
