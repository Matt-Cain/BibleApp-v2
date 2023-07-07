import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useIsFocused } from "@react-navigation/native";
import { saveAsFavorite, removeAsFavorite } from '../actions/archives';
import { deactivateNavButton } from '../actions/navigation';
import { setTrainingVerse } from '../actions/trainer';
import Filters from '../components/Filters';
import { Ionicons } from '@expo/vector-icons';

const ArchiveScreen = ({ navigation }) => {
  const [selection, setSelection] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const { verses } = useSelector(state => state.archives);
  const { navButtonActive } = useSelector(state => state.navigation);
  const [filter, setFilter] = useState('archive');

  const data = { archive: verses, favorites: verses.filter(verse => verse.isFavorite) };
  const displayData = data[filter];


useEffect(() => {
  if (navButtonActive && isFocused && Number.isInteger(selection)) {
    navigation.navigate("Train");
    setSelection(null);
    dispatch(setTrainingVerse(verses[selection]));
    dispatch(deactivateNavButton());
  }
}, [navButtonActive, isFocused, selection]);

  const updateSelection = (index) => {
    selection === index ? setSelection(null) : setSelection(index);
  }

  const handleFavorite = (item) => {
    if (item.isFavorite) {
      dispatch(removeAsFavorite(item));
    } else {
      dispatch(saveAsFavorite(item));
    }
  }

  const Item = ({ index, item }) => {
    const { bookname, chapter, verse, text, isFavorite } = item;
    return (
      <View style={[styles.item, index === selection ? styles.selected : ""]}>
        <TouchableOpacity onPress={() => updateSelection(index)}>
          <View style={[index === selection ? styles.headerSelected : styles.header]}>
            <Text style={[index === selection ? styles.titleSelected : styles.title]}>{bookname} {chapter}:{verse}</Text>
            <Ionicons onPress={() => handleFavorite(item)} name={isFavorite ? 'star' : 'star-outline'} size={24} color={index === selection ? 'black' : colors.primary} />
          </View>
          <Text
            style={[styles.verseNumber, styles.itemText, index === selection ? styles.itemTextSelected : ""]}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <Filters filter={filter} setFilter={setFilter} />
      <View style={styles.innerContainer}>
        {displayData ? (
          <FlatList
            data={displayData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View></View>
        )}
      </View>
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
      // marginTop: 20,
      backgroundColor: colors.background,
      // borderColor: "black",
      // borderBottomWidth: 3,
      // borderTopWidth: 3,
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
    titleSelected: {
      fontSize: 20,
      color: "black",
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
      justifyContent: "space-between",
    },
    headerSelected: {
      justifyContent: "space-between",
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
      flexDirection: "row",
      marginBottom: 10,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
  })
};

export default ArchiveScreen