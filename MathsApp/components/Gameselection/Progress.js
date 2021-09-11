import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const Progress=()=> {
    score = {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        child_id: 'INTEGER',
        subject_id: 'INTEGER',
        operation_id: 'INTEGER',
        level: 'INTEGER',
        date: 'TEXT',
        time_taken: 'INTEGER',
        mistypes: 'INTEGER',
        passed: 'BOOLEAN',
        points: 'INTEGER',
      };

   const [scoredata, setScoredata]= useState();
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
          ['id', 'child_id', 'subject_id', 'operation_id','level','date','time_taken','mistypes','passed','points'],
          setUserdata,
          'from userhomescreen',
        );
      } catch (e) {
        createTable(db, models);
      }
    }
    loadDataAsync();
    if (userdata) {
      setIsuserdatadataloaded(true);
    }

    //
  }, []);
   

    return (
        <View>
            
        </View>
    );
}

export default Progress;