import { useEffect, useState } from "react";
import { MdDelete, MdDone } from "react-icons/md";
import axios from "axios";
import AddTodo from "./AddTodo";

function Todos() {
    // State for storing todos
    const [todos, setTodos] = useState([]);
    // State for storing original todos
    const [originalTodos, setOriginalTodos] = useState([]);
    // State for controlling AddTodo component visibility
    const [addtodo, showAddTodo] = useState(false);

    // Function to handle select change event
    const handleSelect = async (e) => {
        const selectedValue = e.target.value;

        // Filter todos based on selected value
        if (selectedValue === "complete") {
            const filteredTodo = originalTodos.filter((todo) => todo.status === "complete");
            setTodos(filteredTodo);
        } else if (selectedValue === "pending") {
            const filteredTodo = originalTodos.filter((todo) => todo.status !== "complete");
            setTodos(filteredTodo);
        } else {
            setTodos(originalTodos);
        }
    };

    // Function to delete a todo
    const deleteTodo = async (id) => {
        try {
            // Delete todo from the server
            await axios.delete(`http://localhost:5000/api/delete/todo/${id}`);
            // Update todos state after deletion
            const filteredTodos = todos.filter((todo) => todo.id !== id);
            setTodos(filteredTodos);
            // Update originalTodos state after deletion
            setOriginalTodos(filteredTodos);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to update todo status to complete
    const updateTodo = async (id) => {
        try {
            // Update todo status on the server
            await axios.put(`http://localhost:5000/api/update/todo/${id}`, { status: "complete" });
            // Update todos state after status update
            const updatedTodos = todos.map((todo) => {
                if (todo.id === id) {
                    todo.status = "complete";
                }
                return todo;
            });
            setTodos(updatedTodos);
            // Update originalTodos state after status update
            setOriginalTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle AddTodo button click
    const handleAddTodo = (e) => {
        e.preventDefault();
        showAddTodo(true);
    };

    // Fetch todos from the server on component mount
    useEffect(() => {
        async function fetchTodo() {
            try {
                const res = await axios.get("http://localhost:5000/api/get/todos");
                // Set todos and originalTodos state after fetching
                setTodos(res.data);
                setOriginalTodos(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTodo();
    }, [addtodo]); // Fetch todos whenever addtodo state changes

    return (
        <main className="relative ">
            <div className={`flex items-center flex-col ${addtodo === true ? "blur-md" : ""}`} >
                <div className="flex w-[80%] max-md:w-[80%] justify-between mb-5">
                    {/* <Link className="bg-blue-400 px-5 py-2 rounded-lg font-semibold max-md:px-3 max-md:text-sm" to={"/AddTodo"}>AddTodo</Link> */}
                    <button className="bg-blue-400 px-5 py-2 rounded-lg font-semibold max-md:px-3 max-md:text-sm" onClick={handleAddTodo} >AddTodo</button>
                    <select className="rounded-lg px-5 py-2 max-md:px-3 max-md:text-sm " defaultValue={"all"} onChange={handleSelect}>
                        <option value={"all"}>All</option>
                        <option value={"complete"}>Completed</option>
                        <option value={"pending"}>Pending</option>
                    </select>
                </div>

                {todos.length < 1 ? (
                    <p className="mt-[100px] text-red-500 text-lg">No Todos found !</p>
                ) : (
                    <div className="bg-gray-300 w-[80%] max-md:w-[80%] flex flex-col items-center gap-5 justify-center rounded-lg p-5">
                        {todos.map((todo) => {
                            return (
                                <div key={todo.id} onClick={()=>console.log(todo.status)} className={`${todo.status =="complete" ? "bg-green-500" : "bg-slate-100"} w-[90%] p-3  rounded-lg flex justify-between max-md:flex-col `}>

                                    <div className="flex items-center justify-center">
                                        <p className={`text-lg font-semibold line-clamp-1 max-md:text-center max-md:mb-3 ${todo.status =="complete" ? "line-through" : ""}`}>{todo.title}</p>
                                    </div>

                                    <div className="flex gap-5 justify-center">
                                        {todo.status !== "complete" && (
                                            <button className=" px-4 py-2 rounded-lg hover:scale-95 transition-all max-md:px-2 max-md:py-1" onClick={() => { updateTodo(todo.id) }} ><MdDone size={30} color="green" /></button>
                                        )}
                                        <button className=" px-4 py-2 rounded-lg hover:scale-95 transition-all max-md:px-2 max-md:py-1" id="delete" onClick={() => { deleteTodo(todo.id) }} ><MdDelete size={30} color="red" /></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {addtodo && <div className="absolute top-0 w-full flex flex-col items-center ">

                <AddTodo showAddTodo={showAddTodo}></AddTodo>
            </div>}

        </main>
    );
}

export default Todos;