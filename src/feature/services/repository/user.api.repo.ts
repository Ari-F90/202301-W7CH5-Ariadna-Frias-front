import { ServerResp, User } from "../../models/user";

export interface UserApiRepoStructure {
  readAllUsers(): Promise<ServerResp>;
  readOneUser(id: User["id"]): Promise<ServerResp>;
  create(info: Partial<User>, action: "register" | "login"): Promise<User>;
  update(info: Partial<User>, token: string, action: string): Promise<User>;
  delete(id: User["id"], token: string): Promise<void>;
}

export class UserApiRepo implements UserApiRepoStructure {
  url: string;
  constructor() {
    this.url = "http://localhost:4900/users";
  }

  async readAllUsers(): Promise<ServerResp> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
    const users = await resp.json();
    return users;
  }

  async readOneUser(id: User["id"]): Promise<ServerResp> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);

    const user = await resp.json();

    return user;
  }

  async update(
    info: Partial<User>,
    token: string,
    action: string
  ): Promise<User> {
    const url = this.url + "/" + action;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
    const data = await resp.json();
    return data;
  }

  // Create no tiene que recibir el ID como parámetro, puesto que lo va a asignar el server.

  async create(
    info: Partial<User>,
    action: "register" | "login"
  ): Promise<User> {
    const resp = await fetch(this.url + "/" + action, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);

    const data = await resp.json();
    return data;
  }

  async delete(id: User["id"], token: string): Promise<void> {
    const url = this.url + "/" + id;
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
  }
}
