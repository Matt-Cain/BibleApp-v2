export const sanitizeVerse = (verse) => {
		// Remove all HTML tags
		const stepOne = verse.text.replace(/<[^>]*>?/gm, '');
		// Remove all symbols
		const stepTwo = stepOne.replace(/[^a-zA-Z'’\s]/g, '');
		// Make all letters lowercase
		const stepThree = stepTwo.toLowerCase();
		// Return verse with sanitized text
		return { ...verse, sanitizedText: stepThree };
}

export const sanitizeSpeech = (speechText) => {
		// Remove all symbols
		// Make all letters lowercase
		const stepTwo = speechText.toLowerCase();
		// Return sanitized speech text
		return stepTwo;
}