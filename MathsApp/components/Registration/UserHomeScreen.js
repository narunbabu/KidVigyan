import {
  Text,
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
} from '../../Functions/SqlFunctions';
import {user, models} from '../../Data/Models';
import {operations} from '../../Data/Data';
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
  stack_id: 0,
  operation_id: 0,
  date: new Date().toJSON(),
  level: 1,
  parent_id: 0,
  num_problems: 20,
};
const tableobject = {Users: user};
const tablestackobject = {Stack: models['Stack']};
const UserHomeScreen = ({navigation}) => {
  const [userdata, setUserdata] = useState(''); //{id: null, name: 'Notset', ischild: false},

  const [childstackdata, setChildstackdata] = useState(child_stack);
  const [stackdata, setStackdata] = useState('');
  const [isuserdatadataloaded, setIsuserdatadataloaded] = useState(false);

  const storeInitialStack = () => {
    operations.map(k => {
      stack['operation_id'] = k.id;
      // console.log('############in storeInitialStack', stack);
      storeData(db, 'Stack', stack, ['date'], true);
      stack['id'] += 1;
    });
  };
  useEffect(() => {
    // deleteTable(db, tableobject);
    deleteTable(db, tablestackobject);
    async function loadDataAsync() {
      createTable(db, models);
      // createScoresTable(db);
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

      try {
        getMaxvalueData(
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
          'stack_id', //maxval_key
          'from userhomescreen Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        storeInitialStack();
        console.log('Getdata error occured');
      }
    }
    loadDataAsync();
    if (userdata) {
      setIsuserdatadataloaded(true);
    }

    //
  }, []);
  const ParentComp = ({isuserdatadataloaded, userdata}) => {
    const [parentdata, setParentdata] = useState(null);
    if (isuserdatadataloaded) {
      console.log('in isuserdatadataloaded', userdata);
      userdata.filter(k => !k.ischild).length > 0
        ? setParentdata(userdata.filter(k => !k.ischild)[0])
        : null;
    }
    return (
      <TouchableHighlight
        style={styles.fab}
        onPress={() => {
          // console.log(' clicked on parent stackdata', stackdata);
          return navigation.navigate('ParentGamesScreen', {
            user: parentdata,
            userdata: userdata,
            stackdata: stackdata,
            // user_id: parentdata.id,
            // user_name: parentdata.name,
            // ischild: parentdata.ischild,
          });
        }}>
        <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 10}}>
          Parent
        </Text>
      </TouchableHighlight>
    );
  };

  const ChildrenComp = () => {};

  // useEffect(() => {
  // stackdata.length ? null : storeInitialStack();

  // }, [userdata]);

  // useEffect(() => {

  // }, [userdata]);

  // console.log('stackdata ', stackdata);

  const [adduser, setAdduser] = useState(true); //Class of student

  const Item = ({item, stackdata}) =>
    item.ischild ? (
      <TouchableHighlight
        style={styles.item}
        // onPress={() => console.log('clicked')}
        onPress={() =>
          navigation.navigate('GamesScreen', {
            user: item,
            stackdata: stackdata,
          })
        }>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableHighlight>
    ) : null;
  // const renderItem = ({item}) => <Item item={item} stackdata={stackdata} />;
  const renderItem = ({item}) => <Item item={item} stackdata={stackdata} />;

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg-colorvariant.png')}
        style={{flex: 1, padding: 5}}>
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
        <ParentComp
          isuserdatadataloaded={isuserdatadataloaded}
          userdata={userdata}
        />

        <MyButton
          title="Add User"
          tohide={!adduser}
          customClick={() => setAdduser(!adduser)}
        />
      </ImageBackground>
    </>
  );
};

// export default UserHomeScreen;
export default UserHomeScreen;
