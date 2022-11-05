import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";

const CustomTabBarButton = ({ children, onPress }) => {
	const { colors, isDark } = useTheme();

	return (
		<TouchableOpacity
			style={{
				top: -40,
				elevation: 5,
			}}
			onPress={() => {
				// setNavButtonState(true);
			}}
		>
			<View
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
					justifyContent: "center",
					alignItems: "center",
					  backgroundColor: colors.background,
				}}
			>
				<View
					style={{
						width: 75,
						height: 75,
						borderRadius: 37.5,
						backgroundColor: colors.addButton,
						// ...styles.shadow,
					}}
				>
					{children}
				</View>
			</View>
		</TouchableOpacity>
	)
};

export default CustomTabBarButton;