To-Do List – Lab Intro React

Este proyecto parte del demo de To-Do List que vimos en clase.
A partir de ese código base agregué mejoras para cumplir la Parte 1 y la Parte 2 del laboratorio.

Cómo ejecutar el proyecto

Clonar o descargar el repositorio.

En la carpeta del proyecto ejecutar:

npm install
npm run dev


Abrir en el navegador la URL que muestra Vite (por defecto http://localhost:5173).

Proyecto base

El demo original del profesor tenía:

Un input de texto y un botón para agregar tareas.
Un estado con la lista de tareas (tasks).
Posibilidad de marcar una tarea como completada y de eliminarla.
A partir de ese código modifiqué solo el frontend, manteniendo la idea de lista de tareas simple.

Parte 1 – Mejoras realizadas (qué hice y cómo)
1. Persistencia en localStorage

Qué hice:
Hice que las tareas se guarden en el navegador para que, al recargar la página, la lista no se pierda.

Cómo lo hice:

En vez de usar useState normal para tasks, uso un hook que lee y escribe en localStorage.
La clave que uso en localStorage es "tasks".

Ejemplo de uso en App.tsx:
const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

2. Filtros de tareas (Todas / Pendientes / Completadas)

Qué hice:
Agregué botones para elegir qué tareas mostrar:

Todas

Pendientes (no completadas)

Completadas

Cómo lo hice:
Definí un tipo para el filtro y un estado:

type Filter = 'all' | 'active' | 'done'
const [filter, setFilter] = useState<Filter>('all')

Antes de renderizar la lista, aplico el filtro sobre tasks:

const filteredTasks = tasks.filter((task) => {
  if (filter === 'active') return !task.done
  if (filter === 'done') return task.done
  return true  // 'all'
})


Los botones cambian el valor de filter y deshabilito el que está activo.

3. Contador de tareas pendientes

Qué hice:
Mostré en pantalla cuántas tareas quedan sin completar.

Cómo lo hice:
Calculo la cantidad de tareas pendientes a partir de la lista:

const pendingCount = tasks.filter((task) => !task.done).length


Muestro el resultado arriba de la lista:

<p>Tareas pendientes: {pendingCount}</p>


Con estas tres cosas cumplo con más de dos mejoras pedidas en la Parte 1.

Parte 2 – Opción elegida

Para la Parte 2 elegí la Opción A: useEffect + custom hook.

Custom hook useLocalStorage

Qué hice:
Creé un hook reutilizable llamado useLocalStorage para manejar estados que se guardan automáticamente en localStorage.

Dónde está:
Archivo src/hooks/useLocalStorage.ts.

Cómo funciona (resumen):

Usa useState para crear el estado.

En la función inicial del estado intenta leer un valor previo desde localStorage.

Usa useEffect para escribir en localStorage cada vez que el valor cambia.

Uso en la app:

const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])


De esta forma, cada vez que agrego, modifico o borro tareas, el hook actualiza localStorage y, cuando recargo la página, las tareas se vuelven a cargar desde ahí.

Archivos principales

src/App.tsx
Contiene la lógica principal de la To-Do List:

estado del input

lista de tareas

marcado como completadas

borrado de tareas

filtros

contador de pendientes

src/hooks/useLocalStorage.ts
Implementación del hook personalizado que combina useState y useEffect para sincronizar un estado con localStorage.

src/types.ts
Define el tipo Task que uso en toda la app.

src/main.tsx
Punto de entrada de React donde se renderiza el componente App.