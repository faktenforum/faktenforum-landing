import HttpFactory from "../factory";
import type { operations, components, paths } from "~/gen/api-types";

class AuthModule extends HttpFactory {
  private RESOURCE = "/users";

  async createUser(payload: components["schemas"]["UserCreateDTO"], requestId?: string) {
    return this.call<paths["/api/users"]["post"]["responses"][200]["content"]["application/json"]>({
      method: "post",
      url: `${this.RESOURCE}`,
      data: payload,
      requestId
    });
  }

  async getUser(id: string, requestId?: string) {
    return this.call<
      paths["/api/users/{id}"]["get"]["responses"][200]["content"]["application/json"]
    >({
      method: "get",
      url: `${this.RESOURCE}/${id}`,
      requestId
    });
  }

  async updateUser(
    id: string,
    payload: components["schemas"]["UserUpdateDTO"],
    requestId?: string
  ) {
    return this.call<
      paths["/api/users/{id}"]["put"]["responses"][200]["content"]["application/json"]
    >({
      method: "put",
      url: `${this.RESOURCE}/${id}`,
      data: payload,
      requestId
    });
  }

  async deleteUser(id: string, requestId?: string) {
    return this.call<
      paths["/api/users/{id}"]["delete"]["responses"][200]["content"]["application/json"]
    >({
      method: "delete",
      url: `${this.RESOURCE}/${id}`,
      requestId
    });
  }

  async getUsers(requestId?: string) {
    return this.call<paths["/api/users"]["get"]["responses"][200]["content"]["application/json"]>({
      method: "get",
      url: `${this.RESOURCE}`,
      requestId
    });
  }

  async useGetUsers() {
    return this.use<paths["/api/users"]["get"]["responses"][200]["content"]["application/json"]>(
      `${this.RESOURCE}`
    );
  }

  async useGetUser(id: string) {
    return this.use<
      paths["/api/users/{id}"]["get"]["responses"][200]["content"]["application/json"]
    >(`/api${this.RESOURCE}/${id}`);
  }
}

export default AuthModule;
