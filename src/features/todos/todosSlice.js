import {createSlice} from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducers: {
        added: (state, action) => {
            const newTodo = {
                text: action.payload,
                complete: false,
                id: new Date().getTime()
            }
            state.items.push(newTodo)
        },
        removed: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload)
        },
        completed: (state, action) => {
            state.items = state.items.map(todo => todo.id === action.payload ? {
                ...todo,
                complete: !todo.complete
            } : todo)
        },
        cleared: state => {
            state.items = []
        }
    }
})
export const todosReducer = todosSlice.reducer
export const selectTodoById = id => state => state.items.find(todo => todo.id === id)
export const selectTodos = state => state.items
export const { added, removed, completed, cleared } = todosSlice.actions