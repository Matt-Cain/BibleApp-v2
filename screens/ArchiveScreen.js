// import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// import { useTheme } from "../hooks/useTheme";


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/card';



const ArchiveScreen = () => {
  // const dispatch = useDispatch();
  // const users = useSelector(state => state.users.users);
  // const loading = useSelector(state => state.users.loading);
  // const error = useSelector(state => state.users.error);
  // const state = useSelector(state => state);



  useEffect(() => {
    // dispatch(getUsers());
  }, []);

  return (
    <View style={{flex: 1}, styles.container}>
      {/* {users.loading && <Text>Loading...</Text>}
      {users.length === 0 && !loading && <Text>No users available!</Text>}
      {error && !loading && <Text>{error}</Text>}
      {users.length > 0 && users.map((user) => (
        <Card key={user.id} user={user} />
      ))} */}
    </View>
  )
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
