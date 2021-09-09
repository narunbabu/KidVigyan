import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import {styles} from './Styles';
import MyButton from './MyButton';
import {
  db,
  user,
  createUserTable,
  createScoresTable,
  deleteTable,
  storeData,
  getData,
} from '../../Functions/SqlFunctions';
import {class_options, operations} from '../../Data/Data';
const RegistrationComponent = ({tohide, setAdduser, setUserdata}) => {
  const [allusers, setAllusers] = useState('initial');

  // useEffect(() => {
  //   // deleteTable(db);
  //   createUserTable(db);
  //   createScoresTable(db);
  //   getAll(db);
  //   // getData();
  // }, []);

  const ClassComp = ({hide}) => {
    if (hide) {
      return null;
    } else {
      return (
        <>
          {/* <Text style={styles.label}>Class</Text> */}
          <View style={styles.dropdown}>
            <ModalDropdown
              style={styles.dropdown_2}
              defaultValue={value}
              options={class_options}
              onSelect={(idx, value) => setValue(value)}
            />
          </View>
        </>
      );
    }
  };

  const [open, setOpen] = useState(false);

  const [isparent, setIsparent] = useState(true);

  // var date = new Date();
  const [dob, setDob] = useState(new Date('2016-07-03'));
  // const [dor, setDor] = useState(new Date());
  const [name, setName] = useState('');
  const [value, setValue] = useState(class_options[0]); //Class of student
  // const [adduser, setAdduser] = useState(true); //Class of student
  var person = {
    name: name,
    dob: dob,
    sclass: value,
    dor: new Date(),
    ischild: !isparent,
  };
  var stack = {
    user_id: 0,
    operation_id: 0,
    date: new Date().toJSON(),
    level: 1,
    parent_id: null,
  };
  var child_stack = {
    stack_id: 0,
    child_id: null,
    date: new Date().toJSON(),
  };
  const storeInitialStack2Children = () => {
    userdata.filter(k => k.ischild);
    operations.map(k => {
      child_stack['child_id'] = k.id;
      storeData(db, 'ChildStack', child_stack, ['date']);
    });
  };

  const register_user = () => {
    console.log('in register user!', person);
    // getAll(db, 'Users', ['name', 'dob', 'ischild', 'sclass']);
    person['dob'] = person.dob.toJSON();
    person['dor'] = person.dor.toJSON();
    storeData(db, 'Users', person, ['name']);
    getData(
      db,
      'Users',
      ['id', 'name', 'dob', 'ischild'],
      setUserdata,
      'in registration register',
    );
    setValue(class_options[0]);

    // navigation.navigate('UserHomeScreen', {name: 'Home'});
    // navigation.goBack();
  };

  if (tohide) {
    return null;
  } else {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setName(text)}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <DatePicker
              style={styles.date}
              date={dob}
              mode={'date'}
              onDateChange={date => {
                setDob(date);
              }}
            />
            {/* </View> */}
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <RadioButton
                value="parent"
                color="green"
                status={isparent ? 'checked' : 'unchecked'}
                onPress={() => setIsparent(true)}
              />
              <Text style={{fontSize: 25, marginRight: 30}}>Parent</Text>

              <RadioButton
                color="green"
                value="child"
                status={!isparent ? 'checked' : 'unchecked'}
                onPress={() => setIsparent(false)}
              />
              <Text style={{fontSize: 25}}>Child</Text>
            </View>
            <ClassComp hide={isparent} />
          </View>
          <MyButton
            title="Add"
            customClick={() => {
              register_user();
              setAdduser(true);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
};
export default RegistrationComponent;
