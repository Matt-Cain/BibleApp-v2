import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';

const buttonData = [
	{ title: "Archive", type: "archive" },
	{ title: "|", type: null },
	{ title: "Favorites", type: "favorites" },
	{ title: "|", type: null },
	{ title: "Other", type: "other" },
];

const Filters = ({filter, setFilter }) => {
	const { colors } = useTheme()
	const styles = makeStyles(colors)

	return (
		<View style={styles.container}>
			{buttonData.map(({title, type}, index) => (
				<TouchableOpacity key={index}  onPress={() => type && setFilter(type)}>
					{/* <Text style={filter == type ? styles.active : styles.text}>{title}</Text> */}
					<Text style={type == null ? styles.arrow : type == filter ? styles.active : styles.text}>{title}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
};


const makeStyles = (colors) => {
	return StyleSheet.create({
		container: {
			flex: 0.1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingLeft: 30,
			paddingRight: 30,
		},
		text: {
			color: colors.text,
			fontSize: 20,
		},
		active: {
			color: 'whitesmoke',
			fontSize: 20,
			fontWeight: 'bold',
		},
		arrow: {
			color: colors.primary,
			fontSize: 20,
		}
	})
};

export default Filters