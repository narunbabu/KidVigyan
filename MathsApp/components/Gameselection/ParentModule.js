import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserTab from './UserTab';
import React, {useState, useEffect} from 'react';
import {db, getData, createTable} from '../../Functions/SqlFunctions';
const ScoreFunctions = require('../../Functions/ScoreFunctions');
// import ModalDropdown from 'react-native-modal-dropdown';
// import {levels, subjects, operations} from '../../Data/Data';
import MyButton from '../Registration/MyButton';
// import {ChartComponent} from './ChartComponent';
// import DApp from './DynamicChart';
import ChartSelection from './ChartSelection';
import {ScoreStats} from './ScoreStats';

const ParentModule = ({userdata, stackdata}) => {
  // const [level_idx, setLevel] = useState(0);
  // const [subject_idx, setSubject] = useState(0);
  // const [operation_idx, setOperation] = useState(0);

  // const [mlevels, setmLevels] = useState('');
  // const [msubjects, setmSubjects] = useState('');
  // const [moperations, setmOperations] = useState('');

  const [scoredata, setScoredata] = useState();
  const [childscore, setChildscore] = useState();
  // const [sub_op_level_ids, setSub_op_level_ids] = useState();
  // var sub_op_level_ids_idxs = {
  //   subject_id: 0,
  //   operation_id: 1,
  //   level: 2,
  // };

  // var score_levels,
  //   score_op_ids,
  //   score_sub_ids = '';

  //Read score board and put up the summary
  //UserTab is being used by both ParentScreen and GameSelect. It should be finally moving to GameS

  useEffect(() => {
    async function loadDataAsync() {
      try {
        getData(
          db,
          'Score',
          [
            'id',
            'child_id',
            'subject_id',
            'operation_id',
            'level',
            'date',
            'time_taken',
            'mistypes',
            'passed',
            'score',
          ],
          setScoredata,
          'from userhomescreen',
        );
      } catch (e) {
        createTable(db, models);
      }
    }
    setTimeout(() => {
      loadDataAsync();
    }, 100);
  }, []);

  useEffect(() => {
    async function loadDataAsync() {
      if (scoredata) {
        console.log('userdata', userdata);
        var attribute0 = ScoreFunctions.getAllwithMultiKeyValue(scoredata, {
          child_id: 1,
        });
        setChildscore(attribute0);
      }
    }
    setTimeout(() => loadDataAsync(), 100);
  }, [scoredata]);

  return (
    <View style={{margin: 10, flex: 1}}>
      {/* <View style={{height: '10%'}}> */}
      {childscore ? (
        <>
          <ScoreStats childscore={childscore} />
          <ChartSelection childscore={childscore} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* </View> */}
      <MyButton
        title="Set Stack"
        color="green"
        customClick={() => {
          // register_user();
          // setAdduser(true);
        }}
      />
    </View>
  );
};

export default ParentModule;
