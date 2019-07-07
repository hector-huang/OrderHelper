import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native"; 

import { appLogoUri } from '../assetsjs';

const AppHeader = ({
  children,
  style,
  ...rest,
}) => {
  return (
    <View
      {...rest} 
      style={[styles.container, style]}
    >
      <Image
        source={appLogoUri}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
  },
  image: {
    width: '80%',
  }
});

export default AppHeader;
