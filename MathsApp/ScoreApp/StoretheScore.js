import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {storeData, db} from '../Functions/SqlFunctions';

import {user, models} from '../Data/Models';
import {getDateScoredataperday, GenerateScore} from '../Data/GenerateScore';
const storeInitialStack = () => {
  operations.map(k => {
    //   stack['operation_id'] = k.id;
    //   // console.log('############in storeInitialStack', stack);
    //   storeData(db, 'Stack', stack, ['date'], true);
    //   stack['id'] += 1;
  });
};

const StoretheScore = () => {
  const [scoredata, setScoredata] = useState([{date: 'hi'}]);
  const tablestackobject = {Score: models['Score']};

  useEffect(() => {
    deleteTable(db, tablestackobject);
    createTable(db, models);
    var startdate = new Date('August 30, 2021 11:20:25');
    var ndays = 40;
    var sampleperday = 40;
    // var scoredata = GenerateScore(startdate, ndays, sampleperday);
    var mscoredata = [
      {
        child_id: 1,
        subject_id: 3,
        operation_id: 3,
        level: 4,
        date: '2021-08-31T11:12:30.097Z',
        time_taken: 48.419,
        mistypes: 0,
        score: 1000,
        passed: true,
        points: 200,
      },
    ];
    // storeDataArray(db, 'Score', mscoredata);
    storeData(db, 'Score', mscoredata[0], 'date');

    // storeInitialStack();
  }, []);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      // deleteTable(db, tablestackobject);
      // createTable(db, models);
      // storeInitialStack();

      try {
        getData(
          db,
          'Score',
          ['id', 'user_id', 'date'],
          setScoredata,
          // 'stack_id', //maxval_key
          'from userhomescreen Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        createTable(db, models);
      }
    }
    loadDataAsync();

    // if (stackdata) {
    //   setIsstackdatadataloaded(true);
    // }

    //
  }, []);

  return (
    <>
      <Text>hello store the score hi</Text>
      <Text>{scoredata[0].date}</Text>
    </>
  );
};

export default StoretheScore;
