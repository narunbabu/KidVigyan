import {Text, View, Image, ImageBackground, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../Styles';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
// import { styles } from "../Styles";
import {Child} from './Child';
import {Parent} from './Parent';
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
export const UserScreen = () => {
  const createUserTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, dor TEXT, class INTEGER, ischild BOOLEAN);',
      );
    });
    console.log(' users table created');
  };

  const createScoresTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Scores ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER, optype INTEGER, level INTEGER, start_time DATE, time_taken FLOAT, passed BOOLEAN );',
      );
    });
  };
  const deleteTable = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS ' + 'Users ');
    });
    console.log(' users table deleted');
  };
  const setUserData = async person => {
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

  useEffect(() => {
    // deleteTable();
    createUserTable();
    createScoresTable();

    getAll();
    // getData();

    // console.log('in use effect get state', Store.getState()['userReducer']);
  }, []);
  const getAll = () => {
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

  const getData = () => {
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

  // const storeData = async (obj) => {
  //   try {
  //     await AsyncStorage.setItem("users", JSON.stringify(obj));
  //     console.log("Data saving done");
  //   } catch (e) {
  //     console.log("Data not set");
  //     // saving error
  //   }
  // };

  const removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  // removeItemValue('users');
  var users = {parent: {}, children: []};

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
  var date = new Date();
  const [uid, setUid] = useState(0);
  const [dob, setDob] = useState('');
  const [dor, setDor] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [pdob, setpDob] = useState('');
  const [pdor, setpDor] = useState('');
  const [pname, setpName] = useState('');
  var userchild = {
    id: uid,
    name: name,
    dob: dob,
    sclass: value,
    dor: dor,
    ischild: true,
  };
  var parent = {
    id: 0,
    name: pname,
    dob: pdob,
    sclass: 99,
    dor: pdor,
    ischild: false,
  };
  const storeData = () => {
    try {
      console.log(parent, userchild);
      setUserData(parent);
      setUserData(userchild);
      console.log('Data saving done');
    } catch (e) {
      console.log('Data not set');
      // saving error
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={{flex: 1, padding: 5}}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"></Image>
      <Text>{allusers}</Text>

      <Text style={{alignSelf: 'center', fontSize: 30, color: '#4ce071'}}>
        Welcome to Completekid
      </Text>

      <Parent
        pname={''}
        pdob={''}
        pdor={''}
        setpDob={setpDob}
        setpDor={setpDor}
        setpName={setpName}
      />
      <Child
        uid={1}
        name={''}
        dob={''}
        value={''}
        dor={''}
        setUid={setUid}
        setDob={setDob}
        setDor={setDor}
        setName={setName}
        setValue={setValue}
      />

      <View style={styles.fixToText}>
        <Button
          style={styles.btn}
          title="Register"
          onPress={() => {
            users.children.push(userchild);
            users.parent = parent;
            console.log(users);
            storeData(users);
          }}
        />
      </View>
    </ImageBackground>
  );
};
