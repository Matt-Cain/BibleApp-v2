import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useIsFocused } from "@react-navigation/native";
import { saveAsFavorite, removeAsFavorite } from '../actions/archives';
import { Ionicons } from '@expo/vector-icons';
import { deactivateNavButton } from '../actions/navigation';

const FavoritesScreen = ({ navigation }) => {
  const [selection, setSelection] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const { verses } = useSelector(state => state.archives);
  const favorites = verses.filter(verse => verse.isFavorite);
  const { navButtonActive } = useSelector(state => state.navigation);

  if (navButtonActive && isFocused && Number.isInteger(selection)) {
    navigation.navigate("Train", { item: verses[selection] });
    setSelection(null);
    dispatch(deactivateNavButton());
  }

  const updateSelection = (index) => {
    selection === index ? setSelection(null) : setSelection(index);
  }

  const handleFavorite = (item) => {
    console.log('item', item.isFavorite);
    if (item.isFavorite) {
      dispatch(removeAsFavorite(item));
    } else {
      dispatch(saveAsFavorite(item));
    }
  }

  const Item = ({ index, item }) => {
    const { verse, isFavorite } = item;
    return (
      <View style={[styles.item, index === selection ? styles.selected : ""]}>
        <TouchableOpacity onPress={() => updateSelection(index)}>
          <View style={[index === selection ? styles.headerSelected : styles.header]}>
            <Text style={[index === selection ? styles.titleSelected : styles.title]}>{verse.bookname}: {verse.chapter} Verse: {verse.verse}</Text>
            <Ionicons onPress={() => handleFavorite(item)} name={isFavorite ? 'star' : 'star-outline'} size={24} color={index === selection ? 'black' : colors.primary} />
          </View>
          <Text
            style={[styles.verseNumber, styles.itemText, index === selection ? styles.itemTextSelected : ""]}>
            {verse.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item, index }) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      {favorites ? (
        <FlatList
          data={favorites}
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

export default FavoritesScreen