import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// Personal Imports
import { useTheme } from "../hooks/useTheme";
import { tabData } from "./tabData";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const { colors, isDark } = useTheme();

	const screenOptions = {
		headerShown: false,
		tabBarShowLabel: false,
		tabBarStyle: {
			position: "absolute",
			bottom: 25,
			left: 20,
			right: 20,
			elevation: 0,
			backgroundColor: colors.menuBackground,
			borderRadius: 15,
			height: 90,
			borderColor: "blue",
			...styles.shadow,
			justifyContent: "center",
			alignItems: "center",
		},
	}

	return (
		<View style={{ flex: 1 }}>
			<Tab.Navigator screenOptions={screenOptions}>
				{tabData.map(({ name, screen, icon, CustomButton }, index) => {
					const { Icon, iconName, size } = icon;
					const useCustomButton = CustomButton
						? (props) => <CustomButton {...props} />
						: undefined;

					return (
						<Tab.Screen
							name={name}
							component={screen}
							key={index}
							options={{
								tabBarIcon: ({ focused }) => (
									<View
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Icon
											name={iconName}
											color={focused ? colors.iconSelected : colors.icon}
											size={size}
										/>
									</View>
								),
								tabBarButton: useCustomButton,
							}}
						/>
					)
				})}
			</Tab.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "black",
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.5,
		elevation: 5,
		borderTopWidth: 0,
	},
});




export default Tabs;
