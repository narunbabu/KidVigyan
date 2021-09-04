import {
  Image,
  ImageBackground,
  Button,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import {styles} from './Styles';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
import Mytextinput from './MyTextInput';
import Mytext from './MyText';
import MyButton from './MyButton';
import {BackgroundColor} from 'chalk';
import HidableView from './HidableView';
// import { styles } from "../Styles";
// import {Child} from './Child';
// import {Parent} from './Parent';
// import { green100 } from 'react-native-paper/lib/typescript/styles/colors';
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
const UserHomeScreen = () => {
  const createUserTable = db => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, dor TEXT, class TEXT, ischild BOOLEAN);',
      );
    });
    console.log(' users table created');
  };

  const createScoresTable = db => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Scores ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER, optype INTEGER, level INTEGER, start_time DATE, time_taken FLOAT, passed BOOLEAN );',
      );
    });
  };
  const deleteTable = db => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS ' + 'Users ');
    });
    console.log(' users table deleted');
  };
  const setUserData = async (db, person) => {
    if (person.name.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            // 'INSERT INTO Users (name, dob ) VALUES (?,?)',
            'INSERT INTO Users (name , dob , dor , class , ischild ) VALUES (?,?,?,?,?)',
            [
              person.name,
              person.dob.toJSON(),
              person.dor.toJSON(),
              person.sclass,
              person.ischild,
            ],
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [allusers, setAllusers] = useState('initial');

  // useEffect(() => {
  //   // deleteTable();
  //   createUserTable(db);
  //   createScoresTable(db);

  //   getAll(db);
  //   // getData();

  //   // console.log('in use effect get state', Store.getState()['userReducer']);
  // }, []);

  const getAll = db => {
    console.log('*******************start get all');
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
          console.log('results.rows.length ', results.rows.length);
          var len = results.rows.length;
          console.log('results.rows.length ', results.rows.length);
          if (len > 0) {
            var allusers = '';
            for (let i = 0; i < len; i++) {
              allusers += results.rows.item(i).name + ', ';
            }
            console.log(allusers);

            setAllusers(allusers);
          }
        });
      });
    } catch (error) {
      console.log('error in set');
      console.log(error);
    }
    console.log('*******************end get all');
  };

  const getData = db => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id,name, dob, ischild FROM Users',
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              var allusers = '';
              for (let i = 0; i < len; i++) {
                allusers += results.rows.item(i).name + ', ';
              }
              // navigation.navigate('Home');
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  // const storeData = () => {
  //   try {
  //     console.log(user);
  //     setUserData(user);
  //     // setUserData(userchild);
  //     console.log('Data saving done');
  //   } catch (e) {
  //     console.log('Data not set');
  //     // saving error
  //   }
  // };

  // const RegistrationComponent = ({tohide, setAdduser}) => {

  const ClassComp = ({hide}) => {
    if (hide) {
      return null;
    } else {
      return (
        <>
          {/* <Text style={styles.label}>Class</Text> */}
          <View style={styles.dropdown}>
            <DropDownPicker
              placeholder="Select an item"
              // style={{width: '60%', alignSelf: 'auto'}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </>
      );
    }
  };

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Under KG', value: 1},
    {label: '1st Class', value: 2},
    {label: '2nd Class', value: 3},
    {label: '3rd Class', value: 4},
    {label: '4th Class', value: 5},
  ]);

  let data = [
    {
      value: 'Under KG',
    },
    {
      value: '1st Class',
    },
    {
      value: '2nd Class',
    },
    {
      value: '3rd Class',
    },
    {
      value: '4th Class',
    },
  ];

  const [isparent, setIsparent] = useState(true);

  // var date = new Date();
  const [dob, setDob] = useState(new Date('2016-07-03'));
  // const [dor, setDor] = useState(new Date());
  const [name, setName] = useState('');
  const [value, setValue] = useState(0); //Class of student
  const [adduser, setAdduser] = useState(true); //Class of student
  var person = {
    id: 0,
    name: name,
    dob: dob,
    sclass: value,
    dor: new Date(),
    ischild: !isparent,
  };
  const register_user = () => {
    // users.children.push(userchild);
    // users.parent = parent;
    console.log(person);
    // storeData(users);
    setUserData(db, person);
  };

  // if (tohide) {
  //   return null;
  // } else {
  //   return (

  //     );
  //   }
  // };

  return (
    <ImageBackground
      source={require('../../assets/bg-colorvariant.png')}
      style={{flex: 1, padding: 5}}>
      {/* <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <Text style={{alignSelf: 'center', fontSize: 30, color: '#4ce071'}}>
        Welcome to Completekid
      </Text>

      <SafeAreaView style={{flex: 1}}>
        {/* <View style={{flex: 1, backgroundColor: 'white'}}> */}
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <MyButton
              title="Add User"
              tohide={!adduser}
              customClick={() => setAdduser(false)}
            />
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  onChangeText={text => setName(text)}
                />
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <RadioButton
                    value="parent"
                    status={isparent ? 'checked' : 'unchecked'}
                    onPress={() => setIsparent(true)}
                  />
                  <Text style={styles.label}>Parent</Text>
                  <RadioButton
                    value="child"
                    status={!isparent ? 'checked' : 'unchecked'}
                    onPress={() => setIsparent(false)}
                  />
                  <Text style={styles.label}>Child</Text>
                </View>
              </KeyboardAvoidingView>
              <Text style={styles.label}>Date of Birth</Text>
              <DatePicker
                style={styles.date}
                date={new Date('2016-07-03')}
                mode={'date'}
                onDateChange={date => {
                  setDob(date);
                }}
              />

              {/* <View style={styles.dropdown}> */}
              {/* <Dropdown
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                /> */}

              <View style={styles.dropdown}>
                <Dropdown
                  // ref={this.nameRef}

                  value={value}
                  onChangeText={value => setValue(value)}
                  label="Class"
                  data={data}
                />
              </View>
              {/* </View> */}
            </View>
            <MyButton title="Submit" customClick={register_user} />
            {/* <RegistrationComponent tohide={adduser} setAdduser={setAdduser} />
             */}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* <Text>{allusers}</Text> */}
    </ImageBackground>
  );
};

export default UserHomeScreen;
