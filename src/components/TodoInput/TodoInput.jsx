import { useState } from "react";
import { motion } from "framer-motion";
import "./TodoInput.scss";

function TodoInput({ onTaskAdded }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (input.trim() === "") return;
    setLoading(true)
    await onTaskAdded(input);
    setInput("");
    setLoading(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        className="todo-input__field"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <motion.button
        className="todo-input__button"
        onClick={handleAdd}
        disabled={loading}
        whileHover={{ scale: loading? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        {loading? '...' : 'ADD'}
      </motion.button>
    </div>
  );
}

export default TodoInput;
