import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ children, style, shape, pressFunc, disabled }) => {
  // const { buttonStyle, disabledStyle } = styles;
  let buttonStyle = null;
  let buttonBorderStyle = { borderRadius: 0 };

  switch (shape) {
    case "square":
      buttonBorderStyle = { borderRadius: 0 };
      break;
    case "round":
      buttonBorderStyle = { borderRadius: 10 };
      break;
    default:
      buttonBorderStyle = { borderRadius: 0 };
  }

  if (disabled) {
    return (
      <TouchableOpacity
        style={[buttonStyle, buttonBorderStyle, style]}
        disabled={true}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={pressFunc}
      style={[buttonStyle, buttonBorderStyle, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
});

export default Button;
