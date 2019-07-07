import React, { Component } from "react";
import {
  TouchableOpacity, 
  Text,
  View,
  Image, 
  Alert,
} from "react-native"; 
import { Actions } from "react-native-router-flux";
import ActivityIndicator from '../components/ActivityIndicator';
import OrderItemsList from '../components/OrderItemsList';
import {
  signoutUri,
  suttonLogoUri,
} from '../assetsjs';
import styles from '../styles/HomeScreenStyles';
import shallowEqual from '../utils/shallowEqual';

export default class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isRefreshing: true,
    };

    this.fetchOrders = this.fetchOrders.bind(this);
    this.openScannerView = this.openScannerView.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }
 
  fetchOrders() {
    const { requestOrders } = this.props;
    
    requestOrders()
    .then((data) => {
      this.setState({ orders: data.records });
      this.setState({ isRefreshing: false });
    })
    .catch(err => {
      Alert.alert(
        "Salesforce Request Error",
        err.message,
        [
          {
            text: "OK",
            onPress: () =>
              // You mean recall again when loadded is failed?
              requestOrders()
              .then(data => {
                this.setState({ orders: data.records });
                this.setState({ isRefreshing: false });
              })
              .catch(err => {
                this.setState({ isRefreshing: false });
                Alert.alert(
                  "Salesforce Request Error",
                  err.message,
                  [
                    {
                      text: "OK"
                    }
                  ],
                { cancelable: false }
              );
            })
          }
        ],
        { cancelable: false }
      );
    });
  };

  // @TODO create new reuseable header component
  renderHeader() {
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => {
            // oauth.logout();
            // this.setState({ hasLoggedIn: false });
          }}
        >
          <Image
            source={signoutUri}
            resizeMode="contain"
            style={styles.iconLogout}
          />
        </TouchableOpacity>
        <Image
          source={suttonLogoUri}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Please select an order to begin</Text>
      </View>
    );
  }
    
  openScannerView(orderId) {
    if (!orderId) {
      return;
    }

    try {
      Actions.scanner({ orderId });
    } catch (error) {
      Alert.alert(`Oops! ${JSON.stringify(error)}`);
    }
  }

  render() {
    const {
      orders,
      isRefreshing,
    } = this.state;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {isRefreshing && <ActivityIndicator />}
        {orders.length !== 0 && 
          <OrderItemsList
            orders={orders}
            onPressOrder={this.openScannerView}
            isRefreshing={isRefreshing}
            onRefresh={this.fetchOrders}
          />
        }
      </View>
    );
  }
}
