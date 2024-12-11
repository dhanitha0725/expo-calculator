//IM/2021/058
//K.D Kolonnage

import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "./Button";
import { Styles } from "../styles/GlobalStyles";
import { calculatorColors } from "../styles/Colors";
import Decimal from "decimal.js";

const MAX_DECIMALS = 6;

export default function CalKeyboard() {
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);

  // calculate square root
  const calculateSquareRoot = (num) => {
    const decimalNum = new Decimal(num);
    if (decimalNum.isNegative()) {
      return "Error"; // handle negative numbers
    }
    const squareRootResult = decimalNum.sqrt();
    return formatDecimal(squareRootResult);
  };

  // calculate percentage
  const calculatePercentage = () => {
    const input = currentValue || result;
    if (!input || isNaN(input)) {
      return setResult("Error");
    }
    const currentDecimal = new Decimal(input);
    const percentageResult = currentDecimal.dividedBy(100);
    setResult(formatDecimal(percentageResult));
    setCurrentValue(formatDecimal(percentageResult));
    setPreviousValue(null);
    setOperation("");
  };

  // formant decimals
  const formatDecimal = (decimalValue) => {
    if (decimalValue instanceof Decimal) {
      return decimalValue.isInteger()
        ? decimalValue.toString()
        : decimalValue.toFixed(MAX_DECIMALS).replace(/\.?0+$/, ""); // eliminate 0s
    } else {
      return decimalValue.toString();
    }
  };

  // handle number input
  const handleNumberPress = (buttonValue) => {
    if (result !== null && currentValue === "") {
      setCurrentValue(buttonValue);
      setResult(null);
      return;
    }
    if (currentValue.length < 10) {
      const newValue = currentValue + buttonValue;
      setCurrentValue(newValue);
    }
  };

  // handle operation input
  const handleOperationPress = (buttonValue) => {
    if (!currentValue && buttonValue !== "-" && result === null) return; //allow negative numbers

    // handle percentage
    if (buttonValue === "%") {
      calculatePercentage();
      return;
    }

    // handle square root
    if (buttonValue === "√") {
      const input = currentValue || result;
      if (!input || isNaN(input)) {
        setResult("Error");
        return;
      }
      const squareRootResult = calculateSquareRoot(parseFloat(input));
      setResult(squareRootResult);
      setPreviousValue(null);
      setCurrentValue(squareRootResult);
      setOperation("");
      return;
    }

    if (operation && currentValue === "") {
      // update the last operator if a new operator is pressed consecutively
      setOperation(buttonValue);
      return;
    }

    if (currentValue) {
      if (previousValue !== null && operation) {
        const newResult = calculate(
          previousValue,
          parseFloat(currentValue),
          operation
        );
        setPreviousValue(newResult);
        setResult(newResult);
      } else {
        setPreviousValue(parseFloat(currentValue));
      }
      setOperation(buttonValue);
      setCurrentValue("");
    } else if (buttonValue === "-" && currentValue === "") {
      setCurrentValue("-");
    }
  };

  // perform basic arithmetic operations
  const calculate = (num1, num2, operation) => {
    let calcResult;
    const decimalNum1 = new Decimal(num1);
    const decimalNum2 = new Decimal(num2);
    try {
      switch (operation) {
        case "+":
          calcResult = decimalNum1.plus(decimalNum2);
          break;
        case "-":
          calcResult = decimalNum1.minus(decimalNum2);
          break;
        case "x":
          calcResult = decimalNum1.times(decimalNum2);
          break;
        case "÷":
          if (decimalNum2.isZero()) {
            calcResult = "Error";
          } else {
            calcResult = decimalNum1.div(decimalNum2);
          }
          break;
        default:
          calcResult = decimalNum1;
      }
    } catch (error) {
      calcResult = "Error";
    }
    return formatDecimal(calcResult);
  };

  // handle =
  const handleEqualPress = () => {
    if (operation && (currentValue || result)) {
      const finalResult = calculate(
        previousValue,
        parseFloat(currentValue),
        operation
      );
      setResult(finalResult);
      setPreviousValue(null);
      setCurrentValue(finalResult);
      setOperation("");
    } else if (currentValue && !operation) {
      setResult(parseFloat(currentValue));
      setCurrentValue(parseFloat(currentValue));
      setPreviousValue(null);
    }
  };

  // clear all inputs
  const clearInput = () => {
    setCurrentValue("");
    setPreviousValue(null);
    setOperation("");
    setResult(null);
  };

  // handle deletion
  const handleDelete = () => {
    if (result !== null) {
      // if result exists, clear it all at once
      setResult(null);
      setCurrentValue("");
    } else {
      // remove the last character from currentValue
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  // display the current value and result
  const displayValue = () => {
    const displayText = result !== null ? `${result}` : currentValue || "0";
    const visibleText = displayText.slice(0, 10);
    return (
      <Text
        style={[
          Styles.screenFirstNumber,
          {
            color: result !== null ? calculatorColors.result : undefined,
          },
        ]}
      >
        {visibleText}
      </Text>
    );
  };

  //render the component
  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          backgroundColor: calculatorColors.screen,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {previousValue} {operation} {currentValue}
        </Text>

        <Text style={Styles.screenFirstNumber}>{displayValue()}</Text>
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clearInput} />
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="√" isGray onPress={() => handleOperationPress("√")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("÷")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="x" isBlue onPress={() => handleOperationPress("x")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="⌫" onPress={handleDelete} />
        <Button title="=" onPress={handleEqualPress} />
      </View>
    </View>
  );
}
