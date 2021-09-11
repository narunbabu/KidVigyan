import React from 'react';
// import faker from 'faker';
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

export const getDateScoredataperday = (dt, n_arr_forday) => {
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
      child_id: faker.datatype.number(3),
      subject_id: faker.datatype.number(5),
      operation_id: faker.datatype.number(5),
      level: faker.datatype.number({min: 1, max: 5}),
      date: date.toJSON(),
      time_taken: timetaken / 1000,
      mistypes: faker.datatype.number(5),
    };
    score['score'] = Math.floor(
      1000 - score['time_taken'] * (0.5 * score['mistypes'] * 50),
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
export const GenerateScore = (startday, ndays, nsamples) => {
  //   var dt = new Date('August 30, 2021 11:20:25');

  var dates = getSuccessivedates(startday, ndays);
  finalarr = dates.map(dt => getDateScoredataperday(dt, nsamples));
  return finalarr;

  //   console.log(JSON.stringify(finalarr));
};

export const GenerateScoreOndate = (dt, nsamples) => {
  // var dt = new Date('August 30, 2021 11:20:25');
  var dates = getSuccessivedates(dt, 1);
  finalarr = dates.map(dt => getDateScoredataperday(dt, nsamples));
  return finalarr;

  //   console.log(JSON.stringify(finalarr));
};

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
