import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setChapter } from '../../actions/chapters';
import { getVerses } from '../../actions/verses';


const Chapters = ({ data, setPage }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const Item = ({ index, item, setPage }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          dispatch(setChapter({ number: item.number, name: item.reference }));
          dispatch(getVerses(item.reference));
          setPage("verses");
        }
        }>
          <Text style={item.id.includes('intro') ? styles.header : styles.title}>{item.reference}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => <Item index={index} item={item} setPage={setPage} />;

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
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

export default Chapters