import * as React from "react";
import { Appearance, StatusBar, SafeAreaView, View } from "react-native";
import { lightColors, darkColors } from "../utils/colorThemes";

export const ThemeContext = React.createContext({
  isDark: true,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === "dark");

  React.useEffect(() => {
    setIsDark(true);
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme) => setIsDark(scheme === "dark"),
  };

  const barStyle = isDark ? "light-content" : "dark-content";

  return (
    <ThemeContext.Provider value={defaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: defaultTheme.colors.background }}>
        {props.children}
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};
