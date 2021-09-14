import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserTab from './UserTab';
import React, {useState, useEffect} from 'react';
import {db, getData, createTable} from '../../Functions/SqlFunctions';
const ScoreFunctions = require('../../Functions/ScoreFunctions');
import ModalDropdown from 'react-native-modal-dropdown';
import {levels, subjects, operations} from '../../Data/Data';
import MyButton from '../Registration/MyButton';
import {ChartComponent} from './ChartComponent';
import DApp from './DynamicChart';

const ParentModule = ({userdata, stackdata}) => {
  const [level_idx, setLevel] = useState(0);
  const [subject_idx, setSubject] = useState(0);
  const [operation_idx, setOperation] = useState(0);

  const [mlevels, setmLevels] = useState('');
  const [msubjects, setmSubjects] = useState('');
  const [moperations, setmOperations] = useState('');

  const [scoredata, setScoredata] = useState();
  const [childscore, setChildscore] = useState();
  const [sub_op_level_ids, setSub_op_level_ids] = useState();
  var sub_op_level_ids_idxs = {
    subject_id: 0,
    operation_id: 1,
    level: 2,
  };

  var score_levels,
    score_op_ids,
    score_sub_ids = '';

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

        // var alluniquearrays = ScoreFunctions.getUniqueFieldvalues4Keys(
        //   ScoreFunctions.getAllwithMultiKeyValue(scoredata, {
        //     child_id: 1,
        //   }),
        //   ['level', 'subject_id', 'operation_id'],
        // );

        // var mlevels,
        //   msub_ids,
        //   mop_ids = ScoreFunctions.getUniqueFieldvalues4Keys(
        //     ScoreFunctions.getAllwithMultiKeyValue(scoredata, {
        //       child_id: 1,
        //     }),
        //     ['level', 'subject_id', 'operation_id'],
        //   );

        score_levels = ScoreFunctions.getUniqueFieldvalues(attribute0, 'level');
        score_sub_ids = ScoreFunctions.getUniqueFieldvalues(
          attribute0,
          'subject_id',
        );

        score_op_ids = ScoreFunctions.getUniqueFieldvalues(
          attribute0,
          'operation_id',
        );
        console.log(
          'score_levels,score_sub_ids,score_op_ids',
          score_levels,
          score_sub_ids,
          score_op_ids,
        );
        console.log(
          'subjects',
          // subjects,
          score_sub_ids.map(k => subjects.filter(e => e.id === k)[0].subject),
        );

        setmLevels(score_levels.map(k => ({id: k, val: 'Level ' + k})));
        setmSubjects(
          score_sub_ids.map(k => ({
            id: k,
            val: subjects.filter(e => e.id === k)[0].subject,
          })),
        );
        setmOperations(
          score_op_ids.map(k => ({
            id: k,
            val: operations.filter(e => e.id === k)[0].name,
          })),
        );

        // console.log(
        //   'operations',
        //   // operations,
        //   score_op_ids.map(k => operations.filter(e => e.id === k)[0].name),
        // );
        setSub_op_level_ids([score_sub_ids, score_op_ids, score_levels]);
        // console.log(
        //   'score_levels,score_sub_ids,score_op_ids',
        //   mlevels,
        //   msub_ids,
        //   mop_ids,
        // );

        console.log(
          'm score_levels,score_sub_ids,score_op_ids',
          mlevels,
          msubjects,
          moperations,
        );
      }
    }
    setTimeout(() => loadDataAsync(), 100);
  }, [scoredata]);

  const onSelect = object => {
    console.log('******************************************************');
    console.log(level_idx, subject_idx, operation_idx);
    console.log(object);
    var keysvals = {
      level: sub_op_level_ids[sub_op_level_ids_idxs.level][level_idx],
      subject_id:
        sub_op_level_ids[sub_op_level_ids_idxs.subject_id][subject_idx],
      operation_id:
        sub_op_level_ids[sub_op_level_ids_idxs.operation_id][operation_idx],
    }; //
    console.log('keyvals before ', keysvals);
    var objkey = Object.keys(object)[0];
    keysvals[objkey] =
      sub_op_level_ids[sub_op_level_ids_idxs[objkey]][object[objkey]];
    console.log('keyvals after ', keysvals);
    console.log(
      'level, subject, operation names',
      // keysvals,
      // mlevels,
      // msubjects,
      // moperations,
      msubjects.filter(k => k.id == keysvals.subject_id)[0].val,
      moperations.filter(k => k.id == keysvals.operation_id)[0].val,
      mlevels.filter(k => k.id == keysvals.level)[0].val,
    );

    var attribute1 = ScoreFunctions.getAllwithMultiKeyValue(
      childscore,
      keysvals,
    );

    console.log('attribute1 ', attribute1[0], attribute1.length);

    // attribute1levelgroups = ScoreFunctions.groupByKey(attribute1, 'level');
    //         // console.log(attribute1levelgroups);
    //         Object.keys(attribute1levelgroups).map(k => {
    //           console.log(k, attribute1levelgroups[k].length);
    //         });

    var daygroup = ScoreFunctions.dategroupedby(
      attribute1,
      'isoWeek', //isoMoth,isoDay
    );

    Object.keys(daygroup).map(k => {
      console.log(k, daygroup[k].length, ScoreFunctions.getMeans(daygroup[k]));
      // console.log(Math.mean(daygroup[k].map(k => k.score)));
      // console.log();
      // mean
    });
  };
  // return <ChartComponent />;

  return (
    <View style={{margin: 10}}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '20%',
        }}>
        <View style={styles.secondorderitem}>
          <Text style={{fontSize: 8}}>Subject</Text>
          {msubjects ? (
            <ModalDropdown
              style={styles.dropdown}
              defaultValue={msubjects[0].val}
              options={msubjects.map(l => l.val)}
              onSelect={(idx, value) => {
                console.log(idx, value);
                setSubject(idx);
                onSelect({subject_id: idx});
                // onSelect();
              }}
            />
          ) : null}
        </View>

        <View style={styles.secondorderitem}>
          <Text style={{fontSize: 8}}>Operations</Text>
          {moperations ? (
            <ModalDropdown
              style={styles.dropdown}
              defaultValue={moperations[0].val}
              options={moperations.map(l => l.val)}
              onSelect={(idx, value) => {
                // console.log(idx, value);
                // setOperation(idx);
                onSelect({operation_id: idx});
              }}
            />
          ) : null}
        </View>

        <View style={styles.secondorderitem}>
          <Text style={{fontSize: 8}}>Level</Text>
          {mlevels ? (
            <ModalDropdown
              style={styles.dropdown}
              defaultValue={mlevels[0].val}
              options={mlevels.map(l => l.val)}
              onSelect={(idx, value) => {
                setLevel(idx);
                onSelect({level: idx});
              }}
            />
          ) : null}
        </View>
        {/* <View style={styles.secondorderitem}>
          <MyButton
            title="Chart"
            tohide={false}
            customClick={() => onSelect()}
          />
        </View> */}

        {/* <Text>{'hi'}</Text>
      {scoredata ? <Text>{scoredata.length}</Text> : null}
      {scoredata ? <Text>{scoredata.length}</Text> : null} */}

        {/* <Text>Hello</Text> */}
        {/* <View style={{height: '80%'}}>
        <UserTab userdata={userdata} />
      </View>
      <View style={{height: '20%'}}>
        <Text>Set Stack</Text>
      </View> */}
      </View>
      <View style={{height: '80%'}}>
        <ChartComponent />
        {/* <DApp /> */}
      </View>
    </View>
  );
};

export default ParentModule;

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 60,
    margin: 1,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // backgroundColor:'#d4ed82',
    borderRadius: 20,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',

    borderRadius: 5,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addtostack: {
    // position: 'absolute',
    width: 70,
    height: 40,
    // left: 0,
    // bottom: 0,
    shadowColor: 'grey',
    shadowRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    margin: 16,
    padding: 10,
    backgroundColor: '#b1f0e8',
    borderRadius: 20,
    alignItems: 'center',
  },
  dropdown: {
    width: 90,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e3ebdf',
    padding: 5,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
  },
  input: {
    width: 30,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e4eba9',
    padding: 2,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    // alignSelf: 'center',
    fontSize: 15,
    // alignItems: 'center',
  },
  secondorderitem: {
    alignItems: 'center',
    marginTop: 10,
    // width: 40,
    // height: 30,
  },
});
