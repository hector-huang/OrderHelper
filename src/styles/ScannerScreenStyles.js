import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  transparentView: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  cameraView: {
    flex: 1
  },
  reminderView: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100%"
  },
  reminder: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    paddingTop: 80
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" },
  icon: {
    width: "100%",
    flex: 1
  },
  closeIcon: {
    height: 30,
  },
  buttonView: {
    position: "absolute",
    right: 0,
    top: 20,
    width: 50
  },
  closeButton: {
    height: 50
  },
  accesoryView: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    paddingTop: 20,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100
  },
  accesoryText: {
    fontSize: 15,
    alignSelf: "center"
  },
  barcodeIcon: {
    width: 40,
    height: 40,
    tintColor: "#3E92CB"
  },
  pencilIcon: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginBottom: 5
  },
  flashlight: {
    position: "absolute",
    alignItems: "center",
    top: "50%",
    left: 0,
    width: "100%"
  },
  flashlightIcon: {
    width: 30,
    height: 30,
    marginTop: 100
  },
  flashlightText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center"
  },
  modal: {
    position: "absolute",
    width: "80%",
    top: "30%",
    left: "10%",
    borderRadius: 5,
    backgroundColor: "white"
  },
  codeTitle: {
    marginTop: 5,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "black"
  },
  codeInput: {
    fontSize: 30,
    paddingLeft: 10,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#E1E0E1"
  },
  modalButton: {
    flex: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    color: "black"
  }
});

export default styles;
