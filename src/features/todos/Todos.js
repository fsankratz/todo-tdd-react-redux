import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import Todo from "./Todo";
import {selectTodos, cleared} from "./todosSlice";

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

export default Todos