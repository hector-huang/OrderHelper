import { net } from "react-native-force";

function sendRequest(apexEndpoint, payload = {}) {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      apexEndpoint,
      response => {
        resolve(response);
      },
      error => {
        reject(error);
      },
      "GET",
      payload
    );
  });
}
 
export function uploadOrder(orderId, productQty, code) {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      "/QuantityOrderUpload",
      response => {
        resolve(response);
      },
      error => {
        reject(error);
      },
      "POST",
      { orderId, productQty, code }
    );
  });
}

export function triggerEmailConfirm(orderIds) {
  if (!orderIds) {
    return;
  }

  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      "/SendOrderConfirmationEmail",
      response => {
        resolve(response);
      },
      error => {
        reject(error);
      },
      "POST",
      { setOfIds: orderIds || [] }
    );
  });
}

// Import to make sure you return the promise from sendRequest
export function requestOrder() {
  return sendRequest("/UserOrderList");
}
