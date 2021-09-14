// import {GenerateScore} from './GenerateScore';

const GenerateScore = require('./GenerateScore')(module);
var startdate = new Date('August 30, 2021 11:20:25');
var ndays = 40;
var sampleperday = 40;
var scoredata = GenerateScore(startdate, ndays, sampleperday);

console.log(scoredata[0]);
