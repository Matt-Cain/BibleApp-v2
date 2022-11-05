import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setBible } from '../../actions/bibles';
import { getChapters, setChapter } from '../../actions/chapters';
import RenderVerse from '../RenderVerse';


const Verses = ({ item, dispatchSelection }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  console.log(item, "sdlkfjsdlfjsldfjslkdjflksdjflksdj");

	return (
    <View style={styles.item}>
      <RenderVerse verse={item} />
			{/* <TouchableOpacity>
				<Text style={ item.id.includes('intro') ? styles.header : styles.title}>{item.id}</Text>
			</TouchableOpacity> */}
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
    header: {
      fontSize: 20,
      color: "#121212",
      textAlign: "center",
      fontWeight: "bold",
    },
  })
};

export default Verses