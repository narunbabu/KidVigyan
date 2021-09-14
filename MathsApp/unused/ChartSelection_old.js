import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserTab from './UserTab';
import React, {useState, useEffect} from 'react';
import {db, getData, createTable} from '../../Functions/SqlFunctions';
const ScoreFunctions = require('../../Functions/ScoreFunctions');
import ModalDropdown from 'react-native-modal-dropdown';
import {levels, subjects, operations} from '../../Data/Data';
import MyButton from '../Registration/MyButton';
import ChartComponent from './ChartComponent';
import DApp from './DynamicChart';
import {ECharts} from 'react-native-echarts-wrapper';
import ChartComplex from './ChartComplex';
const initoption = {
  xAxis: {
    type: 'category',
    //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1, 2, 3, 4, 5, 6, 7],
  },
  yAxis: {
    type: 'value',
  },
  legend: {show: true},

  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      name: 'score',

      // labelLine: 'Arun',
    },
    {
      data: [1920, 632, 601, 634, 990, 1030, 1020],
      type: 'bar',
      name: 'car',

      // labelLine: 'Arun',
    },
  ],
};
const ChartSelection = ({childscore}) => {
  const [level_idx, setLevel] = useState(0);
  const [subject_idx, setSubject] = useState(0);
  const [operation_idx, setOperation] = useState(0);

  const [data2plot, setData2plot] = useState('');

  const [mlevels, setmLevels] = useState('');
  const [msubjects, setmSubjects] = useState('');
  const [moperations, setmOperations] = useState('');
  const [option, setOption] = useState(initoption);
  const [newvalue, setNewvalue] = useState(0);
  //   const [scoredata, setScoredata] = useState();
  //   const [childscore, setChildscore] = useState();
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
    score_levels = ScoreFunctions.getUniqueFieldvalues(childscore, 'level');
    score_sub_ids = ScoreFunctions.getUniqueFieldvalues(
      childscore,
      'subject_id',
    );
    score_op_ids = ScoreFunctions.getUniqueFieldvalues(
      childscore,
      'operation_id',
    );
    // console.log(
    //   'score_levels,score_sub_ids,score_op_ids',
    //   score_levels,
    //   score_sub_ids,
    //   score_op_ids,
    // );
    // console.log(
    //   'subjects',
    //   // subjects,
    //   score_sub_ids.map(k => subjects.filter(e => e.id === k)[0].subject),
    // );

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
  }, []);

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
    var avg_timetaken = [];
    var avg_mistypes = [];
    var avg_score = [];
    var dates = Object.keys(daygroup);
    dates.map(k => {
      var vals = ScoreFunctions.getMeans(daygroup[k]);

      avg_timetaken.push(vals[0]);
      avg_mistypes.push(vals[1]);
      avg_score.push(vals[2]);
      //   console.log(k, daygroup[k].length, );
      //   console.log(k, daygroup[k].length, ScoreFunctions.getMeans(daygroup[k]));
      // console.log(Math.mean(daygroup[k].map(k => k.score)));
      // console.log();
      // mean
    });
    var datatoplot = {
      dates: dates.map(k => new Date(k).toLocaleDateString()),
      time_taken: avg_timetaken,
      mistypes: avg_mistypes,
      score: avg_score,
    };
    setData2plot(datatoplot);
    // console.log(datatoplot);

    // data2plot ? console.log('data2plot.dates ', data2plot.dates) : null;
    var loption = {
      xAxis: {
        type: 'category',
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: datatoplot.dates,
      },
      yAxis: {
        type: 'value',
      },
      legend: {show: true},

      series: [
        {
          data: datatoplot.time_taken,
          type: 'line',
          name: 'Time Taken',

          // labelLine: 'Arun',
        },
        {
          data: datatoplot.mistypes,
          type: 'line',
          name: 'Mistypes',

          // labelLine: 'Arun',
        },
        {
          data: datatoplot.score,
          type: 'line',
          name: 'score',

          // labelLine: 'Arun',
        },
      ],
    };
    setOption(loption);
    setNewvalue(newvalue + 1);
  };
  // return <ChartComponent />;

  return (
    <View style={styles.container}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '10%',
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
      </View>
      <View style={{height: '80%'}}>
        <ChartComponent data2plot={data2plot} newvalue={newvalue} />
        {/* <ChartComplex /> */}

        {/* <ECharts option={option} backgroundColor="rgba(93, 169, 81, 0.1)" /> */}
        {/* <DApp /> */}
      </View>
    </View>
  );
};

export default ChartSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddede2', // '#9ce6b8',
    // height: '12%',
    borderRadius: 20,
    margin: 1,
    padding: 5,
    paddingTop: 2,
    borderColor: 'grey',
    borderWidth: 5,
  },
  dropdown: {
    width: 90,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e8d7c1',
    paddingTop: 5,
    paddingLeft: 10,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
  },
  secondorderitem: {
    alignItems: 'center',
    marginTop: 10,
    // width: 40,
    // height: 30,
  },
});
