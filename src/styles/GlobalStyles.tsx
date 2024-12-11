//IM/2021/058
//K.D Kolonnage

import { StyleSheet } from "react-native";
import { calculatorColors } from "./Colors";

export const Styles = StyleSheet.create({
  //Buttons
  btnBlue: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: calculatorColors.blue,
    justifyContent: "center",
    alignItems: "center",
    //margin: 8,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  btnDark: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: calculatorColors.btnDark,
    justifyContent: "center",
    alignItems: "center",
    //margin: 8,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  btnLight: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: calculatorColors.white,
    justifyContent: "center",
    alignItems: "center",
    //margin: 8,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  btnGray: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: calculatorColors.gray,
    justifyContent: "center",
    alignItems: "center",
    //margin: 8,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  smallTextLight: {
    fontSize: 32,
    color: calculatorColors.white,
  },
  smallTextDark: {
    fontSize: 32,
    color: calculatorColors.black,
  },
  //Keyboard
  row: {
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  viewBottom: {
    position: "absolute",
    bottom: 20,
  },
  screenFirstNumber: {
    fontSize: 50,
    color: calculatorColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
  screenSecondNumber: {
    fontSize: 40,
    color: calculatorColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
  screenOperation: {
    fontSize: 32,
    color: calculatorColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
});
