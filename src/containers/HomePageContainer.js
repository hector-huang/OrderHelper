import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux'; 
import { requestOrder } from "../api/SalesforceAPI";
import HomePageScreen from '../screens/HomePageScreen';

function mapStateToProps(state) {
  return {
    requestOrders: requestOrder,
  };
}

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HomePageScreen);