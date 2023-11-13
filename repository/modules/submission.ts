import HttpFactory from "../factory";
import type { operations, components, paths } from "~/gen/api-types";
import type { FormFile } from "../factory";
class AuthModule extends HttpFactory {
  private RESOURCE = "/submission";

  async submitClaim(
    payload: components["schemas"]["ClaimCreateDTO"],
    files: FormFile[],
    requestId?: string
  ) {
    return this.fileCall<
      paths["/api/submission"]["post"]["responses"][200]["content"]["application/json"]
    >({
      method: "post",
      url: `${this.RESOURCE}`,
      data: payload,
      files,
      requestId
    });
  }

  async updateSubmit(
    token: string,
    payload: components["schemas"]["ClaimCreateDTO"],
    files: FormFile[],
    requestId?: string
  ) {
    return this.fileCall<
      paths["/api/submission/{token}"]["put"]["responses"]["200"]["content"]["application/json"]
    >({
      method: "put",
      url: `${this.RESOURCE}/${token}`,
      data: payload,
      files,
      requestId
    });
  }

  async useGetSubmit(token: string) {
    return this.use<
      paths["/api/submission/{token}"]["get"]["responses"][200]["content"]["application/json"]
    >(`${this.RESOURCE}/${token}`, {
      method: "get",
      key: `${this.RESOURCE}/${token}`,
      server: true,
      default: () => ({ id: "", createdAt: "", updatedAt: "", description: "", title: "" }),
      onErrorRedirect: "/submission"
    });
  }
}

export default AuthModule;
