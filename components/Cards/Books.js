import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { getChapters, setChapter } from '../../actions/chapters';
import { setBook } from '../../actions/books';
import { clearVerses } from '../../actions/verses';


const Books = ({ data, setPage }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.books);
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const Item = ({index, item, setPage}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          dispatch(setBook({ id: item.id, name: item.name }));
          dispatch(clearVerses());
          dispatch(getChapters({ books: item.id }));
          setPage("chapters");
        }
        }>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => <Item index={index} item={item} setPage={setPage} />;

  return (
    <View style={styles.container}>
      {data && !loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
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
      backgroundColor: colors.menuBackground,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 20,
    },
    title: {
      fontSize: 20,
      color: "white",
    },
  })
};

export default Books