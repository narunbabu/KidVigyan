import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
export const user = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT',
  dob: 'TEXT',
  sclass: 'TEXT',
  dor: 'TEXT',
  coins: 'INTEGER',
  ischild: 'BOOLEAN',
};
export const stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  stack_id: 'INTEGER',
  operation: 'TEXT',
  date: 'TEXT',
  level: 'INTEGER',
  parent_id: 'INTEGER',
};
export const child_stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  stack_id: 'INTEGER',
  child_id: 'INTEGER',
  date: 'TEXT',
};
export const score = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  op_type: 'INTEGER',
  level: 'INTEGER',
  start_time: 'TEXT',
  time_taken: 'INTEGER',
  mistypes: 'INTEGER',
  passed: 'BOOLEAN',
  points: 'INTEGER',
};
export const progress = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  date: 'TEXT',
  gold_coins: 'INTEGER',
  gold_stars: 'INTEGER',
};
export const models = {
  Users: user,
  Stack: stack,
  ChildStack: child_stack,
  Score: score,
  Progress: progress,
};
export const createTable = (db, tableobject) => {
  Object.keys(tableobject).map(key => {
    // var tablename = Object.keys(tableobject)[0];
    var modelobject = tableobject[key];
    var query = 'CREATE TABLE IF NOT EXISTS ' + key + ' (';
    Object.keys(modelobject).forEach(
      k => (query += k + ' ' + modelobject[k] + ', '),
    );
    query = query.substr(0, query.length - 2);
    query += ' );';
    db.transaction(tx => {
      tx.executeSql(
        query,
        //   'CREATE TABLE IF NOT EXISTS ' +
        //     'Users ' +
        //     '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, dor TEXT, sclass TEXT, ischild BOOLEAN);',
      );
    });
    console.log(' table ', key, 'created');
  });
};

export const deleteTable = (db, tableobject) => {
  var tablename = Object.keys(tableobject)[0];
  var query = 'DROP TABLE IF EXISTS ' + tablename + ' ';
  db.transaction(tx => {
    tx.executeSql(query);
  });
  console.log(tablename, ' table deleted');
};

export const storeUserData = async (db, tablename, object, lengthcheckkeys) => {
  // var tablename = Object.keys(tableobject)[0];
  // Make sure your input data is consistent (integer, string etc.)
  console.log(
    'in set userdata**************************************************************',
  );
  var query = 'INSERT INTO ' + tablename + ' (';
  //   console.log(query);
  Object.keys(object).map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' ) VALUES (';
  Object.keys(object).map(k => (query += '?, '));
  query = query.substr(0, query.length - 2) + ');';
  var values = [];
  Object.keys(object).map(k => values.push(object[k]));
  //   console.log(query, values);
  if (lengthcheckkeys.legth > 0) {
    for (let i = 0; i < lengthcheckkeys.legth; i++) {
      if (object[lengthcheckkeys[i]].length == 0) {
        Alert.alert('Warning!', 'Please write your data.');
        return;
      }
    }
  }
  //   console.log(query);

  try {
    await db.transaction(async tx => {
      console.log('in setUserData', object);
      await tx.executeSql(query, values);
    });
    console.log('Registered');
    // navigation.navigate('Home');
  } catch (error) {
    console.log(error);
  }
};

export const getData = (db, tablename, keys2retrieve, setUserData) => {
  console.log('*******************start get all');
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  //   console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        // console.log('results.rows.length ', results.rows.length);
        var len = results.rows.length;
        // console.log('results.rows.length ', results.rows.length);
        if (len > 0) {
          var allusers = [];

          for (let i = 0; i < len; i++) {
            var myarr = {};
            // console.log('results.rows.length ', i, results.rows.length);
            // allusers += results.rows.item(i).name + ', ';
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
            console.log(myarr);
          }
          // console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);

          //   console.log(allusers);
          console.log('*******************end get all');
          setUserData(allusers);
          //   return allusers;

          // setAllusers(allusers);
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // return [];
  }
  console.log('*******************end get all');
};

// export const getData = db => {
//   try {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT id,name, dob, ischild FROM Users',
//         [],
//         (tx, results) => {
//           var len = results.rows.length;
//           if (len > 0) {
//             var allusers = '';
//             for (let i = 0; i < len; i++) {
//               allusers += results.rows.item(i).name + ', ';
//             }
//             // navigation.navigate('Home');
//           }
//         },
//       );
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
