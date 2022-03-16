import Todos from "../features/todos/Todos";
import AddTodo from "../features/todos/AddTodo";

function App() {
    return (
        <div className={'flex flex-col items-center pt-72 pb-32 w-full font-mono'}>
            <div className={'w-96 flex flex-col py-6 px-10 rounded-xl'}>
                <AddTodo />
                <Todos/>
            </div>
        </div>
    )
}

export default App;
