import { useState } from 'react'
import './App.css'

let nextId = 1

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  function addTodo() {
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: nextId++, text, completed: false }])
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(todos.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <h1>todos</h1>

      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="add-btn" onClick={addTodo}>Add</button>
      </div>

      {todos.length > 0 && (
        <div className="todo-container">
          <ul className="todo-list">
            {filtered.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
              </li>
            ))}
          </ul>

          <div className="footer">
            <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
            <div className="filters">
              {['all', 'active', 'completed'].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              className="clear-btn"
              onClick={clearCompleted}
              disabled={todos.every(t => !t.completed)}
            >
              Clear completed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
