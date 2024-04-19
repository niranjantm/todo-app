import { useState } from "react"
import axios from "axios"

function AddTodo({ showAddTodo }) {
    // State to manage form data
    const [formData, setFormData] = useState({ title: "" });
    // State to manage form validation error
    const [error, setError] = useState("");

    // Function to handle input change
    const handleChange = (e) => {
        // Clear error message on input change
        setError("");
        // Update form data with input value
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if title is provided
        if (!formData.title) {
            setError("Title is required !");
        } else {
            try {
                // Send POST request to create a new todo
                const res = await axios.post("http://localhost:5000/api/create/todo", formData);
                // If todo is successfully created, hide the AddTodo component
                if (res.status === 201) {
                    showAddTodo(false);
                }
            } catch (error) {
                console.error(error);
                setError("An error occurred while adding todo.");
            }
        }
    }
    
  return (
   <main className="flex justify-center w-full">
    <form className="flex flex-col gap-5 w-[55%] max-md:w-[80%] items-center" onSubmit={handleSubmit} > 
        <input placeholder="Title" className="p-5 rounded-lg w-full" required onChange={handleChange} name="title" ></input>
        <button className="bg-red-500 px-5 py-2 rounded-lg font-semibold hover:opacity-90 w-[80%]">
            Add
        </button >
        <button className="bg-blue-500 px-5 py-2 rounded-lg font-semibold hover:opacity-90 w-[80%]" type="button" onClick={()=>showAddTodo(false)}>Back</button>
        {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
   </main>
  )
}

export default AddTodo