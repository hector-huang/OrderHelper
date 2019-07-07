import React from 'react';
import {
  FlatList,
  Text,
} from 'react-native';
import styles from '../styles/HomeScreenStyles';
import OrderItems from './OrderItems';

const OrderItemsList = ({
  orders,
  isRefreshing,
  onRefresh,
  onPressOrder,
}) => {
  if (orders.length === 0) {
    return (
      <Text style={styles.title}>
        No Open Orders. Please return to Salesforce 1 to create an order.
      </Text>
    );
  }
  
  return (
    <FlatList
      style={styles.list}
      data={orders}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={({ item, index }) => <OrderItems item={item} index={index} onPress={onPressOrder} />}
      keyExtractor={(item, index) => "key_" + index}
    />
  );
};

export default OrderItemsList;