import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
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
// import { bibles } from '../bibles'

const SearchScreen = () => {
  // Themes
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  // State
  const dispatch = useDispatch();

  const [page, setPage] = React.useState("books");
  const { books } = useSelector(state => state.books);
  const { chapters } = useSelector(state => state.chapters);
  const { verses } = useSelector(state => state.verses);

  const pagesData = { books: books, chapters: chapters, verses: verses };
  const pageComponents = {  books: Books, chapters: Chapters, verses: Verses };

  const PageComponent = pageComponents[page];
  const pageData = pagesData[page];

  // FlatListItem
  const renderItem = ({ item, index }) => <PageComponent index={index} item={item} setPage={setPage} />;

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getBooks());
    }
  }, [books]);

  return (
    <View style={styles.container}>
      <BreadCrumb activePage={page} setPage={setPage}/>
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
  })
};

export default SearchScreen