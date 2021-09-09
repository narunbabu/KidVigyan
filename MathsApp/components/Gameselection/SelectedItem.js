import React, {useState, useEffect} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {levels} from '../../Data/Data';

`insert or replace into Book (ID, Name, TypeID, Level, Seen) values (
  (select ID from Book where Name = "SearchName"),
  "SearchName",
   5,
   6,
   (select Seen from Book where Name = "SearchName"));`;

const SelectedItem = ({item, myFunc}) => {
  //   const [level, setLevel] = useState(1);
  //   const [num_problems, setNum_problems] = useState(5);

  //   item['num_problems'] = num_problems;
  return (
    <View style={styles.card}>
      {/* <View
        style={{
          flexDirection: 'column',
          flex: 1,
          //   justifyContent: 'space-between',
        }}> */}
      <Avatar.Text size={30} label={item.operator} color={Colors.red200} />
      {/* <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}> */}
      <Text style={styles.level}>Level: {item.level}</Text>
      <Text style={styles.probs}>Probs: {item.num_problems}</Text>
      {/* </View> */}

      <TouchableHighlight
        style={styles.deletefromstack}
        // onPress={() => console.log('clicked')}
        onPress={() => myFunc(item)}>
        <Text>x</Text>
      </TouchableHighlight>

      {/* <CheckBox isChecked={item.isChecked} onClick={() => myFunc(item)} /> */}
      {/* </View> */}
    </View>
  );
};

export default SelectedItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    padding: 1,
    height: 100,
    width: 60,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  level: {
    backgroundColor: 'skyblue',
    fontSize: 12,
    height: 30,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  probs: {
    backgroundColor: '#ce79e8',
    height: 30,
    fontSize: 12,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  deletefromstack: {
    position: 'absolute',
    width: 18,
    height: 18,
    right: 0,
    top: 0,
    // marginTop: 0,
    paddingTop: -20,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
});
