// import React from 'react';
// import faker from 'faker';
const moment = require('moment');
const _ = require('lodash');
const ScoreFunctions = require('../Functions/ScoreFunctions');
const print = vals => {
  var string = '';
  vals.forEach(element => {
    string += element + ' ';
  });
  console.log(string);
};

const faker = require('faker');
const randomizeDate = dt => {
  dt.setHours(dt.getHours() + faker.datatype.number({min: 1, max: 6}));
  dt.setMinutes(dt.getMinutes() + faker.datatype.number({min: 0, max: 60}));
  dt.setMilliseconds(
    dt.getMilliseconds() + faker.datatype.number({min: 0, max: 900000}),
  );
  return dt;
};
const getSuccessivedates = (dt, ndates) => {
  const number_arr_fordates = Array.from({length: ndates}, (v, k) => k + 1);
  print(number_arr_fordates);
  var dates = [];
  number_arr_fordates.forEach(k => {
    dt.setDate(dt.getDate() + 1);
    // dates.push(new Date(dt.toJSON()));
    dates.push(randomizeDate(new Date(dt)));
    // print([dt]);
    // return dt;
  });
  return dates;
};
// let sum = 0;
// const numbers = [65, 44, 12, 4];
// number_arr_fordates.forEach(myFunction);

// function myFunction(item) {
//   sum += item;
// }

const getDateScoreperday = (dt, n_arr_forday) => {
  const score_init_arr_forday = Array.from(
    {length: n_arr_forday},
    (v, k) => k + 1,
  );
  var timetaken = 0;
  // var date = dt;
  var i = 10;
  let perdayscore = score_init_arr_forday.map(k => {
    i += 1;
    timetaken = faker.datatype.number({min: 200000 / i, max: 700000 / i});
    var date = dt;
    dt.setMilliseconds(dt.getMilliseconds() + timetaken + 10);
    // return [date.toJSON(), timetaken / 1000];
    return {date: date.toJSON(), time_taken: timetaken / 1000};
  });
  return perdayscore;
};

const getDateScoredataperday = (dt, n_arr_forday) => {
  const score_init_arr_forday = Array.from(
    {length: n_arr_forday},
    (v, k) => k + 1,
  );
  var timetaken = 0;
  // var date = dt;
  var i = 10;
  let perdayscore = score_init_arr_forday.map(k => {
    i += 1;
    timetaken = faker.datatype.number({min: 200000 / i, max: 700000 / i});
    var date = dt;
    dt.setMilliseconds(dt.getMilliseconds() + timetaken + 10);
    // return [date.toJSON(), timetaken / 1000];

    const score = {
      child_id: faker.datatype.number(1),
      subject_id: faker.datatype.number(0),
      operation_id: faker.datatype.number(2),
      level: faker.datatype.number({min: 1, max: 2}),
      date: date.toJSON(),
      time_taken: timetaken / 1000,
      mistypes: faker.datatype.number(5),
    };
    score['score'] = Math.floor(
      1000 - score['time_taken'] * (0.5 * (1 + score['mistypes']) * 50),
    );
    score['score'] < 0
      ? (score['score'] = 0)
      : (score['score'] = score['score']);
    score['passed'] = score['score'] > 100 ? true : false;

    return score;
  });
  return perdayscore;
};

const number_arr_forday = (min, max) =>
  Array.from(
    {length: faker.datatype.number({min: min, max: max})},
    (v, k) => k + 1,
  );
const GenerateScore = (startday, ndays, nsamples) => {
  //   var dt = new Date('August 30, 2021 11:20:25');

  var dates = getSuccessivedates(startday, ndays);
  // finalarr = dates.map(dt => [...getDateScoredataperday(dt, nsamples)]);
  var finalarr = [];
  dates.map(dt => {
    finalarr.push(...getDateScoredataperday(dt, nsamples));
  });
  return finalarr;

  //   console.log(JSON.stringify(finalarr));
};

const GenerateScoreOndate = (dt, nsamples) => {
  // var dt = new Date('August 30, 2021 11:20:25');
  var dates = getSuccessivedates(dt, 1);
  finalarr = [];
  dates.map(dt => {
    finalarr.push(getDateScoredataperday(dt, nsamples));
  });
  return finalarr;

  //   console.log(JSON.stringify(finalarr));
};

// function groupByKey(array, key) {
//   return array.reduce((hash, obj) => {
//     if (obj[key] === undefined) return hash;
//     return Object.assign(hash, {
//       [obj[key]]: (hash[obj[key]] || []).concat(obj),
//     });
//   }, {});
// }
// function getAllwithKeyValue(array, key, val) {
//   return array.filter(k => k[key] == val);
// }

// function getAllwithMultiKeyValue(array, keysvals) {
//   Object.keys(keysvals).forEach(k => {
//     array = getAllwithKeyValue(array, k, keysvals[k]);
//   });

//   return array;
// }

