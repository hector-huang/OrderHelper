import React from 'react';
import {
  View,
} from 'react-native';
import OrderItem from './OrderItem';
import OrderItemTitle from './OrderItemTitle';

const OrderItems = ({
  item,
  index,
  onPress,
}) => {
  if (index === 0) {
    return (
      <View>
        <OrderItemTitle title="Latest Order:" />
        <OrderItem
          onPress={() => onPress(item.Id)}
          number={item.OrderNumber}
          name={item.Account.Name}
        />
      </View>
    );
  }
  
  if (index === 1) {
    return (
      <View>
        <OrderItemTitle
          style={{ color: "gray" }}
          title="Previous Orders:"
        />
        <OrderItem
          onPress={() => onPress(item.Id)}
          number={item.OrderNumber}
          name={item.Account.Name}
          style={{ backgroundColor: "#EEEEEE" }}
        />
      </View>
    );
  }

  return (
    <OrderItem
      onPress={() => onPress(item.Id)}
      number={item.OrderNumber}
      name={item.Account.Name}
      style={{ backgroundColor: "#EEEEEE" }}
    />
  )
};

export default OrderItems;