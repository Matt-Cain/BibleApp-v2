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
  // const loading = useSelector(state => state.bibles.loading);
  // const error = useSelector(state => state.bibles.error);


  const [page, setPage] = React.useState("books");
  const { bibles, bible } = useSelector(state => state.bibles);
  const { books, book } = useSelector(state => state.books);
  const { chapters, chapter } = useSelector(state => state.chapters);
  const { verses, verse } = useSelector(state => state.verses);

  console.log(chapters);

  const pagesData = { bibles: bibles, books: books, chapters: chapters, verses: verses };
  const pageComponents = { bibles: Bibles, books: Books, chapters: Chapters, verses: Verses };
  const pageGetters = { bibles: getBibles, books: getBooks, chapters: getChapters, verses: getVerses };
  const pageSetters = { bibles: setBible, books: setBook, chapters: setChapter, verses: setVerse };

  const PageComponent = pageComponents[page];
  const pageData = pagesData[page];

  const dispatchSelection = ({ page, nextPage, id }) => {
    console.log(page, nextPage, id);
    const apiState = { books: book, chapters: chapter };
    const newState = {...apiState, [page]: id};
    dispatch(pageSetters[page](id));
    dispatch(pageGetters[nextPage](newState));
    setPage(nextPage);
  };

  // FlatListItem
  const renderItem = ({ item }) => <PageComponent item={item} dispatchSelection={dispatchSelection} />;

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
          <FlatList
            data={pageData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
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