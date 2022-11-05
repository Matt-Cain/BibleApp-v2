import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setBible } from '../../actions/bibles';
import { getChapters, setChapter } from '../../actions/chapters';


const Books = ({ item, dispatchSelection }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme()
	const styles = makeStyles(colors)

	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={() => dispatchSelection({ page: "books", nextPage: "chapters", id: item.id })}>
				<Text style={styles.title}>{item.name}</Text>
			</TouchableOpacity>
		</View>
	)
};

const makeStyles = (colors) => {
  return StyleSheet.create({
    safeAreaView: { flex: 1, backgroundColor: colors.background },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    innerContainer: {
      flex: 1,
      marginBottom: 160,
      marginTop: 20,
      backgroundColor: colors.background,
      borderColor: "#64ffda",
      borderBottomWidth: 3,
      borderTopWidth: 3,
    },
    item: {
      color: "white",
      backgroundColor: "white",
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 20,
    },
    title: {
      fontSize: 20,
      color: "#121212",
    },
  })
};

export default Books