import React, {useState, useEffect} from 'react';
// import CatApp from './maths/components/CatApp';
import {NumberElement} from './NumberElement';
import {Result} from './Result';
import {styles} from './Styles';
import {getRandomInt, getRandomNumbers} from './MathFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import {FAB} from 'react-native-paper';
// import RewardsComponent from 'react-native-rewards';
import ModalDropdown from 'react-native-modal-dropdown';
import DialogInput, {sendInput, showDialog} from 'react-native-dialog-input';
// import {DialogComponent, DialogTitle} from 'react-native-dialog-component';
import {
  db,
  user,
  getData,
  createTable,
  deleteTable,
  models,
} from '../SqlFunctions';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from 'react-native';
// import Fireworks from '../../Animations/FireWorks';

export const MathApp = ({user, operation, level}) => {
  // const levels = ['1', '2', '3', '4', '5'];
  const storeData = async (objname, obj) => {
    try {
      await AsyncStorage.setItem(objname, JSON.stringify(obj));
      console.log('Data saving done');
    } catch (e) {
      console.log('Data not set');
      storeData(objname, obj);
      // saving error
    }
  };

  const removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  // removeItemValue('scores')

  const levels = [
    {level: 0, ndigits: 1},
    {level: 1, ndigits: 2},
    {level: 2, ndigits: 2},
    {level: 3, ndigits: 2},
    {level: 4, ndigits: 3},
  ];
  const scoreformat = [
    'child_id',
    'op_type',
    'level',
    'start_time',
    'time_taken',
    'passed',
  ];
  let op_type_defs = {
    Addition: 1,
    Subtraction: 2,
    Multiplication: 3,
    Division: 4,
    Comparisons: 5,
  };
  var firstscores = [];

  const print = myarray => {
    myarray.map(k => console.log(k, ','));
  };
  // print(['in mathapp',user_id, operation,level])

  const [count, setCount] = useState(1);
  const [insidelevel, setLevel] = useState(levels[level]['level']);
  const [start_time, setstart_time] = useState(new Date());
  const [completion_time, setcompletion_time] = useState(new Date());
  const [_c, set_c] = useState(1);
  const [scores, setScores] = useState([]);
  let ndigits = levels[level]['ndigits'];
  let randnumbs = getRandomNumbers(level, operation);

  const ResultNumber = (randnumbs, operation) => {
    let resnumber = 0;
    switch (operation) {
      case 'Addition':
        resnumber = randnumbs[0] + randnumbs[1];
        break;
      case 'Subtraction':
        resnumber = randnumbs[0] - randnumbs[1];
        break;
      case 'Multiplication':
        resnumber = randnumbs[0] * randnumbs[1];
        break;
      default:
        resnumber = 0;
    }
    return resnumber;
  };

  let resnumber = ResultNumber(randnumbs, operation);
  let nrdigits = resnumber.toString().length;

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [dialoginput, setDialoginput] = useState(0);

  const [randomnumbers, setrandomnumbers] = useState(randnumbs);
  const [resultnumber, setresultnumber] = useState(resnumber);
  const [guessdigits, setguessdigits] = useState(new Array(nrdigits).fill(0));
  const [isRightGuesses, setisRightGuesses] = useState(
    new Array(nrdigits).fill(false),
  );
  useEffect(() => {
    const fetchData = async () => {
      await AsyncStorage.getItem('scores')
        .then(res => JSON.parse(res))
        .then(res => (res ? setScores(res) : setScores([])))
        .catch(e => console.error(e));
    };
    const timer = setTimeout(() => {
      fetchData();
      console.log('loading data');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let _c1 = 0;
    // console.log('scores.length in use effect' ,scores.length)
    // console.log(scores)
    scores.length > 0
      ? (_c1 = scores.filter(
          k =>
            k[2] == level && k[0] == user.id && k[1] == op_type_defs[operation],
        ).length)
      : null;
    setCount(_c1 + 1);
  }, [scores]);
  useEffect(() => {
    refreshPage();
  }, [insidelevel]);

  function refreshPage() {
    randnumbs = getRandomNumbers(level, operation);
    resnumber = ResultNumber(randnumbs, operation);
    nrdigits = resnumber.toString().length;
    setrandomnumbers(randnumbs);
    setresultnumber(resnumber);
    setguessdigits(new Array(nrdigits).fill(0));
    setisRightGuesses(new Array(nrdigits).fill(false));
    // scores.push([user_id, op_type_defs[operation],level,start_time.toJSON(),completion_time-start_time,true])
    setScores([
      ...scores,
      [
        user.id,
        op_type_defs[operation],
        level,
        start_time.toJSON(),
        completion_time - start_time,
        true,
      ],
    ]);
    const timer = setTimeout(() => {
      // console.log('giving time to store')
      storeData('scores', scores);
      // console.log('After save',scores)
    }, 50);

    // console.log(scores)
    setstart_time(new Date());
    return () => clearTimeout(timer);
  }

  return (
    <ImageBackground
      source={require('../assets/dark_bg.png')}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.heading}>{operation}</Text>
        <View style={styles.line} />
        <View style={styles.mathcontainer}>
          <ImageBackground
            imageStyle={{borderRadius: 15}}
            source={require('../assets/dark-black-vector-background.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: 350}}>
            <View style={{top: -50}}>
              <NumberElement
                mystyles={styles}
                randomnumbers={randomnumbers}
                operation={operation}
              />
              <View style={styles.line50} />
              <Result
                mystyles={styles}
                levels={levels}
                randomnumbers={randomnumbers}
                resultnumber={resultnumber}
                resinput={{
                  guessdigits: guessdigits,
                  setguessdigits: setguessdigits,
                  isRightGuesses: isRightGuesses,
                  setisRightGuesses: setisRightGuesses,
                  completiontime: completion_time,
                  setcompletiontime: setcompletion_time,
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      {/* <Fireworks /> */}

      <View style={styles.score}>
        <View style={styles.levelfab}>
          {user.isc}
          <ModalDropdown
            style={{alignSelf: 'center', fontSize: 20}}
            defaultValue={'Level 2'}
            options={levels.map(l => 'Level ' + (l.level + 1).toString())}
            onSelect={(idx, value) =>
              setLevel(parseInt(value.substring(5, 7)) - 1)
            }
          />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/gold-coins-slant.png')}
            />
            <View style={styles.coin_number_view}>
              <Text style={styles.coin_star_number}>000</Text>
            </View>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/gold-star.png')}
            />
            <View style={styles.star_number_view}>
              <Text style={styles.coin_star_number}>00</Text>
            </View>
            <Badge status="error" value={'00'} />
          </View>

          <ImageBackground
            style={styles.scoreboard}
            source={require('../assets/score-board.png')}>
            <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 0}}>
              Scorees
            </Text>
          </ImageBackground>
        </View>
      </View>

      <FAB
        style={styles.fab}
        medium
        icon=""
        label="Next"
        onPress={refreshPage}
        disabled={!isRightGuesses.every(v => v === true)}
      />

      {!user.ischild ? (
        <TouchableHighlight
          style={styles.addtostack}
          // onPress={() => console.log('clicked')}
          onPress={() => {
            // console.log('clicked');
            setIsDialogVisible(true);
          }}>
          <Text>+ Stack</Text>
        </TouchableHighlight>
      ) : null}
      <Text>{dialoginput + ' ' + insidelevel}</Text>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={operation + 's : level: ' + (insidelevel + 1)}
        message={'Set number of operations for stack'}
        hintInput={'Number'}
        textInputProps={{keyboardType: 'numeric'}}
        submitInput={inputText => {
          setDialoginput(inputText);
          console.log('input set');
          setIsDialogVisible(false);
        }}
        closeDialog={() => {
          setIsDialogVisible(false);
        }}></DialogInput>
    </ImageBackground>
  );
};
