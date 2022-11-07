import { combineReducers } from "redux";
import archives from "./archives";
import bibles from "./bibles";
import books from "./books";
import chapters from "./chapters";
import navigation from "./navigation";
import trainer from "./trainer";
import verses from "./verses";

const rootReducer = combineReducers({
    archives: archives,
    bibles: bibles,
    books: books,
    chapters: chapters,
    navigation: navigation,
    trainer: trainer,
    verses: verses,
});

export default rootReducer;