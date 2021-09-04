import {
  Image,
  Text,
  ImageBackground,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  TouchableHighlight,
  RoundButton,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import MyButton from './MyButton';
import RegistrationComponent from './RegistrationComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {styles} from './Styles';
import {FlatList, StyleSheet, StatusBar, Dimensions} from 'react-native';
import GamesScreen from '../GameScreen';
import {FAB} from 'react-native-paper';
import {
  db,
  user,
  getData,
  createTable,
  deleteTable,
  models,
} from '../SqlFunctions';

// const styles = StyleSheet.create({

// });
var person = {
  id: null,
  name: '',
  dob: '',
  sclass: '',
  dor: '',
  coins: 0,
  ischild: null,
};

const tableobject = {Users: user};
const UserHomeScreen = ({navigation}) => {
  const [userdata, setUserdata] = useState([
    {id: 0, name: 'No user data in Database'},
  ]);
  const [parentdata, setParentdata] = useState('');

  useEffect(() => {
    // deleteTable(db, tableobject);
    createTable(db, models);
    // createScoresTable(db);
    try {
      getData(db, 'Users', ['id', 'name', 'dob', 'ischild'], setUserdata);
    } catch (e) {
      createTable(db, models);
    }

    console.log('in use effect ', userdata);
    userdata.filter(k => !k.ischild).length > 0
      ? setParentdata(userdata.filter(k => !k.ischild)[0])
      : null;
  }, []);

  var todo = [
    {
      childid: 0,
      arith_type: '',
      level: 0,
      n_of_probs: 20,
      set_date: 0,
      target_date: 0,
    },
  ];
  var score = [
    {
      childid: 0,
      arith_type: '',
      level: 0,
      start_time: 0,
      end_time: 0,
      passed: false,
    },
  ];

  const [adduser, setAdduser] = useState(true); //Class of student
  const Item = ({item}) =>
    item.ischild ? (
      <TouchableHighlight
        style={styles.item}
        // onPress={() => console.log('clicked')}
        onPress={() =>
          navigation.navigate('GamesScreen', {
            user: item,
          })
        }>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableHighlight>
    ) : null;
  const renderItem = ({item}) => <Item item={item} />;
  // const renderItem1 = ({item}) => <Item name={item.name} />;
  // getAll(db);

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg-colorvariant.png')}
        style={{flex: 1, padding: 5}}>
        {/* <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}
        {/* <Text style={{alignSelf: 'center', fontSize: 30, color: '#4ce071'}}>
        Welcome to Completekid
      </Text> */}

        {/* <SafeAreaView style={{flex: 1, alignSelf: 'center', height: 550}}> */}
        <FlatList
          style={{flex: 1}}
          data={userdata}
          // data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
        <RegistrationComponent
          tohide={adduser}
          setAdduser={setAdduser}
          setUserdata={setUserdata}
        />

        {/* <MyButton
            title="RegistrationComponent"
            customClick={() =>
              navigation.navigate('RegistrationComponent', {tohide: adduser})
            }
          /> */}
        {/* </ScrollView> */}

        {/* </View> */}
        {/* </SafeAreaView> */}
        <MyButton
          title="Add User"
          tohide={!adduser}
          customClick={() => setAdduser(!adduser)}
        />

        {/* <Text>{allusers}</Text> */}
      </ImageBackground>
      {parentdata ? (
        <TouchableHighlight
          style={styles.fab}
          onPress={() => {
            console.log(' clicked on parent');
            return navigation.navigate('GamesScreen', {
              user_id: parentdata.id,
              user_name: parentdata.name,
              ischild: parentdata.ischild,
            });
          }}>
          <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 10}}>
            Parent
          </Text>
        </TouchableHighlight>
      ) : null}
    </>
  );
};

// export default UserHomeScreen;
export default UserHomeScreen;
