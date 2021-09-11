// import React from 'react';
// import {getData} from '../Functions/SqlFunctions';
import {getDateScoredataperday} from './GenerateScore';

function DummyData() {
  const generateScoredata = () => {
    // var fileds = [
    //   'id',
    //   'child_id',
    //   'subject_id',
    //   'operation_id',
    //   'level',
    //   'date',
    //   'time_taken',
    //   'mistypes',
    //   'passed',
    //   'points',
    // ];
    var dt = new Date('August 30, 2021 11:20:25');
    var dates = getSuccessivedates(dt, 2);
    finalarr = dates.map(dt => getDateScoredataperday(dt, 40));

    console.log(JSON.stringify(finalarr));
  };

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
        'points',
      ],
      setUserdata,
      'from userhomescreen',
    );
  } catch (e) {
    createTable(db, models);
  }
}

DummyData.generateScoredata();
