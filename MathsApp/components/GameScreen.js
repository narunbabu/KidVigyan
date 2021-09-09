import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {MySurface} from './MySurface';
import {operations} from '../Data/Data';
// import LevelScreen from './LevelScreen';
const GamesScreen = ({navigation, route}) => {
  const default_level = 2;
  const {user, stackdata} = route.params;
  console.log('in GamesScreen', user);
  console.log('in GamesScreen stackdata', stackdata);
  var myoperations = [];
  if (stackdata.length) {
    stackdata.map(k => {
      var obj = operations.filter(o => o.id == k.operation_id)[0];
      ['level', 'num_problems'].map(key => {
        obj[key] = k[key];
      });
      myoperations.push(obj);
    });
  } else {
    operations.map(k => {
      obj = k;
      obj['level'] = 1;
      obj['num_problems'] = 10;
      myoperations.push(obj);
    });
  }

  console.log('clicked');
  return (
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
              stackdata: {},
              operation: k,
            })
          }
        />
      ))}
    </View>
  );
  // onPress={() => navigation.navigate('LevelScreen', { name:k.name,symbol:k.operator}) }
  // let level=1
};

export default GamesScreen;
