import { useEffect, useState } from 'react'
import './style/App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true)
      try {
        const data = await fetchTodos()
        setTodos(data)
      } catch (err) {
        alert('Erreur lors du chargement des todos')
      }
      setLoading(false)
    }
    loadTodos()
  }, [])

  const addTodo = async (text) => {
    try {
      const newTodo = await createTodo({ text, done: false })
      setTodos([...todos, newTodo])
    } catch {
      alert('Erreur lors de l\'ajout')
    }
  }

  const handleUpdate = async (updatedTodo) => {
    try {
      const todo = await updateTodo(updatedTodo._id, updatedTodo)
      setTodos(todos.map(t => t._id === todo._id ? todo : t))
    } catch {
      alert('Erreur lors de la modification')
    }
  }

  const handleDelete = async (_id) => {
    try {
      await deleteTodo(_id)
      setTodos(todos.filter(t => t._id !== _id))
    } catch {
      alert('Erreur lors de la suppression')
    }
  }

  const todosDone = todos.filter(todo => todo.done)
  const todosTodo = todos.filter(todo => !todo.done)

  return (
    <div>
      <h1>My Todo App</h1>
      <TodoForm addTodo={addTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class="columns-container" style={{ display: 'flex', gap: '2rem' }}>
          <div class="column">
            <h2>All</h2>
            <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
          <div class="column">
            <h2>Todo</h2>
            <TodoList todos={todosTodo} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
          <div class="column">
            <h2>Done</h2>
            <TodoList todos={todosDone} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
