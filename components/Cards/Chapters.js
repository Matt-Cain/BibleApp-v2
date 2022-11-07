import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setChapter } from '../../actions/chapters';
import { getVerses } from '../../actions/verses';


const Chapters = ({ data, setPage }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.chapters);
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const Item = ({ index, item, setPage }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {
          dispatch(setChapter({ number: item.number, name: item.reference }));
          dispatch(getVerses(item.reference));
          setPage("verses");
        }
        }>
          <Text style={styles.title}>{item.number}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={styles.container}>
        {data && !loading ? (
      <ScrollView>
        <View style={styles.innerContainer}>
            {data.map((item, i) => <Item key={item.id} index={i} item={item} setPage={setPage} />)}
        </View>
      </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
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
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-evenly',
    },
    innerContainer: {
      marginTop: 20,
      flex: 1,
      flexWrap: 'wrap',
      // marginBottom: 160,
      // marginTop: 20,
      backgroundColor: colors.background,
      // borderColor: "#64ffda",
      // borderBottomWidth: 3,
      // borderTopWidth: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
    },
    item: {
      margin: 5,
      color: "white",
      backgroundColor: colors.menuBackground,
      // padding: 10,
      // marginVertical: 8,
      // marginHorizontal: 16,
      borderColor: "black",
      // borderWidth: 1,
      borderRadius: 10,
      width: '30%',
      height: 70,
      padding: 10,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      color: "white",
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
  })
};

export default Chapters