import React, {useState} from 'react'
import { Text, View, Image,TextInput } from 'react-native';
// import {Checkmark} from 'react-checkmark'
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}
export const NumberElement = ({mystyles,randomnumbers,operation}) => {   
  const arithops=[{name:'Addition',operator:'+'},{name:'Subtraction',operator:'−'},
{name:'Multiplication',operator:'×'},{name:'Division',operator:'÷'},{name:'Comparisons',operator:'='}]

    return (
        <>
        <Text style={mystyles.abs_sign}>{arithops.filter((k)=>k.name==operation)[0]["operator"]}</Text>
        {/* <Text style={mystyles.heading}> {randomnumbers[0]}{randomnumbers[1]}{randomnumbers[0]+randomnumbers[1]}  </Text> */}
        <View style={mystyles.intro}>        
          {randomnumbers[0].toString().split('').map((s)=> <Text key= {makeid(2)} style={mystyles.num}>{s}</Text>  )}
        </View>        
        <View style={mystyles.intro}>
          {randomnumbers[1].toString().split('').map((s)=> <Text key= {makeid(2)} style={mystyles.num}>{s}</Text>  )}          
        </View>
        </>
    )
}
