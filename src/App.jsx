import { useState } from "react";
import { motion } from "framer-motion";
import "./App.scss";
import MioCharacter from "./components/Character/Character";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";
import { addTodo, deleteTodo } from "./services/api";
import Swal from "sweetalert2";

function App() {
  const [taskAdded, setTaskAdded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleTaskAdded = async (text) => {
    if (!text || text.trim() === "") return;
    try {
      await addTodo(text);

      setTaskAdded(true);
      setRefresh((prev) => !prev);
      setTimeout(() => setTaskAdded(false), 1500);
    } catch (error) {
      alert("Failed to save task. Check console for details.");
    }
  };

  const handleDeleteSelected = async () => {
    const result = await Swal.fire({
      title: `Delete ${selected.length} task(s)?`,
      text: "You cannot undo this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b8cba",
      cancelButtonColor: "#ff4d4d",
      confirmButtonText: "Yes, delete all",
      cancelButtonText: "Cancel",
      background: "#0d0f14",
      color: "#f0f2f5",
    });

    if (result.isConfirmed) {
      await Promise.all(selected.map((id) => deleteTodo(id)));
      setSelected([]);
      setRefresh((prev) => !prev);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">TASK TERMINAL</h1>

      <div className="app-layout">
        <MioCharacter taskAdded={taskAdded} />

        <div className="todo-section">
          <TodoInput onTaskAdded={handleTaskAdded} />
          {selected.length > 0 && (
            <motion.button
              className="delete-selected"
              onClick={handleDeleteSelected}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fa-solid fa-trash-can"></i> DELETE SELECTED (
              {selected.length})
            </motion.button>
          )}
          <TodoList
            refresh={refresh}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
