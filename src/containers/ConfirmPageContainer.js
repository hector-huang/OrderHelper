import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { uploadOrder } from "../api/SalesforceAPI";
import { saveOrderItem, triggerEmailer, emptyOrderItems } from "../actions";
import ConfirmScreen from "../screens/ConfirmScreen";

function mapStateToProps({ saveOrders }) {
  return {
    savedOrdersItems: saveOrders.items,
    sendEmailSuccess: saveOrders.isSendEmailSuccess,
    sendEmailFailure: saveOrders.isSendEmailFailure,
    uploadOrders: uploadOrder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveOrderItem,
      triggerEmailer
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ConfirmScreen);
