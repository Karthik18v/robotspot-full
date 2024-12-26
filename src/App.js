import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import "./App.css";

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState(allTasks);
  console.log(tasks);

  const fetchTask = async () => {
    try {
      const response = await axios.get(
        "https://robotspot-backend.onrender.com/tasks"
      );
      //console.log(response.data);
      setAllTasks(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const searchTask = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue); // Update the search state with the typed value
    const filteredTasks = allTasks.filter((each) =>
      each.name.toLowerCase().includes(searchValue)
    );
    //console.log(filteredTasks);
    setTasks(filteredTasks);
  };

  const deleteTask = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://robotspot-backend.onrender.com/tasks/${id}`
      );
      console.log("Task deleted:", response.data);
      // Optionally, you can remove the task from your local state after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="App">
      <h1>Task Management</h1>
      <div>
        <input
          className="search-bar"
          type="search"
          placeholder="search"
          value={search} // Bind the search value to the input field
          onChange={searchTask}
        />
        <button className="todo-button" type="button">
          Add Todo
        </button>
      </div>
      <ul className="tasks-list">
        {tasks.map((each) => (
          <li key={each._id}>
            <div className="task-item" onClick={() => deleteTask(each._id)}>
              <div className="task-heading">
                <h3>{each.name}</h3>
                <div>
                  <FaPencilAlt />
                  <button>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
              <p className="task-info">{each.description}</p>
              <p>status: {each.status}</p>
              <p>priority: {each.priority}</p>
              <p className="due-date">due date: {each.dueDate.split("T")[0]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
