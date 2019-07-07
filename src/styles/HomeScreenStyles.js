import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonLogout: {
    position: "absolute",
    right: 5,
    top: 40,
    height: 20
  },
  iconLogout: {
    height: 20,
    width: 30
  },
  logo: {
    marginTop: 30,
    width: "80%",
    height: 100,
    alignSelf: "center"
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: "#3E92CB",
    alignSelf: "center",
    fontWeight: "bold"
  },
  list: {
    marginTop: 10,
    flex: 1
  },
  listItem: {
    paddingBottom: 10,
    paddingLeft: 15,
    fontSize: 25,
    color: "#3E92CB",
    backgroundColor: "#EDFAFF",
    fontWeight: "bold"
  },
});

export default styles;