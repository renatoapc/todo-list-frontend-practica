import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import TaskForm from "./TaskForm";

afterEach(cleanup);

function TaskFormHarness() {
  const [value, setValue] = useState("");

  return (
    <TaskForm
      value={value}
      onValueChange={setValue}
      onCreate={vi.fn()}
      isCreating={false}
    />
  );
}

describe("TaskForm", () => {
  it("muestra el texto que escribe el usuario", async () => {
    const user = userEvent.setup();

    render(<TaskFormHarness />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Comprar pan");

    expect(input).toHaveValue("Comprar pan");
  });

  it("llama a onCreate cuando se envía el formulario", async () => {
    const user = userEvent.setup();
    const mockCreate = vi.fn((event) => event.preventDefault());

    render(
      <TaskForm
        value=""
        onValueChange={vi.fn()}
        onCreate={mockCreate}
        isCreating={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Crear tarea" }));

    expect(mockCreate).toHaveBeenCalled();
  });
});
