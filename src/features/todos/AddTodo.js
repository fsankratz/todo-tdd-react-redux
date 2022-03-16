import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {added} from "./todosSlice";

const AddTodo = () => {
    const dispatch = useDispatch()
    const [todoInput, setTodoInput] = useState('')
    const handleAddTodo = useCallback(() => {
        dispatch(added(todoInput))
        setTodoInput('')
    }, [dispatch, setTodoInput, todoInput])
    return (
    <form className={'mb-8'} onSubmit={e => e.preventDefault()}>
        <label htmlFor={'todo'}
               className={'text-xl mb-2'}
        >Todo:</label>
        <div className={'flex'}>
            <input
                className={'px-3 py-2 grow mr-3 rounded-lg border border-gray-300 shadow-sm'}
                maxLength={20}
                type={'text'} id={'todo'} onChange={e => setTodoInput(e.target.value)} value={todoInput}/>
            <button
                disabled={todoInput === ''}
                className={`${todoInput === '' ? 'bg-emerald-200' : 'bg-emerald-600'} px-3 py-2 rounded-lg text-white shadow-sm`}
                onClick={handleAddTodo}>Add</button>
        </div>
    </form>
    )
}

export default AddTodo