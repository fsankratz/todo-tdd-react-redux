import Todos from "./story/Todos";
import AddTodo from "./story/AddTodo";

function App() {
    return (
        <div className={'flex flex-col items-center pt-72 pb-32 w-full font-mono'}>
            <div className={'w-96 flex flex-col py-6 px-10 bg-slate-100 rounded-xl'}>
                <AddTodo />
                <Todos/>
            </div>
        </div>
    )
}

export default App;
