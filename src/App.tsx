import { useState } from 'react'
import type { Task } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

type Filter = 'all' | 'active' | 'done'

function App() {
  const [input, setInput] = useState('')
  // Tareas guardadas en localStorage (clave: "tasks")
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [filter, setFilter] = useState<Filter>('all')

  function addTask() {
    const inputFree = input.trim()
    if (inputFree === '') return

    const newTask: Task = {
      id: Date.now(),
      text: inputFree,
      done: false,
    }

    setTasks((prev) => [newTask, ...prev])
    setInput('')
  }

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Filtros: todas / pendientes / completadas
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true // 'all'
  })

  // Contador de tareas pendientes
  const pendingCount = tasks.filter((task) => !task.done).length

  return (
    <div>
      <h1>Todo List</h1>

      {/* Contador de tareas pendientes */}
      <p>Tareas pendientes: {pendingCount}</p>

      <br />

      {/* Input para nueva tarea */}
      <div>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Agregar tareita</button>
      </div>

      <br />

      {/* Botones de filtro */}
      <div>
        <span>Mostrar: </span>
        <button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={filter === 'active'}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('done')}
          disabled={filter === 'done'}
        >
          Completadas
        </button>
      </div>

      <br />

      {/* Lista de tareas */}
      <div>
        <ul className="lista-tareas">
          {tasks.length === 0 && (
            <li>No hay tareas aún.</li>
          )}

          {tasks.length > 0 && filteredTasks.length === 0 && (
            <li>No hay tareas para este filtro.</li>
          )}

          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="linea-tarea"
            >
              <span
                className={task.done ? 'done' : ''}
                onClick={() => toggleTask(task.id)}
                title="Marcar como completada"
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                title="Eliminar tarea"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
