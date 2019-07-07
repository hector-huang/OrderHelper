import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    padding: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 20,
    color: "grey",
    fontWeight: "bold"
  },
  qtyInput: {
    fontSize: 30,
    paddingLeft: 10,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#E1E0E1"
  },
  icon: {
    width: "100%",
    height: 50,
    flex: 1,
    alignSelf: "center"
  },
  successText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    flex: 4
  },
  button: {
    flex: 1,
    height: 80,
    marginBottom: 20,
    alignItems: "center"
  },
  buttonPrimary: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
    flexBasis: 200
  },
  buttonPrimaryIcon: {
    height: 50,
    flexBasis: 50,
    marginRight: 10
  },
  buttonDanger: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    justifyContent: "center"
  },
  buttonDark: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    justifyContent: "center"
  },
  buttonDarkIcon: {
    height: 50,
    flexBasis: 50,
    marginRight: 10
  }
});


export default styles;