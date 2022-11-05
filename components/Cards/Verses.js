import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setBible } from '../../actions/bibles';
import { getChapters, setChapter } from '../../actions/chapters';
import { archiveVerse } from '../../actions/archives';
import { deactivateNavButton } from '../../actions/navigation';
import { useIsFocused } from "@react-navigation/native";

const Verses = ({ data, setPage }) => {
  const [selection, setSelection] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const { navButtonActive } = useSelector(state => state.navigation);


  useEffect(() => {
  if (navButtonActive && isFocused && selection) {
    dispatch(archiveVerse(data[selection]));
    setSelection(null);
    dispatch(deactivateNavButton());
  }
  }, [navButtonActive, isFocused, selection])


  const Item = ({ index, item, setPage }) => {
    return (
      <View style={[styles.item, index === selection ? styles.selected : ""]}>
        <TouchableOpacity>
          <Text
            onPress={() => setSelection(index)}
            style={[styles.verseNumber, styles.itemText, index === selection ? styles.itemTextSelected : ""]}>
            {`${item.verse}. ${item.text}`}
          </Text>
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
          keyExtractor={(item) => item.verse}
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
      backgroundColor: colors.item.background,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 20,
    },
    selected: {
      boxShadow: '1px 2px 9px #FFFFFF',
      backgroundColor: colors.item.borderColor,
      color: 'black',
    },
    itemText: {
      color: colors.item.text,
      fontSize: 20,
    },
    itemTextSelected: {
      color: 'black',
      fontSize: 20,
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