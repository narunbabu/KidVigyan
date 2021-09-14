import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {
  storeData,
  db,
  deleteTable,
  createTable,
  getData,
  getDataTest,
} from '../Functions/SqlFunctions';

import {user, models} from '../Data/Models';
const GenerateScoreFunctions = require('../Data/GenerateScore');
// import {getDateScoredataperday, GenerateScore} from '../Data/GenerateScore';
// const storeInitialStack = () => {
//   operations.map(k => {
//   stack['operation_id'] = k.id;
//   // console.log('############in storeInitialStack', stack);
//   storeData(db, 'Stack', stack, ['date'], true);
//   stack['id'] += 1;
//   });
// };

const StoretheScore = () => {
  const [scoredata, setScoredata] = useState([{date: 'hi'}]);
  const tablestackobject = {Score: models['Score']};

  // useEffect(() => {
  //   // deleteTable(db, tablestackobject);
  //   // createTable(db, models);
  //   // var startdate = new Date('August 30, 2021 11:20:25');
  //   // var ndays = 40;
  //   // var sampleperday = 40;
  //   // var scoredata = GenerateScore(startdate, ndays, sampleperday);

  //   var startdate = new Date('August 30, 2021 11:20:25');
  //   var ndays = 50;
  //   var sampleperday = 50;
  //   var scoredata = GenerateScoreFunctions.GenerateScore(
  //     startdate,
  //     ndays,
  //     sampleperday,
  //   );

  //   console.log(scoredata[0]);
  //   // var mscoredata = [
  //   //   {
  //   //     child_id: 1,
  //   //     subject_id: 3,
  //   //     operation_id: 3,
  //   //     level: 4,
  //   //     date: '2021-08-31T11:12:30.097Z',
  //   //     time_taken: 48,
  //   //     mistypes: 0,
  //   //     score: 1000,
  //   //     passed: true,
  //   //   },
  //   // ];
  //   // storeDataArray(db, 'Score', mscoredata);
  //   // storeData(db, 'Score', scoredata[0], ['date']);
  //   scoredata.forEach(element => {
  //     storeData(db, 'Score', element, ['date']);
  //   });
  // }, []);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Score']);
    // try {
    //   getDataTest(db, 'Score');
    // } catch (e) {
    //   // createTable(db, models);
    //   null;
    // }
    async function loadDataAsync() {
      try {
        getData(
          db,
          'Score',
          ['id', 'child_id', 'date'],
          setScoredata,
          'from userhomescreen Stack',
        );
        console.log('done inside get data score');
      } catch (e) {
        null;
      }
    }
    loadDataAsync();
  }, []);

  return (
    <>
      <Text>hello store the score hi</Text>
      {/* <Text>{scoredata[0].date}</Text> */}
      {/* <Text>{scoredata}</Text> */}
    </>
  );
};

export default StoretheScore;
