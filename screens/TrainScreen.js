import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import Voice from '@react-native-voice/voice';
import { useTheme } from "../hooks/useTheme";
import { compare } from '../training/compare';

const TrainScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const initialComparisonState = { correctWords: [], spokenPercentCorrect: 0, totalPercentCorrect: 0 };
  const { currentVerse } = useSelector(state => state.trainer);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [comparison, setComparison] = useState(initialComparisonState);
  const [contextualMenuValue, setShowContextualMenuValue] = useState(null);

  useEffect(() => {
    setResults([]);
    setComparison(initialComparisonState);
  }, [currentVerse]);

  useEffect(() => {
    if (currentVerse && results.length) {
      console.log('hit');
      const result = compare(currentVerse, results);
      setComparison(result);
    }
  }, [results]);

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

  const { bookname, chapter, verse, text } = currentVerse || {};

  const textColor = (index) => {
    if (index === contextualMenuValue) {
      return styles.selectedWord;
    }
    switch (comparison.correctWords[index]) {
      case undefined:
        return styles.text;
      case true:
        return styles.textCorrect;
      case false:
        return styles.textWrong;
      default:
        return styles.text;
    }
  }

  const textMenu = (index) => {
    setShowContextualMenuValue(index);
  }

  const ContextualMenu = () => {
    return contextualMenuValue ? (
      <View style={styles.contextualMenu}>
        <TouchableOpacity onPress={() => setShowContextualMenuValue(null)}>
          <Text style={styles.contextualMenuText}>Always Approve</Text>
        </TouchableOpacity>
        <Text style={{color: colors.primary, fontSize: 20}}>|</Text>
        <TouchableOpacity onPress={() => setShowContextualMenuValue(null)}>
          <Text style={styles.contextualMenuText}>Definition</Text>
        </TouchableOpacity>
        <Text style={{color: colors.primary, fontSize: 20}}>|</Text>
        <TouchableOpacity onPress={() => setShowContextualMenuValue(null)}>
          <Text style={styles.contextualMenuText}>Audio</Text>
        </TouchableOpacity>
      </View>
    ): null;
  }


  return (
    <View style={styles.container}>
      {currentVerse ? (
        <View style={styles.innerContainer}>
          <ContextualMenu />
          <View style={styles.item}>
            <View style={styles.header}>
              <Text style={styles.title}>{bookname} {chapter}:{verse}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {text.split(' ').map((text, index) => (
                <TouchableOpacity onLongPress={() => setShowContextualMenuValue(index)} key={index}>
                  <Text key={index} style={textColor(index)}>{text} </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {results.length > 0 && (
            <View>
              <View style={styles.textContainer}>
                {results.map((result, index) => <Text style={styles.itemText} key={index}>{result}</Text>)}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>Total Spoken Percent Correct: {comparison.totalPercentCorrect}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>Spoken Percent Correct: {comparison.spokenPercentCorrect}</Text>
              </View>
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
    contextualMenu: {
      backgroundColor: colors.item.background,
      height: 60,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 0.3,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      marginLeft: 30,
      marginRight: 30,
    },
    selectedWord: {
      color: colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    contextualMenuText: {
      color: 'white',
      fontSize: 16,
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    textWrong: {
      color: 'red',
      fontSize: 20,
    },
    textCorrect: {
      color: 'green',
      fontSize: 20,
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
