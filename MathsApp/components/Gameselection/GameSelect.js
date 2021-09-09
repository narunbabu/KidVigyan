import React, {useState, useEffect} from 'react';
// import {Text, View, StyleSheet, FlatList, Button, Modal} from 'react-native';
import UserChecklist from './UserChecklist';
import {
  db,
  getDataWithextrafieldWithFilter,
  storeData,
} from '../../Functions/SqlFunctions';

import ModalDropdown from 'react-native-modal-dropdown';
import {
  Text,
  View,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Alert,
  SafeAreaView,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {levels} from '../../Data/Data';
import GameItem from './GameItem';
import SelectedItem from './SelectedItem';
import {operations} from '../../Data/Data';

const GameSelect = () => {
  const [selected, setSelected] = useState([]);
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    // async function loadDataAsync() {
    try {
      getDataWithextrafieldWithFilter(
        db,
        'Users',
        ['id', 'name', 'dob', 'ischild'],
        setUserdata,
        {isChecked: false}, //Extrafield to add
        {ischild: 1}, //Filter on
      );
    } catch (e) {
      console.warn(e);
    }
    // }
    // loadDataAsync();
  }, []);
  const storeStack = () => {
    checkStack() ? console.log(selected) : null;
  };

  const checkStack = () => {
    var usercheck = userdata.some(k => k.isChecked);
    var storecheck = selected.length > 0;
    if (usercheck && storecheck) return true;
    if (!usercheck && !storecheck) {
      Alert.alert('Please select atleast one user and one stack');
    } else {
      usercheck ? null : Alert.alert('Please select atleast one user');
      storecheck ? null : Alert.alert('Add atleast one stack');
    }
    return false;
  };

  const handleChange = item => {
    if (selected.length < 5) {
      item = {...item, id: selected.length};
      //   console.log('clicked handle change id', item);

      setSelected(selected => [...selected, item]);
    } else {
      Alert.alert(
        'Warning!',
        'Max operations allowed is 5. Delete existing ones to change',
      );
    }
    console.log('after add item,selected', item, selected);
  };

  const deleteItem = item => {
    let temp = selected.filter(operation => item.id != operation.id);
    setSelected(selected.filter(o => o.id != item.id));
    console.log('after delete ', selected);
  };

  //   let selected = operations.filter(operation => operation.isChecked);
  const renderItem = ({item}) => <GameItem item={item} myFunc={handleChange} />;
  const renderGridItem = ({item}) => (
    <SelectedItem item={item} myFunc={deleteItem} />
  );

  const renderFlatList = renderData => {
    return <FlatList data={renderData} renderItem={renderItem} />;
  };
  const renderGridList = renderGridData => {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={renderGridData}
          renderItem={({item}) => (
            <SelectedItem item={item} myFunc={deleteItem} />
          )}
          numColumns={5}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{height: '10%'}}>
        <UserChecklist userdata={userdata} setUserdata={setUserdata} />
      </View>
      <View style={{height: '60%'}}>{renderFlatList(operations)}</View>
      <Text style={styles.text}>Selected </Text>
      {console.log('selected in component', selected)}
      <View style={{height: '25%'}}>{renderGridList(selected)}</View>
      <View
        style={{height: '5%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight
          style={styles.addtostack}
          onPress={() => {
            storeStack();
          }}>
          <Text>Set Stack</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addtostack: {
    // position: 'absolute',
    width: 100,
    height: 40,
    marginTop: -30,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default GameSelect;
