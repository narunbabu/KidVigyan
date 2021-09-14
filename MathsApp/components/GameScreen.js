import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {MySurface} from './MySurface';
import {operations} from '../Data/Data';
// import LevelScreen from './LevelScreen';

import {
  db,
  getData,
  createTable,
  deleteTable,
  storeData,
  getDataWithextrafieldWithFilter,
} from '../Functions/SqlFunctions';
import {user, models} from '../Data/Models';

var stack = {
  id: 0,
  user_id: 0,
  operation_id: 0,
  date: new Date().toJSON(),
  level: 1,
  parent_id: 0,
  num_problems: 20,
};

const GamesScreen = ({navigation, route}) => {
  const default_level = 2;
  const {user, stackdata, setStackdata} = route.params;
  console.log('in GamesScreen', user);
  // console.log('in GamesScreen stackdata', stackdata);

  useEffect(() => {
    const storeInitialStack = () => {
      operations.map(k => {
        stack['operation_id'] = k.id;
        console.log('############in storeInitialStack', stack);
        storeData(db, 'Stack', stack, ['date'], true);
        stack['id'] += 1;
      });
    };

    setTimeout(() => {
      if (stackdata) {
        // setIsstackdatadataloaded(true);
        console.log('stackdata loaded');
      } else {
        createTable(db, models);
        storeInitialStack();
      }
    }, 20);
  }, []);
  if (stackdata) {
    null;
  } else {
    useEffect(() => {
      async function loadDataAsync() {
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
  }

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
              stackdata: stackdata,
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
