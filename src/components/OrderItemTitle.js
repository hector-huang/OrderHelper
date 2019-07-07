import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

const OrderItemTitle = ({
  style,
  title,
}) => (
  <Text style={[styles.orderTitle, style]}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  orderTitle: {
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 20,
    color: "#3E92CB",
    fontWeight: "bold"
  }, 
});

export default OrderItemTitle;