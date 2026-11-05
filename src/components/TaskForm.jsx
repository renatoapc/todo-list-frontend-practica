function TaskForm({ value, onValueChange, onCreate, isCreating }) {
  return (
    <form onSubmit={onCreate}>
      <input
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Nueva tarea"
      />

      <button type="submit" disabled={isCreating}>
        {isCreating ? "Creando..." : "Crear tarea"}
      </button>
    </form>
  );
}

export default TaskForm;
