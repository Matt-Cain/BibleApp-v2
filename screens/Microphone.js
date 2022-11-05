import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import { useTheme } from "../hooks/useTheme";


const FavoritesScreen = () => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

  const { colors, isDark } = useTheme();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
    color: 'white',
  },
  });

  return (
    <View style={styles.container}>
      {!started ? <Button title="Start Speech to text" onPress={startSpeechToText} /> : <Button title="Stop Speech to text" onPress={stopSpeechToText} />}
      {results.map((result, index) => <Text style={styles.text} key={index}>{result}</Text>)}
      <StatusBar style="auto" />
    </View>
  );
}

export default FavoritesScreen;
