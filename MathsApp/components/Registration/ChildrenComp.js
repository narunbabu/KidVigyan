import {Text, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {styles} from './Styles';
import {FlatList} from 'react-native';
const ChildrenComp = ({navigation, userdata, stackdata}) => {
  const [childrendata, setChildrendata] = useState(null);

  const Item = ({item, stackdata}) =>
    item.ischild ? (
      <TouchableHighlight
        style={styles.item}
        onPress={() =>
          navigation.navigate('GamesScreen', {
            user: item,
            stackdata: stackdata,
          })
        }>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableHighlight>
    ) : null;

  const renderItem = ({item}) => <Item item={item} stackdata={stackdata} />;

  //   console.log('in isuserdatadataloaded', userdata);
  //   useEffect(() => {
  //     if (isuserdatadataloaded) {
  //       console.log('userdata in children comp  ', userdata);
  //       userdata.filter(k => k.ischild == true).length > 0
  //         ? setChildrendata(userdata.filter(k => k.ischild)[0])
  //         : null;
  //     }
  //   }, [userdata]);

  return (
    <FlatList
      style={{flex: 1}}
      data={userdata}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ChildrenComp;
