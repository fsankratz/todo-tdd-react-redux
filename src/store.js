import {configureStore} from "@reduxjs/toolkit";
import {todosReducer} from "./story/Todos";

export const store = configureStore({
    reducer: todosReducer
});
