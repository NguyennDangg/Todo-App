import { useState } from "react";
import { motion } from "framer-motion";
import { deleteTodo, updateTodo, toggleTodo } from "../../services/api";
import Swal from "sweetalert2";
import "./TodoItem.scss";

function TodoItem({ todo, onRefresh, selected, setSelected }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.content);

  const isSelected = selected.includes(todo.id);

  const showError = (title, text) =>
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#6b8cba",
      background: "#0d0f14",
      color: "#f0f2f5",
      fontFamily: "Roboto Mono, monospace",
    });

  const handleSelect = () => {
    if (isSelected) {
      setSelected((prev) => prev.filter((id) => id !== todo.id));
    } else {
      setSelected((prev) => [...prev, todo.id]);
    }
  };

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
      try {
        await deleteTodo(todo.id);
        setSelected((prev) => prev.filter((id) => id !== todo.id));
        onRefresh();
      } catch {
        await showError("Delete failed", "Could not delete this task. Please try again.");
      }
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id, !todo.isCompleted);
      onRefresh();
    } catch {
      await showError(
        "Update failed",
        "Could not change the completion status. Please try again.",
      );
    }
  };

  const handleUpdate = async () => {
    if (editText.trim() === "") return;
    try {
      await updateTodo(todo.id, editText);
      setEditing(false);
      onRefresh();
    } catch {
      await showError("Save failed", "Could not save your changes. Please try again.");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} — ${date.toLocaleTimeString()}`;
  };

  return (
    <motion.li
      className={`todo-item ${todo.isCompleted ? "todo-item--done" : ""} ${isSelected ? "todo-item--selected" : ""}`}
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
        aria-label="Select task for deletion"
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
        <motion.button
          className={`todo-item__btn todo-item__btn--complete`}
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
          title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          <i className={`fa-solid ${todo.isCompleted ? "fa-rotate-left" : "fa-circle-check"}`}></i>
        </motion.button>
        {editing ? (
          <motion.button
            className="todo-item__btn todo-item__btn--save"
            onClick={handleUpdate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Save"
          >
            <i className="fa-solid fa-check"></i>
          </motion.button>
        ) : (
          <motion.button
            className="todo-item__btn todo-item__btn--edit"
            onClick={() => setEditing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Edit task"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </motion.button>
        )}
        <motion.button
          className="todo-item__btn todo-item__btn--delete"
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Delete task"
        >
          <i className="fa-solid fa-trash-can"></i>
        </motion.button>
      </div>
    </motion.li>
  );
}

export default TodoItem;
