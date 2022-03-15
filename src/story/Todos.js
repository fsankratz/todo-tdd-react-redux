import {useCallback} from "react";
import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import Todo from "./Todo";

const Todos = () => {
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()
    const handleClear = useCallback(() => {
        dispatch(cleared())
    }, [dispatch])
    if (todos.length === 0) return <p>Nothing here yet...</p>
    return (
        <>
            <ul className={'mb-4'}>
                {todos.map(todo => (
                    <Todo id={todo.id} key={todo.id}/>
                ))}
            </ul>
            <button onClick={handleClear} className={'text-sm text-red-500'}>Clear all</button>
        </>
    );
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducers: {
        added: (state, action) => {
            const newTodo = {
                text: action.payload,
                complete: false,
                id: Math.round(Math.random() * 100000)
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

export const { added, removed, completed, cleared } = todosSlice.actions

export const selectTodoById = id => state => state.items.find(todo => todo.id === id)

export const selectTodos = state => state.items



export default Todos