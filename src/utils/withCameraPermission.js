import React from 'react';
import {
  Alert,
} from 'react-native';
import Permissions from 'react-native-permissions'

const withCameraPermission = WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermission: null,
    }

    this.alertForCameraPermission = this.alertForCameraPermission.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
  }

  componentDidMount() {
    this.checkPermission();
  } 

  checkPermission() {
    Permissions.check('camera').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ cameraPermission: response })
    })
  }

  // Request permission to access photos
  requestPermission = () => {
    Permissions.request('camera').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ cameraPermission: response })
    })
  }

  // This is a common pattern when asking for permissions.
  // If the user already denied access, we can ask them to enable it from settings.
  alertForCameraPermission() {
    const { cameraPermission } = this.state;
    Alert.alert(
      'Can we access your camera?',
      'We need access so you can use a scanner',
      [
        {
          text: 'No',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        cameraPermission == 'undetermined'
        ? { text: 'OK', onPress: this.requestPermission }
        : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  }

  render() {
    const { cameraPermission } = this.state;

    return (
      <WrappedComponent
        alertForCameraPermission={this.alertForCameraPermission}
        checkCameraPermission={this.checkPermission}
        cameraPermission={cameraPermission}
        {...this.state}
        {...this.props}
      />
    );
  }
};
 

export default withCameraPermission;