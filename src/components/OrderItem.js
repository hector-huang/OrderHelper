import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const OrderItem = ({
  onPress,
  number,
  name,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.itemId, style]}>
        {`Order ${number || '0'}`}
      </Text>
      <Text style={[styles.listItem, style]}>{name || 'Name'}</Text>
      <View style={styles.space} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingBottom: 10,
    paddingLeft: 15,
    fontSize: 25,
    color: "#3E92CB",
    backgroundColor: "#EDFAFF",
    fontWeight: "bold"
  },
  itemId: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 20,
    color: "gray",
    backgroundColor: "#EDFAFF",
    fontWeight: "bold",
    opacity: 0.8
  },
  space: {
    height: 10
  }
});

export default OrderItem;