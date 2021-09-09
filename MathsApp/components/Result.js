import React, {useState, useEffect} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import Svg, {Circle, Rect} from 'react-native-svg';
import {Icon} from 'react-native-eva-icons';

const CloseIcon = () => {
  <Icon name="close-circle-outline" fill="red" />;
};
const ModCloseIcon = condval => {
  if (condval !== 999) {
    return null;
  } else {
    return <CloseIcon width={50} height={50} />;
  }
};

let resultnumber = 0;
let resdigits = [0, 0];
export const Result = ({
  mystyles,
  levels,
  randomnumbers,
  resultnumber,
  resinput,
}) => {
  const CheckIcon = () => (
    <Icon name="checkmark-circle-2-outline" fill="green" />
  );
  let guessdigits = [...resinput.guessdigits];
  let isRightGuesses = [...resinput.isRightGuesses];
  let nrdigits = guessdigits.length;
  // let nrdigits=levels[1]['ndigits']
  let myfocusTruths = [...resinput.isRightGuesses];
  myfocusTruths[myfocusTruths.length - 1] = true;
  useEffect(() => {
    // resultnumber=randomnumbers[0]+randomnumbers[1]
    resdigits = resultnumber.toString().split('').map(Number);
    guessdigits = resinput.guessdigits;
    isRightGuesses = resinput.isRightGuesses;
    myfocusTruths = [...resinput.isRightGuesses];
    myfocusTruths[myfocusTruths.length - 1] = true;
    // setfocusTruths(myfocusTruths)

    nrdigits = guessdigits.length;
    console.log(
      'useeffect resdigits in result',
      resdigits.join(','),
      isRightGuesses.join(','),
      myfocusTruths.join(','),
    );
    // console.log('useeffect guessdigits,istureGuesses in result', resinput.guessdigits,resinput.isRightGuesses)
  }, [randomnumbers]);

  const bigaddDigit = (digit, k) => {
    addDigit(digit, k);
    // console.log('later bigguessdigits in result', resinput.guessdigits,guessdigits)
    console.log('bigaddDigit resdigits: ', resdigits.join(','));
  };
  const addDigit = (digit, k) => {
    let mydigits = [...guessdigits]; // copying the old datas array

    mydigits[k] = (digit * 1) % 10;

    guessdigits = mydigits;

    let istureGuesses = [...isRightGuesses];
    // console.log('k and resdigits',k,mydigits[k],resdigits.join(','))
    istureGuesses[k] = checkifRightGuess(mydigits[k], resdigits[k]);
    isRightGuesses = istureGuesses;

    resinput.setisRightGuesses(istureGuesses);
    resinput.setguessdigits(mydigits);
    istureGuesses.every(v => v === true)
      ? resinput.setcompletiontime(new Date())
      : null;
  };
  const checkifRightGuess = (guess, result) => guess == result;
  return (
    <>
      <View style={mystyles.intro}>
        {Array.apply(0, Array(nrdigits).fill(0))
          .map(function (_, b) {
            return b;
          })
          .map(k => (
            <TextInput
              pattern="[+-]?\d+(?:[.,]\d+)?"
              keyboardType="numeric"
              style={mystyles.input}
              key={String(k)}
              onChangeText={digit => bigaddDigit(digit, k)}
              value={isRightGuesses[k] ? guessdigits[k].toString() : ''}
              // autoFocus={focusTruths[k]}
              // placeholder=''
              // {guessdigits[k].toString() || '' }
              editable={!isRightGuesses[k]}
            />
          ))}
      </View>
      <View style={mystyles.line50} />
      <View style={mystyles.intro}>
        {Array.apply(0, Array(nrdigits).fill(0))
          .map(function (_, b) {
            return b;
          })
          .map(k => (
            <View style={mystyles.num} key={String(k)}>
              {isRightGuesses[k] ? <CheckIcon width={50} height={50} /> : null}
            </View>
          ))}
      </View>
    </>
  );
};
