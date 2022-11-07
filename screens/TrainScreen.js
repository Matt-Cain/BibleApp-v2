import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import Voice from '@react-native-voice/voice';
import { useTheme } from "../hooks/useTheme";

const TrainScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { currentVerse } = useSelector(state => state.trainer);
  const { verse } = currentVerse || { verse: "" };

  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const onSpeechError = async (e) => {
  }

  const onSpeechResults = async (e) => {
    setResults(e.value);
  }

  const startSpeechToText = async () => {
    Voice.start('en-US');
    setStarted(true);
  }

  const stopSpeechToText = async () => {
    Voice.stop();
    setStarted(false);
  }

  return (
    <View style={styles.container}>
        {currentVerse ? (
      <View style={styles.innerContainer}>
        <View style={styles.item}>
          <TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.title}>{verse.bookname}: {verse.chapter} Verse: {verse.verse}</Text>
            </View>
            <Text style={[styles.verseNumber, styles.itemText]}>{verse.text}</Text>
          </TouchableOpacity>
        </View>
        {results.length > 0 && (
          <View style={styles.textContainer}>
            {results.map((result, index) => <Text style={styles.text} key={index}>{result}</Text>)}
          </View>)}
        <View style={styles.item}>
          {!started ? <Button title="Start Training" onPress={startSpeechToText} /> : <Button title="Stop Speech to text" onPress={stopSpeechToText} />}
        </View>
      </View>
      ) : (
        <View style={styles.innerContainer}>
            <Text style={styles.text}>No verse selected</Text>
        </View>
      )}
    </View>
  );
};

export default TrainScreen;

const makeStyles = (colors) => {
  return StyleSheet.create({
    safeAreaView: { flex: 1, backgroundColor: colors.background },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: 'white',
    },
    innerContainer: {
      flex: 1,
      marginBottom: 160,
      marginTop: 20,
      backgroundColor: colors.background,
      justifyContent: 'space-evenly'
    },
    textContainer: {
      color: "white",
      backgroundColor: colors.item.background,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 20,
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
