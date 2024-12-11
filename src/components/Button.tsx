//IM/2021/058
//K.D Kolonnage

import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export default function Button({
  title,
  onPress,
  isBlue,
  isGray,
}: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      //apply styles
      style={
        isBlue
          ? Styles.btnBlue
          : isGray
          ? Styles.btnGray
          : theme === "light"
          ? Styles.btnLight
          : Styles.btnDark
      }
      onPress={onPress}
    >
      <Text
        //apply styles to text
        style={
          isBlue || isGray
            ? Styles.smallTextLight
            : theme === "light"
            ? Styles.smallTextDark
            : Styles.smallTextLight
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
