import { afterEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "./config";
import { createTaskApi, getTasks, updateTaskApi, deleteTaskApi } from "./tasks";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("tasks API", () => {
  it("envía la petición POST para crear una tarea y devuelve la respuesta", async () => {
    const createdTask = {
      id: 12,
      text: "Comprar pan",
      done: false,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdTask,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await createTaskApi("token-de-prueba", "Comprar pan");

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token-de-prueba",
      },
      body: JSON.stringify({ text: "Comprar pan" }),
    });

    expect(result).toEqual(createdTask);
  });

  it("lanza el mensaje del backend cuando la respuesta HTTP es un error", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "La tarea ya existe" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      createTaskApi("token-de-prueba", "Comprar pan"),
    ).rejects.toThrow("La tarea ya existe");
  });

  it("lanza el mensaje de conexión cuando fetch falla", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("fallo de red"));

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      createTaskApi("token-de-prueba", "Comprar pan"),
    ).rejects.toThrow("No se pudo conectar con el servidor.");
  });

  it("carga las tareas enviando el token", async () => {
    const tasks = [{ id: 1, text: "Estudiar React", done: false }];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => tasks,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getTasks("token-de-prueba");

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks`, {
      headers: {
        Authorization: "Bearer token-de-prueba",
      },
    });

    expect(result).toEqual(tasks);
  });

  it("envía PUT con el id, token y cambios de la tarea", async () => {
    const updatedTask = {
      id: 12,
      text: "Comprar pan",
      done: true,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => updatedTask,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await updateTaskApi("token-de-prueba", 12, { done: true });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/12`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token-de-prueba",
      },
      body: JSON.stringify({ done: true }),
    });

    expect(result).toEqual(updatedTask);
  });

  it("envía DELETE con el id y token, sin body", async () => {
    const deletedTask = {
      id: 12,
      text: "Comprar pan",
      done: false,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => deletedTask,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await deleteTaskApi("token-de-prueba", 12);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/12`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer token-de-prueba",
      },
    });

    expect(result).toEqual(deletedTask);
  });
});
