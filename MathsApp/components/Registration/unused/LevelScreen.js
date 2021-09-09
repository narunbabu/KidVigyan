import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {MySurface} from './MySurface';
import {FAB} from 'react-native-paper';
const LevelScreen = ({navigation, route}) => {
  // operation=route.params.operation
  const {user_id, user_name, operation} = route.params;
  console.log('in LevelScreen', user_id, user_name, operation);
  // let level=1
  return (
    <>
      {Array.apply(0, Array(4).fill(0))
        .map(function (_, b) {
          return b;
        })
        .map(k => (
          <FAB
            key={k}
            style={{margin: 10, width: 200, alignSelf: 'center'}}
            medium
            icon=""
            label={'Level ' + (k + 1)}
            onPress={() =>
              navigation.navigate('MathScreen', {
                user_id: user_id,
                user_name: user_name,
                operation: operation,
                level: k + 1,
              })
            }
          />
        ))}
    </>
  );
};
export default LevelScreen;
