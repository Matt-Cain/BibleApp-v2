import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';

const buttonData = [
	{ title: "Books", page: "books" },
	{ title: ">", page: null },
	{ title: "Chapters", page: "chapters" },
	{ title: ">", page: null },
	{ title: "Verses", page: "verses" },
];

const BreadCrumb = ({activePage, setPage }) => {
	// const dispatch = useDispatch();
	const { colors } = useTheme()
	const styles = makeStyles(colors)

	return (
		<View style={styles.container}>
			{buttonData.map(({title, page}, index) => (
				<TouchableOpacity key={index}  onPress={() => page && setPage(page)}>
					<Text style={page == null ? styles.arrow : page == activePage ? styles.active : styles.text}>{title}</Text>
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

export default BreadCrumb