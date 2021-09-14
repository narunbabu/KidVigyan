const moment = require('moment');
const _ = require('lodash');
const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
};
const getAllwithKeyValue = (array, key, val) => {
  return array.filter(k => k[key] == val);
};
const Sum = array => _.sum(array);

const getAllwithMultiKeyValue = (array, keysvals) => {
  Object.keys(keysvals).forEach(k => {
    array = getAllwithKeyValue(array, k, keysvals[k]);
  });

  return array;
};

const mean = (...numbers) =>
  numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

const getMeans = (objectarray, keys = ['time_taken', 'mistypes', 'score']) => {
  return keys.map(key => mean(...objectarray.map(k => k[key])));
};

const dategroupedby = (scoredata, groupbykey = 'isoDay') =>
  _.groupBy(scoredata, function (result) {
    return moment(result.date.substring(0, 10), 'YYYY-MM-DD').startOf(
      groupbykey,
    );
  });

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const getUniqueFieldvalues = (objectarray, key) =>
  objectarray.map(k => k[key]).filter(onlyUnique);

const getUniqueFieldvalues4Keys = (objectarray, keys) =>
  keys.map(key =>
    objectarray
      .map(k => k[key])
      .filter(onlyUnique)
      .sort(),
  );

module.exports = {
  groupByKey,
  getAllwithKeyValue,
  getAllwithMultiKeyValue,
  mean,
  getMeans,
  dategroupedby,
  getUniqueFieldvalues,
  getUniqueFieldvalues4Keys,
  Sum,
};
