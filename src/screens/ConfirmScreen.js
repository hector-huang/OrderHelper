import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";
import {
  approvedIconUri,
  addIconUri,
  failureIconUri,
  listIconUri
} from "../assetsjs";

import styles from "../styles/ConfirmScreenStyles.js";

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      fetchError: null,
      fetchSuccess: false,
      afterFetchSuccess: false,
      quantity: 0
    };

    this.timer = null;
    this.updateOrders = this.updateOrders.bind(this);
  }

  componentDidMount() {
    console.log("ConfirmPage", this.props);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sendEmailSuccess) {
      Actions.home();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <AppHeader />
          <Text style={styles.title}>
            {`Items: ${this.props.QRInfo || this.props.productCode}`}
          </Text>
          <TextInput
            style={styles.qtyInput}
            keyboardType="numeric"
            placeholder="QTY"
            onChangeText={text => this.setState({ quantity: parseInt(text) })}
          />
          <ScrollView style={styles.buttonContainer}>
            {this.renderAddButton()}
            {this.renderCancelButton()}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.renderSwitchButton()}
              {this.renderFinishButton()}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderAddButton() {
    if (this.state.isFetching) {
      return (
        <Button
          style={[styles.button, { backgroundColor: "#4A90E3" }]}
          disabled={true}
        >
          <ActivityIndicator size="large" color="white" />
        </Button>
      );
    } else if (this.state.fetchSuccess) {
      if (!this.state.afterFetchSuccess) {
        this.timer = setTimeout(() => {
          this.setState({ afterFetchSuccess: true });
          this.renderAddButton();
        }, 1000);
        return (
          <Button
            style={[styles.button, { backgroundColor: "#79B74F" }]}
            disabled={true}
          >
            <Image
              source={approvedIconUri}
              resizeMode="contain"
              style={styles.buttonPrimaryIcon}
            />
            <Text style={[styles.buttonPrimary, { fontSize: 20 }]}>
              Successfully Added
            </Text>
          </Button>
        );
      }
      return (
        <Button
          style={[styles.button, { backgroundColor: "#79B74F" }]}
          pressFunc={() => Actions.pop({ refresh: { test: Math.random() } })}
        >
          <Image
            source={require("../images/add.png")}
            resizeMode="contain"
            style={styles.buttonPrimaryIcon}
          />
          <Text style={[styles.buttonPrimary, { fontSize: 20 }]}>
            Add another item
          </Text>
        </Button>
      );
    } else if (this.state.fetchError) {
      return (
        <Button
          style={[styles.button, { backgroundColor: "#D0021B" }]}
          pressFunc={() => Actions.pop({ refresh: { test: Math.random() } })}
        >
          <Image
            source={failureIconUri}
            resizeMode="contain"
            style={styles.buttonPrimaryIcon}
          />
          <Text style={[styles.buttonPrimary, { fontSize: 20 }]}>
            {this.state.fetchError}
          </Text>
        </Button>
      );
    }
    return (
      <Button
        style={[
          styles.button,
          {
            backgroundColor:
              this.state.quantity === 0 || !this.state.quantity
                ? "#BDD3F1"
                : "#4A90E3"
          }
        ]}
        disabled={
          this.state.quantity === 0 || !this.state.quantity ? true : false
        }
        pressFunc={() => this.updateOrders()}
      >
        <Image
          source={addIconUri}
          resizeMode="contain"
          style={styles.buttonPrimaryIcon}
        />
        <Text style={styles.buttonPrimary}>Add to order</Text>
      </Button>
    );
  }

  renderCancelButton() {
    return (
      <Button
        style={[
          styles.button,
          {
            backgroundColor:
              this.state.isFetching ||
              this.state.fetchSuccess ||
              this.state.fetchError
                ? "#ECBEBE"
                : "#D0021B"
          }
        ]}
        disabled={
          this.state.isFetching || this.state.fetchSuccess ? true : false
        }
        pressFunc={() => Actions.pop({ refresh: { test: Math.random() } })}
      >
        <Text style={styles.buttonDanger}>Cancel</Text>
      </Button>
    );
  }

  renderSwitchButton() {
    const { triggerEmailer } = this.props;
    return (
      <Button
        style={[
          styles.button,
          {
            marginRight: 10,
            backgroundColor: this.state.isFetching ? "#E1E0E1" : "gray"
          }
        ]}
        disabled={this.state.isFetching ? true : false}
        pressFunc={() => {
          triggerEmailer();
          Actions.home();
        }}
      >
        <Image
          source={listIconUri}
          resizeMode="contain"
          style={styles.buttonDarkIcon}
        />
        <Text style={styles.buttonDark}>Switch</Text>
      </Button>
    );
  }

  renderFinishButton() {
    const { isFetching, fetchError } = this.state;
    const isDisabled = isFetching || fetchError;

    return (
      <Button
        style={[
          styles.button,
          {
            marginLeft: 10,
            backgroundColor: isDisabled ? "#F7DCB4" : "#F5A623"
          }
        ]}
        disabled={isDisabled}
        pressFunc={() => this.openSFApp()}
      >
        <Text style={styles.successText}>Finish</Text>
      </Button>
    );
  }

  openSFApp = () => {
    this.props.triggerEmailer();

    Linking.canOpenURL("salesforce1://sObject/" + this.props.orderId + "/view")
      .then(supported => {
        if (!supported) {
          Alert.alert(
            null,
            "Salesforce App is not installed",
            [
              {
                text: "OK"
              }
            ],
            { cancelable: false }
          );
        } else {
          Linking.openURL(
            "salesforce1://sObject/" + this.props.orderId + "/view"
          );
          Actions.home();
        }
      })
      .catch(err => {
        Alert.alert(
          null,
          err.message,
          [
            {
              text: "OK"
            }
          ],
          { cancelable: false }
        );
      });
  };

  updateOrders() {
    const { quantity } = this.state;

    const { uploadOrders, orderId, QRInfo, productCode } = this.props;

    this.setState({ isFetching: true });

    if (QRInfo) {
      uploadOrders(orderId, quantity, QRInfo)
        .then(msg => {
          this.handleOrderSuccess(msg);
        })
        .catch(err => {
          this.handleOrderFail();
        });
    } else if (productCode) {
      uploadOrders(orderId, quantity, productCode)
        .then(msg => {
          this.handleOrderSuccess(msg);
        })
        .catch(err => {
          this.handleOrderFail();
        });
    }
  }

  handleOrderSuccess(msg) {
    const { saveOrderItem } = this.props;

    this.setState({ isFetching: false });
    if (msg.errorCode === 1001) {
      Alert.alert(
        null,
        msg.errorMessage,
        [
          {
            text: "OK",
            onPress: () => Actions.pop({ refresh: { test: Math.random() } })
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ fetchSuccess: true });
      if (msg.records[0].Id) {
        saveOrderItem(msg.records[0].Id);
      }
    }
  }

  handleOrderFail = () => {
    this.setState({ isFetching: false });
    this.setState({
      fetchError: "Failed to Add Item.\nplease scan again."
    });
  };
}

export default ConfirmPage;
