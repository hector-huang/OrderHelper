import { combineReducers } from "redux";
import SaveOrderReducers from "./SaveOrderReducers";
import AppReducers from './AppReducers';

export default combineReducers({
  saveOrders: SaveOrderReducers,
  app: AppReducers,
});
