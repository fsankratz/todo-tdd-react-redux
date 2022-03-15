import {useCallback, useState} from "react";

function App() {
    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState('')
    const handleAddTodo = useCallback(() => {
        setTodos([...todos, {text: todoInput, complete: false, id: Math.round(Math.random() * 100000)}])
        setTodoInput('')
    }, [setTodos, todos, todoInput, setTodoInput])
    const toggleComplete = useCallback(id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, complete: !todo.complete} : todo))
    }, [setTodos, todos])
    const removeTodo = useCallback(id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }, [setTodos, todos])
    const clearTasks = useCallback(() => {
        setTodos([])
    }, [setTodos])
    return (
        <div className={'flex flex-col items-center pt-72 pb-32 w-full font-mono'}>
            <div className={'w-96 flex flex-col py-6 px-10 bg-slate-100 rounded-xl'}>
                <label htmlFor={'todo'}
                    className={'text-xl mb-2'}
                >Todo:</label>
                <form className={'flex mb-8'} onSubmit={e => e.preventDefault()}>
                    <input
                        className={'px-3 py-2 grow mr-3 rounded-lg border border-gray-300 shadow-sm'}
                        maxLength={20}
                        type={'text'} id={'todo'} onChange={e => setTodoInput(e.target.value)} value={todoInput}/>
                    <button
                        disabled={todoInput === ''}
                        className={`${todoInput === '' ? 'bg-emerald-200' : ''} px-3 py-2 rounded-lg bg-emerald-600 text-white shadow-sm`}
                        onClick={handleAddTodo}>Add</button>
                </form>
                {todos.length === 0 && <p>Nothing here yet...</p>}
                {todos.length !== 0 && (
                    <>
                        <ul className={'mb-4'}>
                            {todos.map(todo => (
                                <li key={todo.id} className={'flex bg-white px-3 py-2 rounded-md mb-3 shadow-sm'}>
                                    <button
                                        tabIndex={0}
                                        className={`${todo.complete ? 'line-through' : ''} grow select-none`}
                                        onClick={() => toggleComplete(todo.id)}
                                    >{todo.text}</button>
                                    <button
                                        className={'underline text-gray-400'}
                                        onClick={() => removeTodo(todo.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={clearTasks} className={'text-sm text-red-500'}>Clear all</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
