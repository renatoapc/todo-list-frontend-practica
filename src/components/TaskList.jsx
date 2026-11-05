function TaskList({ tasks, onToggleDone, onDelete, deletingTaskId, isUpdatingTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            disabled={isUpdatingTask}
            onChange={() => onToggleDone(task)}
          />

          <span
            style={{
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            disabled={deletingTaskId !== null}
          >
            {deletingTaskId === task.id ? "Eliminando..." : "Eliminar"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
