import {
  Text,
  View,
  ImageBackground,
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
  getData,
  createTable,
  deleteTable,
  storeData,
  getDataWithextrafieldWithFilter,
} from '../../Functions/SqlFunctions';
import {user, models} from '../../Data/Models';

import ChildrenComp from './ChildrenComp';
import UserChecklist from '../Gameselection/UserChecklist';
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
var child_stack = {
  stack_id: 0,
  child_id: null,
  date: new Date().toJSON(),
};
var stack = {
  id: 0,
  user_id: 0,
  operation_id: 0,
  date: new Date().toJSON(),
  level: 1,
  parent_id: 0,
  num_problems: 20,
};
const tableobject = {Users: user};
const tablestackobject = {Stack: models['Stack']};
const UserHomeScreen = ({navigation}) => {
  const [adduser, setAdduser] = useState(true); //Class of student
  const [userdata, setUserdata] = useState([]); //{id: null, name: 'Notset', ischild: false},

  const [isstackdatadataloaded, setIsstackdatadataloaded] = useState(false);
  const [stackdata, setStackdata] = useState('');
  const [isuserdatadataloaded, setIsuserdatadataloaded] = useState(false);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      // createTable(db, models);
      // storeInitialStack();
      // deleteTable(db, tablestackobject);
      // createTable(db, models);
      //

      try {
        getData(
          db,
          'Stack',
          [
            'id',
            'user_id',
            'operation_id',
            'date',
            'level',
            'parent_id',
            'num_problems',
          ],
          setStackdata,
          // 'stack_id', //maxval_key
          'from userhomescreen Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        null;
      }
    }
    // loadDataAsync();
    setTimeout(() => loadDataAsync(), 20);
  }, []);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      // deleteTable(db, tablestackobject);
      // createTable(db, models);
      // storeInitialStack();

      try {
        getData(
          db,
          'Users',
          ['id', 'name', 'dob', 'ischild'],
          setUserdata,
          'from userhomescreen',
        );
      } catch (e) {
        createTable(db, models);
      }
    }

    setTimeout(() => loadDataAsync(), 20);
    if (userdata) {
      setIsuserdatadataloaded(true);
    }
    if (stackdata) setIsstackdatadataloaded(true);

    //
  }, []);

  // useEffect(() => {
  //   // async function loadDataAsync() {
  //   try {
  //     getDataWithextrafieldWithFilter(
  //       db,
  //       'Users',
  //       ['id', 'name', 'dob', 'ischild'],
  //       setUserdata,
  //       {isChecked: false}, //Extrafield to add
  //       {ischild: 1}, //Filter on
  //     );
  //   } catch (e) {
  //     console.warn(e);
  //   }
  //   // }
  //   // loadDataAsync();
  // }, []);

  const ParentComp = ({isuserdatadataloaded, userdata}) => {
    const [parentdata, setParentdata] = useState(null);
    // if (isuserdatadataloaded) {
    //   console.log('in isuserdatadataloaded', userdata);
    useEffect(() => {
      if (userdata) {
        userdata.filter(k => !k.ischild).length > 0
          ? setParentdata(userdata.filter(k => !k.ischild)[0])
          : null;
        console.log('stackdata', stackdata);
      }
    }, []);
    // }
    return userdata.filter(k => !k.ischild).length > 0 ? (
      <TouchableHighlight
        style={styles.fab}
        onPress={() => {
          return navigation.navigate('ParentGamesScreen', {
            user: userdata.filter(k => !k.ischild)[0],
            userdata: userdata,
            stackdata: stackdata,
          });
        }}>
        <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 10}}>
          Parent
        </Text>
      </TouchableHighlight>
    ) : null;
  };

  // useEffect(() => {
  // stackdata.length ? null : storeInitialStack();

  // }, [userdata]);

  // useEffect(() => {

  // }, [userdata]);

  // console.log('stackdata ', stackdata);

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg-colorvariant.png')}
        style={{flex: 1, padding: 5}}>
        {/* <UserChecklist userdata={userdata} setUserdata={setUserdata} /> */}
        {/* <ScrollView keyboardShouldPersistTaps="handled"> */}

        <ChildrenComp
          navigation={navigation}
          userdata={userdata}
          stackdata={stackdata}
          setStackdata={setStackdata}
        />

        <RegistrationComponent
          tohide={adduser}
          setAdduser={setAdduser}
          setUserdata={setUserdata}
        />

        <MyButton
          title="Add User"
          tohide={!adduser}
          customClick={() => setAdduser(!adduser)}
        />
        <ParentComp
          isuserdatadataloaded={isuserdatadataloaded}
          userdata={userdata}
        />
      </ImageBackground>
    </>
  );
};

// export default UserHomeScreen;
export default UserHomeScreen;
