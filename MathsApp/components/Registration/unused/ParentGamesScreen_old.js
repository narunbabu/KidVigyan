import React, {useState, useEffect} from 'react';

import {
  View,
  ImageBackground,
  FlatList,
  ScrollView,
  Text,
  Button,
} from 'react-native';
// import {Checkbox} from '@react-native-community/checkbox';
import {MySurface} from './MySurface';
import {operations} from '../Data/Data';
import {OperationButton} from './OperationButton';
import {MyButton} from './Registration/MyButton';
import {db, getData} from '../Functions/SqlFunctions';
import {styles} from './Styles';
import {Checkbox} from 'react-native-paper';
const ParentGamesScreen = ({navigation, route}) => {
  const default_level = 2;
  const {user, userdata, stackdata} = route.params;
  console.log('in GamesScreen user', user);
  console.log('in GamesScreen stackdata', stackdata);

  var obj = {};
  const [localstackdata, setLocalstackdata] = useState('');
  const [localstackoperations, setLocalstackoperations] = useState('');
  const [onceLocalopsdone, setOnceLocalopsdone] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    try {
      getData(
        db,
        'Stack',
        [
          'id',
          'stack_id',
          'operation_id',
          'date',
          'level',
          'parent_id',
          'num_problems',
        ],
        setLocalstackdata,
        'from parentgamescreen Stack',
      );
      console.log('done inside get data from child and stackdata');
    } catch (e) {
      null;
      console.log('Getdata error occured');
    }
  }, []);

  var myoperations = [];
  operations.map(k => {
    obj = k;
    obj['level'] = 1;
    obj['num_problems'] = 0;
    myoperations.push(obj);
  });

  useEffect(() => {
    var stackoperations = [];
    console.log('onceLocalopsdone ', onceLocalopsdone);
    if (localstackdata) {
      localstackdata.map(k => {
        var obj = operations.filter(o => o.id == k.operation_id)[0];
        ['level', 'num_problems'].map(key => {
          obj[key] = k[key];
        });
        stackoperations.push(obj);
      });
      setLocalstackoperations(stackoperations);
      setOnceLocalopsdone(true);
    }
  }, [localstackdata]);

  console.log('clicked');
  return (
    <ImageBackground
      source={require('../assets/bg-colorvariant.png')}
      style={{flex: 1, padding: 5}}>
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        style={{
          // flex: 0.6,
          width: '100%',
          height: '60%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {myoperations.map(k => (
            <MySurface
              key={k.operator}
              // name={k.name}
              // symbol={k.operator}
              myprops={k}
              myfunc={() =>
                navigation.navigate('MathScreen', {
                  user: user,
                  stackdata: localstackdata,
                  operation: k,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          // flex: 0.1,
          height: 10,
          width: '100%',
          backgroundColor: 'grey',
        }}></View>
      <ScrollView
        style={{
          width: '100%',
          height: '30%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {localstackoperations
            ? localstackoperations.map(k => (
                <OperationButton
                  key={k.operator}
                  // name={k.name}
                  // symbol={k.operator}
                  myprops={k}
                  myfunc={() => console.log('hi')}
                />
              ))
            : null}
        </View>
        <View style={styles.checkboxContainer}>
          {/*  {userdata.map(k=>{

          })} */}
          {/* <Checkbox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
        /> */}

          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Checkbox
            size={45}
            keyValue={2}
            checked={false}
            color="#3F50B5"
            labelColor="#000000"
            label="Little Women"
            value="little_women"
            // checkedObjArr={CheckedArrObject}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.checkbox_label}>Do you like React Native?</Text>
        </View>

        <Button title="Set Stack" tohide={false} customClick={() => {}} />
      </ScrollView>
    </ImageBackground>
  );
  // onPress={() => navigation.navigate('LevelScreen', { name:k.name,symbol:k.operator}) }
  // let level=1
};

export default ParentGamesScreen;
