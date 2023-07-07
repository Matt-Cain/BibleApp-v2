import getHomophones from "../api/homophones"
const addHomophonesToVerse = async (verse) => {
    const { sanitizedText } = verse;
    const words = sanitizedText.split(' ');
    const homophones = await Promise.all(words.map(async (word) => {
        const homophones = await getHomophones(word);
        return { word, homophones: homophones.data };
    }));
    return { ...verse, homophones };
}

export default addHomophonesToVerse;
