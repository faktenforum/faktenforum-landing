import HttpFactory from "../factory";
import type { operations, components, paths } from "~/gen/api-types";

class AuthModule extends HttpFactory {
  private RESOURCE = "/auth/account";

  async updatePassword(payload: components["schemas"]["PasswordUpdate"], requestId?: string) {
    return this.call<paths["/api/auth/account/password"]["post"]["responses"][200]["content"]>({
      method: "post",
      url: `${this.RESOURCE}/password`,
      data: payload,
      requestId
    });
  }
  async updateEmail(payload: components["schemas"]["Email"], requestId?: string) {
    return this.call<paths["/api/auth/account/email"]["post"]["responses"][200]["content"]>({
      method: "post",
      url: `${this.RESOURCE}/email`,
      data: payload,
      requestId
    });
  }

  async deleteSession(id: string, requestId?: string) {
    return this.call<
      paths["/api/auth/account/sessions/{id}"]["delete"]["responses"][200]["content"]
    >({
      method: "delete",
      url: `${this.RESOURCE}/sessions/${id}`,
      requestId
    });
  }

  async useGetSessions() {
    return this.use<
      paths["/api/auth/account/sessions"]["get"]["responses"][200]["content"]["application/json"]
    >(`/api${this.RESOURCE}/sessions`);
  }
}

export default AuthModule;
