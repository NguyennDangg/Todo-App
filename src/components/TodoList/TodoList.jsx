import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { getTodos } from '../../services/api'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.scss'

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'open', label: 'OPEN' },
  { key: 'done', label: 'DONE' },
]

const loadFailedAlert = () =>
  Swal.fire({
    title: 'Load failed',
    text: 'Could not load your tasks. Please try again.',
    icon: 'error',
    confirmButtonColor: '#6b8cba',
    background: '#0d0f14',
    color: '#f0f2f5',
    fontFamily: 'Roboto Mono, monospace',
  })

function TodoList({ refresh, selected, setSelected }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await getTodos()
        if (cancelled) return
        setTodos(data)
      } catch {
        if (cancelled) return
        setTodos([])
        await loadFailedAlert()
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [refresh])

  // Used by TodoItem as an event handler after add / edit / toggle / delete.
  const fetchTodos = async () => {
    try {
      const data = await getTodos()
      setTodos(data)
    } catch {
      setTodos([])
      await loadFailedAlert()
    } finally {
      setLoading(false)
    }
  }

  const openCount = todos.filter((t) => !t.isCompleted).length
  const doneCount = todos.length - openCount

  const visibleTodos = todos.filter((t) => {
    if (filter === 'open') return !t.isCompleted
    if (filter === 'done') return t.isCompleted
    return true
  })

  if (loading) return (
    <p className="todo-list__loading">LOADING TASKS...</p>
  )

  if (todos.length === 0) return (
    <p className="todo-list__empty">[ NO ACTIVE TASKS ]</p>
  )

  return (
    <>
      <div className="todo-filter" role="tablist" aria-label="Filter tasks">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            className={`todo-filter__btn ${filter === key ? 'todo-filter__btn--active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label} ({key === 'all' ? todos.length : key === 'open' ? openCount : doneCount})
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="todo-list__empty">
          {filter === 'done' ? '[ NO COMPLETED TASKS ]' : '[ NO OPEN TASKS ]'}
        </p>
      ) : (
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
            {visibleTodos.map((todo) => (
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
      )}
    </>
  )
}

export default TodoList
