import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const WaterPlanet = props => {
  const [scaleValue] = useState(new Animated.Value(1));

  const waterAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
        // useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,

        // useNativeDriver: true,
      }),
    ]).start(() => waterAnimation());
  };

  React.useEffect(() => {
    waterAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/water-planet.png')}
        style={[
          styles.pic,
          {
            transform: [
              {
                scale: scaleValue,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default WaterPlanet;

const styles = StyleSheet.create({
  pic: {
    height: 140,
    width: 180,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
