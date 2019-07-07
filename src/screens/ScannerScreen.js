import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TextInput,
  NativeModules,
  Platform
} from "react-native";
import { Actions } from "react-native-router-flux";
import Camera from "react-native-camera";
import Button from "../components/Button";
import styles from "../styles/ScannerScreenStyles";
import { closeUri, barcodeUri, pencilUri, flashlightUri } from "../assetsjs";

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraActive: true,
      modalVisible: false,
      productCode: null,
      lightOn: false,
      maskRowHeight: 0,
      maskColWidth: 0
    };

    this.onChangeOrientation = this.onChangeOrientation.bind(this);
    this.renderDoneButton = this.renderDoneButton.bind(this);
  }

  componentDidMount() {
    // Initial sizes
    this.onChangeOrientation();
    // Bind event
    Dimensions.addEventListener("change", this.onChangeOrientation);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.cameraActive !== this.state.cameraActive) {
      this.setState({
        cameraActive: true,
        productCode: null
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.orderId !== this.props.orderId) {
      return true;
    }

    if (nextState.cameraActive !== this.state.cameraActive) {
      return true;
    }

    if (nextState.modalVisible !== this.state.modalVisible) {
      return true;
    }

    if (nextState.productCode !== this.state.productCode) {
      return true;
    }

    if (nextState.lightOn !== this.state.lightOn) {
      return true;
    }

    if (nextState.maskRowHeight !== this.state.maskRowHeight) {
      return true;
    }

    if (nextState.maskColWidth !== this.state.maskColWidth) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChangeOrientation);

    this.setState({
      cameraActive: false
    });
  }

  onChangeOrientation() {
    const { height, width } = Dimensions.get("window");
    const maskRowHeight = Math.round((height - 300) / 20);
    const maskColWidth = (width - 300) / 2;

    this.setState({
      maskRowHeight,
      maskColWidth
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const torchManager = NativeModules.TorchManager;
    const { cameraActive } = this.state;

    return (
      <View style={styles.transparentView}>
        {cameraActive && this.renderCamera()}
        <View style={styles.reminderView}>
          <Text style={styles.reminder}>Please Scan a valid Barcode</Text>
        </View>
        <View style={styles.buttonView}>
          <Button pressFunc={() => Actions.pop()}>
            <Image
              source={closeUri}
              resizeMode="contain"
              style={styles.closeIcon}
            />
          </Button>
        </View>
        <View style={styles.accesoryView}>
          <View style={{ flex: 1 }}>
            <Button verticle>
              <Image
                source={barcodeUri}
                style={[
                  styles.barcodeIcon,
                  { tintColor: this.state.modalVisible ? "white" : "#3E92CB" }
                ]}
              />
              <Text
                style={[
                  styles.accesoryText,
                  { color: this.state.modalVisible ? "white" : "#3E92CB" }
                ]}
              >
                Scan
              </Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              verticle
              pressFunc={() => {
                this.setState({ modalVisible: true });
              }}
            >
              <Image
                source={pencilUri}
                style={[
                  styles.pencilIcon,
                  { tintColor: this.state.modalVisible ? "#3E92CB" : "white" }
                ]}
              />
              <Text
                style={[
                  styles.accesoryText,
                  { color: this.state.modalVisible ? "#3E92CB" : "white" }
                ]}
              >
                Manual Input
              </Text>
            </Button>
          </View>
        </View>
        <View
          style={[
            styles.flashlight,
            { marginTop: Platform.OS === "ios" ? 0 : -10 }
          ]}
        >
          <Button
            verticle
            pressFunc={() => {
              if (Platform.OS === "ios") {
                torchManager.switchFlash(!this.state.lightOn);
              }
              this.setState({ lightOn: !this.state.lightOn });
            }}
          >
            <Image
              source={flashlightUri}
              style={[
                styles.flashlightIcon,
                { tintColor: this.state.lightOn ? "#3E92CB" : "white" }
              ]}
            />
            <Text style={styles.flashlightText}>
              Tap to turn light {this.state.lightOn ? "off" : "on"}
            </Text>
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modal}>
            <Text style={styles.codeTitle}>Please Enter a Product Code</Text>
            <TextInput
              style={styles.codeInput}
              onChangeText={text => this.setState({ productCode: text })}
              returnKeyType="done"
              autoCorrect={false}
              autoFocus={true}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingBottom: 10
              }}
            >
              {this.renderCancelButton()}
              {this.renderDoneButton()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  renderCamera() {
    const { maskRowHeight, maskColWidth } = this.state;

    return (
      <Camera
        onBarCodeRead={this.onScanSuccess.bind(this)}
        style={styles.cameraView}
        aspect={Camera.constants.Aspect.fill}
        torchMode={
          this.state.lightOn
            ? Camera.constants.TorchMode.on
            : Camera.constants.TorchMode.off
        }
        flashMode={Camera.constants.FlashMode.off}
        playSoundOnCapture
      >
        <View style={styles.maskOutter}>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
          />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            <View style={styles.maskInner} />
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          </View>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
          />
        </View>
      </Camera>
    );
  }

  renderCancelButton() {
    return (
      <Button
        style={styles.modalButton}
        pressFunc={() => this.setModalVisible(false)}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </Button>
    );
  }

  renderDoneButton() {
    const { productCode } = this.state;
    return (
      <Button
        style={styles.modalButton}
        disabled={productCode === null}
        pressFunc={() => {
          this.setModalVisible(false);
          Actions.confirm({
            productCode,
            orderId: this.props.orderId
          });
        }}
      >
        <Text
          style={[
            styles.buttonText,
            { color: productCode ? "black" : "lightgray" }
          ]}
        >
          Done
        </Text>
      </Button>
    );
  }

  onScanSuccess(e) {
    Actions.confirm({ QRInfo: e.data, orderId: this.props.orderId });
    this.setState({ cameraActive: false });
  }
}
