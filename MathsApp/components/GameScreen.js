import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {MySurface} from './MySurface';
import LevelScreen from './LevelScreen';
const GamesScreen = ({navigation, route}) => {
  const default_level = 2;
  const {user} = route.params;
  console.log('in GamesScreen', user);
  LevelScreen;
  const arithops = [
    {name: 'Addition', operator: '+'},
    {name: 'Subtraction', operator: '−'},
    {name: 'Multiplication', operator: '×'},
  ]; //,{name:'Division',operator:'÷'},{name:'Comparisons',operator:'='}]
  console.log('clicked');
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      {arithops.map(k => (
        <MySurface
          key={k.operator}
          name={k.name}
          symbol={k.operator}
          // myfunc={()=> console.log('from welcome screen')}/>)}
          // myfunc={() =>
          //   navigation.navigate('LevelScreen', {
          //     user_id: user_id,
          //     user_name: user_name,
          //     operation: k.name,
          //   })
          // }
          myfunc={() =>
            navigation.navigate('MathScreen', {
              user: user,
              operation: k.name,
              level: default_level,
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
