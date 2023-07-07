import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme'
import { getBibles, setBible } from '../actions/bibles';
import { getBooks, setBook } from '../actions/books';
import { getChapters, setChapter } from '../actions/chapters';
import { getVerses, setVerse } from '../actions/verses';
import BreadCrumb from '../components/BreadCrumb';
import Bibles from '../components/Cards/Bibles';
import Books from '../components/Cards/Books';
import Chapters from '../components/Cards/Chapters';
import Verses from '../components/Cards/Verses';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
  // Themes
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  // Redux
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const { chapters } = useSelector(state => state.chapters);
  const { verses } = useSelector(state => state.verses);

  // State
  const [page, setPage] = React.useState("books");
  const [showSearch, setShowSearch] = React.useState(false);

  // Dynamic Components
  const pagesData = { books: books, chapters: chapters, verses: verses };
  const pageComponents = {  books: Books, chapters: Chapters, verses: Verses };
  const PageComponent = pageComponents[page];
  const pageData = pagesData[page];

  // FlatListItem
  const renderItem = ({ item, index }) => <PageComponent index={index} item={item} setPage={setPage} />;

  // LifeCycle
  useEffect(() => {
    if (books.length === 0) {
      dispatch(getBooks());
    }
  }, [books]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showSearch ? <SearchBar setPage={setPage} /> : <BreadCrumb activePage={page} setPage={setPage} />}
        {showSearch
          ? <Entypo name="cross" size={24} color={colors.primary} onPress={() => setShowSearch(!showSearch)} />
          : <Ionicons name="search" size={20} color={colors.primary} onPress={() => setShowSearch(!showSearch)} />
        }
        </View>
      <View style={styles.innerContainer}>
        {pageData ? (
          <PageComponent data={pageData} setPage={setPage} />
        ) : (
          <View></View>
        )}
      </View>
    </View>
  )
}

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
      height: 30,
      // display: 'flex',
      flexDirection: 'row',
      // backgroundColor: 'red',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  })
};

export default SearchScreen