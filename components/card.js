import React from 'react';
import { Text, View } from 'react-native';

const Card = (props) => {
  return (
    <View style={{flex: 1}}>
      <View>
        <Text>{props.user.name}</Text>
        <Text>{props.user.company.name}</Text>
        <Text>{props.user.company.catchPhrase}</Text>
      </View>
    </View>
  )
}

export default Card;