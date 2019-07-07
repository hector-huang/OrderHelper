import React from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import TouchableButton from './TouchableButton';

const Button = ({
  title,
  verticle,
  children,
  style,
  ...rest,
}) => {
  let customStyles = style || [];
  return (
    <TouchableButton
      {...rest} 
      style={
        verticle
        ? [styles.buttonVerticle, ...customStyles]
        : [styles.buttonHorizontal, ...customStyles]
      }
    >
      {children || <Text>Button Text</Text>}
    </TouchableButton>
  );
};

const styles = StyleSheet.create({
  buttonVerticle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Button;
