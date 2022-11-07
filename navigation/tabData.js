import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

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
		name: "Favorites",
		screen: FavoritesScreen,
		icon: { Icon: AntDesign, iconName: "plus", size: 50 },
		CustomButton: CustomTabBarButton
	},
	{
		name: "Train",
		screen: TrainScreen,
		icon: { Icon: Entypo, iconName: "500px", size: 30 },
	},
	{
		name: "Settings",
		screen: SettingsScreen,
		icon: { Icon: Ionicons, iconName: "cog", size: 30 },
	},
];