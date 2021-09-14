import React from 'react';
import {useEffect, useState} from 'react';
import ParentModule from './ParentModule';
import {
  db,
  getData,
  createTable,
  getDataWithextrafieldWithFilter,
} from '../../Functions/SqlFunctions';
const ParentScreen = () => {
  const [stackdata, setStackdata] = useState();
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    try {
      getDataWithextrafieldWithFilter(
        db,
        'Users',
        ['id', 'name', 'dob', 'ischild'],
        setUserdata,
        {isChecked: false}, //Extrafield to add
        {ischild: 1}, //Filter on
      );
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        getData(
          db,
          'Users',
          ['id', 'name', 'dob', 'ischild'],
          setUserdata,
          'from userhomescreen',
        );
      } catch (e) {
        createTable(db, models);
      }
    }
    loadDataAsync();
    // if (userdata) {
    //   setIsuserdatadataloaded(true);
    // }

    //
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
          'from parentscreen Stack',
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

  return <ParentModule userdata={userdata} stackdata={stackdata} />;
};

export default ParentScreen;
