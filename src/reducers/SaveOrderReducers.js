import {
  SAVE_ORDER, 
  EMPTY_ORDER,
  SAVE_ORDERS_FAILURE,
  SAVE_ORDERS_SUCCESS,
} from "../actions/types";

const defautState = {
  isSendEmailSuccess: false,
  isSendEmailFailure: null,
  items: []
};

export default (state = defautState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return Object.assign({}, state, {
        items: state.items.concat(action.payload),
      });

    case SAVE_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        isSendEmailSuccess: true,
      });

    case SAVE_ORDERS_FAILURE:
      return Object.assign({}, state, {
        isSendEmailFailure: action.payload.message,
      });

    case EMPTY_ORDER:
      return defautState;

    default:
      return state;
  }
};
