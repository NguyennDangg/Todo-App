import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTodos } from '../../services/api'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.scss'

function TodoList({ refresh, selected, setSelected }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    setLoading(true)
    const data = await getTodos()
    setTodos(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTodos()
  }, [refresh])

  if (loading) return (
    <p className="todo-list__loading">LOADING TASKS...</p>
  )

  if (todos.length === 0) return (
    <p className="todo-list__empty">[ NO ACTIVE TASKS ]</p>
  )

  return (
    <motion.ul
      className="todo-list"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRefresh={fetchTodos}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

export default TodoList