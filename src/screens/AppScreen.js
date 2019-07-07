import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import ActivityIndicator from '../components/ActivityIndicator';
import HomePageContainer from '../containers/HomePageContainer';
import ScannerPageContainer from '../containers/ScannerPageContainer';
import ConfirmPageContainer from '../containers/ConfirmPageContainer';
 
class AppScreen extends React.Component {
  async componentWillMount() {
    this.props.checkAuth();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.cameraPermission !== this.props.cameraPermission) {
      return true;
    }

    if (nextProps.isLogged !== this.props.isLogged) {
      return true;
    }

    if (nextProps.isLoggingIn !== this.props.isLoggingIn) {
      return true;
    }

    return false;
  }

  renderLoadingView() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }

  renderLoginMessageView() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>
          Please log in screen maybe?
        </Text>
      </View>
    )
  }

  render() {
    console.log('AppScreen', this.props);

    const {
      isLoggingIn,
      isLogged,
      cameraPermission,
    } = this.props;
     
    if (isLoggingIn) {
      return this.renderLoadingView();
    }

    if (!isLogged) {
      return this.renderLoginMessageView();
    }

    if (cameraPermission === 'denied') {
      this.props.alertForCameraPermission();
    }

    return (
      <Router uriPrefix='suttonscan://'>
        <Stack key='root'>
          <Scene
            key='home'
            component={HomePageContainer}
            hideNavBar={true}
          />
          <Scene
            key='scanner'
            path='order/:orderId'
            component={ScannerPageContainer}
            hideNavBar={true}
          />
          <Scene
            key='confirm'
            component={ConfirmPageContainer}
            hideNavBar={true}
          />
        </Stack>
      </Router>
    )
  }
}

export default AppScreen;