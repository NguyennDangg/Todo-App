import { useState } from "react";
import { motion } from "framer-motion";
import { deleteTodo, updateTodo, toggleTodo } from "../../services/api";
import Swal from "sweetalert2";
import "./TodoItem.scss";

function TodoItem({ todo, onRefresh, selected, setSelected }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.content);

  const isSelected = selected.includes(todo.id)

  const handleSelect = () => {
    if (isSelected) {
      setSelected(prev => prev.filter(id => id !== todo.id))
    } else {
      setSelected(prev => [...prev, todo.id])
    }
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete this task?",
      text: "You cannot undo this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b8cba",
      cancelButtonColor: "#ff4d4d",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#0d0f14",
      color: "#f0f2f5",
      fontFamily: "Roboto Mono, monospace",
    });

    if (result.isConfirmed) {
      await deleteTodo(todo.id);
      onRefresh();
    }
  };

  const handleToggle = async () => {
    await toggleTodo(todo.id, !todo.isCompleted);
    onRefresh();
  };

  const handleUpdate = async () => {
    if (editText.trim() === "") return;
    await updateTodo(todo.id, editText);
    setEditing(false);
    onRefresh();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} — ${date.toLocaleTimeString()}`;
  };

  return (
    <motion.li
      className={`todo-item ${todo.isCompleted ? 'todo-item--done' : ''} ${isSelected ? 'todo-item--selected' : ''}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 0, x: -30 }}
      layout
    >
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={isSelected}
        onChange={handleSelect}
      />

      <div className="todo-item__content">
        {editing ? (
          <input
            className="todo-item__edit-field"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            autoFocus
          />
        ) : (
          <>
            <span className="todo-item__text">{todo.content}</span>
            <p className="todo-item__date">{formatDate(todo.createdAt)}</p>
          </>
        )}
      </div>

      <div className="todo-item__actions">
        {editing ? (
          <motion.button
            className="todo-item__btn todo-item__btn--save"
            onClick={handleUpdate}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-check"></i>
          </motion.button>
        ) : (
          <motion.button
            className="todo-item__btn todo-item__btn--edit"
            onClick={() => setEditing(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </motion.button>
        )}
        <motion.button
          className="todo-item__btn todo-item__btn--delete"
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fa-solid fa-trash-can"></i>
        </motion.button>
      </div>
    </motion.li>
  );
}

export default TodoItem;
