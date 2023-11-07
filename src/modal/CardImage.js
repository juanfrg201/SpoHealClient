import React from 'react';
import { View, Image, StyleSheet} from 'react-native';


const CardImage = ({  }) => {
    return (
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/LogoBG.png')}
          style={styles.profileImage}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
});

export default CardImage;