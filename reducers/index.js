import { combineReducers } from "redux";
import bibles from "./bibles";
import books from "./books";
import chapters from "./chapters";
import verses from "./verses";

const rootReducer = combineReducers({
    bibles: bibles,
    books: books,
    chapters: chapters,
    verses: verses,
});

export default rootReducer;