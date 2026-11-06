import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TaskList from "./TaskList";

afterEach(cleanup);

describe("TaskList", () => {
  it("muestra el texto de la tarea recibida", () => {
    const task = {
      id: 1,
      text: "Estudiar React",
      done: false,
    };

    render(
      <TaskList
        tasks={[task]}
        onToggleDone={vi.fn()}
        onDelete={vi.fn()}
        deletingTaskId={null}
        isUpdatingTask={false}
      />,
    );

    expect(screen.getByText("Estudiar React")).toBeInTheDocument();
  });

  it("llama al callback con la tarea cuando se cambia la casilla", async () => {
    const task = {
      id: 1,
      text: "Estudiar React",
      done: false,
    };
    const mockToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskList
        tasks={[task]}
        onToggleDone={mockToggle}
        onDelete={vi.fn()}
        deletingTaskId={null}
        isUpdatingTask={false}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(task);
  });

  it("llama al callback con el id al presionar Eliminar", async () => {
    const task = {
      id: 1,
      text: "Estudiar React",
      done: false,
    };
    const mockDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskList
        tasks={[task]}
        onToggleDone={vi.fn()}
        onDelete={mockDelete}
        deletingTaskId={null}
        isUpdatingTask={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(mockDelete).toHaveBeenCalledWith(task.id);
  });

  
});
