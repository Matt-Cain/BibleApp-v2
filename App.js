import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { ThemeProvider } from "./context/ThemeProvider";
import store from './store';
import Tabs from "./navigation/Tabs";

const App = () => (
	<Provider store={store}>
		<ThemeProvider>
			<NavigationContainer>
				<Tabs />
			</NavigationContainer>
		</ThemeProvider>
	</Provider>
);

export default App;
