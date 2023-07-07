import { sanitizeSpeech } from "../mutations/sanitize";
// return an array of true/false values if the words in the speech match the words in the verse
export const compare = (verse, speechResults) => {
	const homophones = verse.homophones;
	const verseText = verse.sanitizedText;
	const correctWords = [];

	console.log('speechResults', speechResults);


	const speechWords = sanitizeSpeech(speechResults[0]).split(' ').filter(word => word !== '');
	const verseWords = verseText.split(' ').filter(word => word !== '');
	console.log('speechWords', speechWords);
	console.log('verseWords', verseWords);


	for (let i = 0; i < speechWords.length; i++) {
		const speechWord = speechWords[i];
		const homophone = homophones[i].homophones;
		const verseWord = verseWords[i];
		console.log('speechWord', speechWord);
		console.log('homophone', homophone);
		console.log('verseWord', verseWord);
		if (homophone.some(({word}) => word === speechWord) || speechWord === verseWord) {
			correctWords.push(true);
		} else {
			correctWords.push(false);
		}
	}
	const spokenPercentCorrect = correctWords.filter(Boolean).length / correctWords.length;
	const totalPercentCorrect = correctWords.filter(Boolean).length / verseWords.length;
	console.log('totalPercentCorrect', totalPercentCorrect);
	return { correctWords, spokenPercentCorrect, totalPercentCorrect };
};
