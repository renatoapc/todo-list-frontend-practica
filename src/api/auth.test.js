import { afterEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "./config";
import { loginApi, registerApi } from "./auth";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("auth API", () => {
  it("envía email y password al login y devuelve la respuesta", async () => {
    const loginResponse = {
      token: "token-de-prueba",
      user: {
        id: 7,
        name: "Renato",
        email: "renato@test.com",
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => loginResponse,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await loginApi("renato@test.com", "clave-de-prueba");

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "renato@test.com",
        password: "clave-de-prueba",
      }),
    });

    expect(result).toEqual(loginResponse);
  });

  it("envía name, email y password al registro", async () => {
    const registeredUser = {
      id: 8,
      name: "Ana",
      email: "ana@test.com",
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => registeredUser,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await registerApi("Ana", "ana@test.com", "clave-de-prueba");

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ana",
        email: "ana@test.com",
        password: "clave-de-prueba",
      }),
    });

    expect(result).toEqual(registeredUser);
  });
});