var startdate = new Date('August 30, 2021 11:20:25');
var ndays = 50;
var sampleperday = 50;
var scoredata = GenerateScore(startdate, ndays, sampleperday);
var timetaken = scoredata.map(e => e.time_taken);
// dates = scoredata.map(e => new Date(e.date.substring(0, 10)));
var dates = scoredata.map(e => e.date.substring(0, 10));
//   {
//   console.log(new Date(e.date));
// }
// );
// var unique = [...new Set(dates)];
let unique = dates.filter((item, i, ar) => ar.indexOf(item) === i);
// console.log(unique);
// const monthName = item => moment(item.created_at, 'YYYY-MM-DD').format('MMM');
// dayName = scoredata.map(item =>
//   moment(item.date.substring(0, 10), 'YYYY-MM-DD').format('DD'),
// );
// console.log(scoredata[0]);
// console.log(dayName);

// const result = _(scoredata)
//   .groupBy(monthName)
//   .mapValues(items => _.map(items, 'child_id'))
//   .value();
// const result = _.chain(scoredata)
//   .groupBy(dayName)
//   .mapValues(items => _.map(items, 'child_id'))
//   .value();
// console.log(result);
// let path = 'child_id';

// let grouped = _(scoredata)
//   .filter(object => _.has(object, path))
//   .groupBy(path)
//   .value();

// const dategroupedby = (scoredata, groupbykey = 'isoDay') =>
//   _.groupBy(scoredata, function (result) {
//     return moment(result.date.substring(0, 10), 'YYYY-MM-DD').startOf(
//       groupbykey,
//     );
//   });
// const mean = (...numbers) =>
//   numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
// const getMeans = (objectarray, keys = ['time_taken', 'mistypes', 'score']) => {
//   return keys.map(key => mean(...objectarray.map(k => k[key])));
// };
// mean(...daygroup[k].map(k => k.score));
// console.log(groupedResults);
// console.log(groupByKey(scoredata, 'child_id'));
// console.log(getAllwithKeyValue(scoredata, 'child_id', 0));

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const getUniqueFieldvalues = (objectarray, key) =>
  objectarray.map(k => k[key]).filter(onlyUnique);

// // usage example:
// var a = ['a', 1, 'a', 2, '1'];
// var unique = a.filter(onlyUnique);

var attribute0 = ScoreFunctions.getAllwithMultiKeyValue(scoredata, {
  child_id: 1,
});

// levels = attribute1.map(k => k.level).filter(onlyUnique);
var levels = getUniqueFieldvalues(attribute0, 'level');

var alluniquearrays = ScoreFunctions.getUniqueFieldvalues4Keys(
  ScoreFunctions.getAllwithMultiKeyValue(scoredata, {
    child_id: 1,
  }),
  ['level', 'subject_id', 'operation_id'],
);
console.log('score_levels,score_sub_ids,score_op_ids', alluniquearrays);
// score_levels = getUniqueFieldvalues(attribute0, 'level');
// score_sub_ids = getUniqueFieldvalues(attribute0, 'subject_id');
// score_op_ids = getUniqueFieldvalues(attribute0, 'operation_id');
// console.log(
//   'score_levels,score_sub_ids,score_op_ids',
//   score_levels,
//   score_sub_ids,
//   score_op_ids,
// );

// console.log(levels);
// console.log(attribute1.length);

var keysvals = {subject_id: 0, operation_id: 1}; //level: 2

var attribute1 = ScoreFunctions.getAllwithMultiKeyValue(attribute0, keysvals);
var attribute1levelgroups = ScoreFunctions.groupByKey(attribute1, 'level');
// console.log(attribute1levelgroups);
Object.keys(attribute1levelgroups).map(k => {
  console.log(k, attribute1levelgroups[k].length);
});

var daygroup = ScoreFunctions.dategroupedby(
  attribute1levelgroups[1],
  (groupbykey = 'isoWeek'), //isoMoth,isoDay
);
Object.keys(daygroup).map(k => {
  console.log(k, daygroup[k].length, ScoreFunctions.getMeans(daygroup[k]));
  // console.log(Math.mean(daygroup[k].map(k => k.score)));
  // console.log();
  // mean
});

// console.log();
// let u2 = _.findIndex(scoredata, u => {
//   return u.child_id === 1;
// });

// console.log(u2);

// console.log(grouped);
// dates.map((dt) => {
//   var datentimetaken = [];
//   var numarray = number_arr_forday(40, 60);

//   perdayscore = getDateScoreperday(dt, numarray);
//   datentimetaken.push(...perdayscore);
//   print(perdayscore);

//   print(["##############################################################"]);
// });

// print(datentimetaken);
// var timetaken = faker.datatype.number({ min: 100, max: 10000 });
// dt.setMilliseconds(dt.getMilliseconds() + timetaken);
// md = dt.setDate(dt.getDate() + 1);
// print([dt.setDate(dt.getDate() + 1)]);
module.exports = {
  GenerateScore,
  getDateScoredataperday,
};
