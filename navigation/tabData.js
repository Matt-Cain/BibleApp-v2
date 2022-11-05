import { Ionicons, AntDesign } from '@expo/vector-icons';

// Custom TabBarButton
import CustomTabBarButton from "./CustomTabBarButton";

// Screens
import ArchiveScreen from "../screens/ArchiveScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import TrainScreen from "../screens/TrainScreen";

export const tabData = [
	{
		name: "Search",
		screen: SearchScreen,
		icon: { Icon: Ionicons, iconName: "book", size: 30 },
	},
	{
		name: "Archive",
		screen: ArchiveScreen,
		icon: { Icon: Ionicons, iconName: "folder", size: 30 },
	},
	{
		name: "Train",
		screen: TrainScreen,
		icon: { Icon: AntDesign, iconName: "pluscircleo", size: 30 },
		CustomButton: CustomTabBarButton
	},
	{
		name: "Favorites",
		screen: FavoritesScreen,
		icon: { Icon: Ionicons, iconName: "star", size: 30 },
	},
	{
		name: "Settings",
		screen: SettingsScreen,
		icon: { Icon: Ionicons, iconName: "cog", size: 30 },
	},
];