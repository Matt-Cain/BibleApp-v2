import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getVerses, clearVerses } from '../actions/verses';
import { clearChapters } from '../actions/chapters';
import { useTheme } from '@react-navigation/native'

const SearchBar = ({ setPage }) => {
	const dispatch = useDispatch();
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const [search, setSearch] = useState('');

	const handleChangeText = (text) => {
		setSearch(text);
	}

	const handleSubmit = () => {
		setPage("verses");
		dispatch(getVerses(search));
		dispatch(clearChapters());
	}

	return (
		<View style={styles.container}>
			<TextInput autoFocus onSubmitEditing={handleSubmit} onChangeText={handleChangeText} style={styles.input} />
    </View>
	)
}

const makeStyles = (colors) => {
	return StyleSheet.create({
	 input: {
    height: 30,
    borderWidth: 1,
			borderColor: '#64ffda',
			borderRadius: 20,
			color: 'white',
			width: '100%',
			paddingLeft: 10,
		},
		container: {
			justifyContent: 'flex-start',
			alignItems: 'center',
			width: '80%',
		},
	})
};

export default SearchBar