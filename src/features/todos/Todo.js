import {useDispatch, useSelector} from "react-redux";
import {completed, removed} from "./todosSlice";
import {useCallback} from "react";
import {selectTodoById} from "./todosSlice";

const Todo = ({id}) => {
    const { complete, text } = useSelector(selectTodoById(id))
    const dispatch = useDispatch()
    const handleRemove = useCallback(() => {
        dispatch(removed(id))
    }, [dispatch, id])
    const handleComplete = useCallback(() => {
        dispatch(completed(id))
    }, [dispatch, id])
    return (
        <li key={id} className={'flex bg-teal-50 px-3 py-2 rounded-md mb-3 shadow-sm'}>
            <button
                className={`${complete ? 'line-through' : ''} grow select-none text-left`}
                onClick={handleComplete}
            >{text}</button>
            <button
                className={'underline text-gray-400'}
                onClick={handleRemove}>Remove</button>
        </li>
    );
}

export default Todo