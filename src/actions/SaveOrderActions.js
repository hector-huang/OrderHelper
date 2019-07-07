import {
  triggerEmailConfirm,
} from "../api/SalesforceAPI";

import {
  SAVE_ORDER,
  EMPTY_ORDER,
  SAVE_ORDERS_SUCCESS,
  SAVE_ORDERS_FAILURE,
} from "./types";

export const saveOrderItem = (data) => {
  return {
    type: SAVE_ORDER,
    payload: data,
  };
};

export const emptyOrderItems = () => {
  return {
    type: EMPTY_ORDER
  };
};

export const saveOrderItemsSuccess = (payload) => {
  return {
    type: SAVE_ORDERS_SUCCESS,
    payload,
  }
}

export const saveOrderItemFailure = (err) => {
  return {
    type: SAVE_ORDERS_FAILURE,
    payload: new Error(err || 'Something went wrong'),
  };
};

export const triggerEmailer = () => {
  return (dispatch, getState) => {
    const orderItems = getState().saveOrders.items;
    if (!Array.isArray(orderItems)) {
      return;
    }

    if (orderItems.length === 0) {
      return;
    }
  
    triggerEmailConfirm(orderItems)
    .then(res => {
      dispatch(saveOrderItemsSuccess(res));
      dispatch(emptyOrderItems());
    })
    .catch(err => dispatch(saveOrderItemFailure(err)));
  }
}
