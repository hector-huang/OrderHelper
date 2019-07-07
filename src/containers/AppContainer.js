import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';  
import {
  checkAppAuthentication,
} from '../actions/AppActions';
// screens
import AppScreen from '../screens/AppScreen';
import withCameraPermission from '../utils/withCameraPermission';

function mapStateToProps({ app }) {
  return {
    isLogged: app.isLogged,
    isLoggingIn: app.isLoggingIn,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkAuth: checkAppAuthentication,
  }, dispatch);
}
  
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withCameraPermission,
)(AppScreen)