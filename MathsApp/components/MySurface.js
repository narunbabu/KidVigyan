import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {Badge, Icon, withBadge} from 'react-native-elements';
export const MySurface = ({myprops, myfunc}) => {
  [value, setValue] = useState('Look here');
  return (
    <>
      <Card onPress={() => myfunc()} style={styles.surface}>
        <Card.Content style={{alignItems: 'center'}}>
          <Avatar.Text
            size={60}
            label={myprops.operator}
            color={Colors.red200}
          />
          <Paragraph>{myprops.name}</Paragraph>
        </Card.Content>
        {myprops.num_problems > 0 ? (
          <Badge
            status="error"
            value={myprops.num_problems}
            containerStyle={{position: 'absolute', top: 0, right: -10}}
          />
        ) : null}
      </Card>
    </>
  );
};

export default MySurface;

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 120,
    margin: 10,
    width: 140,
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
