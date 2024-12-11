//IM/2021/058
//K.D Kolonnage

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Switch, SafeAreaView } from "react-native";
import { ThemeContext } from "./src/context/ThemeContext";
import { calculatorColors } from "./src/styles/Colors";
import CalKeyboard from "./src/components/CalKeyboard";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === "light"
            ? styles.container
            : [styles.container, { backgroundColor: "#000" }]
        }
      >
        <StatusBar style={theme === "light" ? "dark" : "light"} />
        <Switch
          value={theme === "dark"}
          onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <CalKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: calculatorColors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
