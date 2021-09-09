import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {Badge, Icon, withBadge} from 'react-native-elements';
export const OperationButton = ({myprops, myfunc}) => {
  [value, setValue] = useState('Look here');
  return (
    <>
      <View style={styles.surface}>
        <Avatar.Text size={30} label={myprops.operator} color={Colors.red200} />        
        <Text style={{fontSize:9}}>{myprops.name}</Text>
        <Badge
          status="primary"
          value={myprops.num_problems}
        //   containerStyle={{position: 'absolute', top: 0, right: 0}}
        />
        <Badge
          status="error"
          value={'x'}
          containerStyle={{position: 'absolute', top: 0, right: 0}}
        />
      </View>
      
    </>
  );
};

export default OperationButton;

const styles = StyleSheet.create({
  surface: {
    // padding: -100,
    height: 80,
    marginTop: 10,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // backgroundColor:'#d4ed82',
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
