import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import React from 'react'


// const content = "<p class=\"p\"><span data-number=\"1\" data-sid=\"ROM 1:1\" class=\"v\">1</span>This letter comes from Paul, a servant of Jesus Christ. I was called to be an apostle by God. God appointed me to announce the good news </p>"

const RenderVerse = () => {
	return (
		<WebView style={{height: 30, flex: 1, justifyContent: 'center', alignItems: 'center'}}
			source={{ html: '<p>Here I am</p>' }}
		/>
	);
}

export default RenderVerse