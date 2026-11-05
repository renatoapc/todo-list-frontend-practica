import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {
  createTaskApi,
  getTasks,
  updateTaskApi,
  deleteTaskApi,
} from "./api/tasks";
import { loginApi, registerApi } from "./api/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [name, setName] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [taskActionError, setTaskActionError] = useState("");
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const data = await loginApi(email, password);

      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setRegisterMessage("");
    setIsRegisteringUser(true);

    try {
      await registerApi(name, email, password);

      setRegisterMessage("Usuario registrado correctamente");
    } catch (error) {
      setRegisterError(error.message);
      setRegisterMessage("");
    } finally {
      setIsRegisteringUser(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    setTasks([]);
    setTasksLoaded(false);
    setEmail("");
    setPassword("");
    setLoginError("");
    setName("");
    setNewTaskText("");
    setRegisterMessage("");
    setRegisterError("");
    setTasksError("");
    setTaskActionError("");
  };

  const loadTasks = async () => {
    setTasksError("");
    setIsLoadingTasks(true);
    setTasksLoaded(false);

    try {
      const data = await getTasks(token);
      setTasks(data);
      setTasksLoaded(true);
    } catch (error) {
      setTasksError(error.message);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const createTask = async (event) => {
    event.preventDefault();

    if (newTaskText.trim() === "") {
      return;
    }

    setTaskActionError("");
    setIsCreatingTask(true);

    try {
      const data = await createTaskApi(token, newTaskText);

      setTasks([...tasks, data]);
      setNewTaskText("");
      setTasksLoaded(true);
    } catch (error) {
      setTaskActionError(error.message);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const toggleTaskDone = async (task) => {
    setTaskActionError("");
    setIsUpdatingTask(true);

    try {
      const updatedTask = await updateTaskApi(token, task.id, {
        done: !task.done,
      });

      setTasks(
        tasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        ),
      );
    } catch (error) {
      setTaskActionError(error.message);
    } finally {
      setIsUpdatingTask(false);
    }
  };

  const deleteTask = async (taskId) => {
    setTaskActionError("");
    setDeletingTaskId(taskId);

    try {
      await deleteTaskApi(token, taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setTaskActionError(error.message);
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <main>
      <h1>Todo App</h1>

      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        {isRegistering && (
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setRegisterError("");
                setRegisterMessage("");
                setLoginError("");
              }}
            />
          </div>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setRegisterError("");
              setRegisterMessage("");
              setLoginError("");
            }}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setRegisterError("");
              setRegisterMessage("");
              setLoginError("");
            }}
          />
        </div>

        <button type="submit" disabled={isLoggingIn || isRegisteringUser}>
          {isLoggingIn
            ? "Ingresando..."
            : isRegisteringUser
              ? "Creando cuenta..."
              : isRegistering
                ? "Registrarse"
                : "Iniciar sesión"}
        </button>

        <button
          disabled={isLoggingIn || isRegisteringUser}
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setRegisterMessage("");
            setRegisterError("");
            setLoginError("");
          }}
        >
          {isRegistering ? "Ir a iniciar sesión" : "Crear una cuenta"}
        </button>
      </form>

      {registerMessage && <p>{registerMessage}</p>}
      {registerError && <p>{registerError}</p>}
      {loginError && <p>{loginError}</p>}

      {user && (
        <section>
          <h2>Sesión iniciada</h2>
          <p>Hola, {user.name}</p>

          <button type="button" onClick={loadTasks} disabled={isLoadingTasks}>
            {isLoadingTasks ? "Cargando..." : "Cargar tareas"}
          </button>

          {tasksError && <p>{tasksError}</p>}

          <TaskForm
            value={newTaskText}
            onValueChange={setNewTaskText}
            onCreate={createTask}
            isCreating={isCreatingTask}
          />

          {taskActionError && <p>{taskActionError}</p>}

          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>

          {!tasksLoaded && !isLoadingTasks && !tasksError && (
            <p>Presiona "Cargar tareas" para ver tus tareas.</p>
          )}

          {tasksLoaded && tasks.length === 0 && (
            <p>No tienes tareas todavía.</p>
          )}

          {tasksLoaded && tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              onToggleDone={toggleTaskDone}
              onDelete={deleteTask}
              deletingTaskId={deletingTaskId}
              isUpdatingTask={isUpdatingTask}
            />
          )}
        </section>
      )}
    </main>
  );
}

export default App;
