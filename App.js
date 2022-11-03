import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeProvider";
import Tabs from "./navigation/Tabs";

const App = () => {
  return (
    <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </ThemeProvider>
    </SafeAreaProvider>
  );
};
export default App;
