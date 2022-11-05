import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useIsFocused } from "@react-navigation/native";

const ArchiveScreen = () => {
  const [selection, setSelection] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const { verses } = useSelector(state => state.archives);

  // if (navButtonActive && isFocused && selection) {
  //   dispatch(archiveVerse(data[selection]));
  //   setSelection(null);
  // }


  const Item = ({ index, item }) => {
    console.log(item);
    return (
      <View style={[styles.item, index === selection ? styles.selected : ""]}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.bookname}: {item.chapter} Verse: {item.verse}</Text>
          </View>
        <TouchableOpacity>
          <Text
            onPress={() => setSelection(index)}
            style={[styles.verseNumber, styles.itemText, index === selection ? styles.itemTextSelected : ""]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      {verses ? (
        <FlatList
          data={verses}
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
      color: "#FFFFFF",
    },
    header: {
      fontSize: 20,
      color: "#121212",
      textAlign: "center",
      fontWeight: "bold",
      flexDirection: "row",
      marginBottom: 10,
      borderBottomColor: colors.primary,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
  })
};

export default ArchiveScreen