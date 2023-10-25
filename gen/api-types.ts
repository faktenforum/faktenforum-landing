/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/auth/account/sessions": {
    get: operations["accountControllerSessions"];
  };
  "/api/auth/account/sessions/{id}": {
    delete: operations["accountControllerDeleteSession"];
  };
  "/api/auth/account/email": {
    post: operations["accountControllerUpdateEmail"];
  };
  "/api/auth/account/password": {
    post: operations["accountControllerUpdatePassword"];
  };
  "/api/auth/login": {
    post: operations["authControllerLogin"];
  };
  "/api/auth/session": {
    get: operations["authControllerAccount"];
  };
  "/api/auth/logout": {
    post: operations["authControllerLogout"];
  };
  "/api/auth/register": {
    post: operations["authControllerRegister"];
  };
  "/api/claims": {
    get: operations["claimsControllerGetClaims"];
  };
  "/api/claims/{id}": {
    get: operations["claimsControllerGetClaim"];
  };
  "/api/users": {
    get: operations["userControllerGetAllUsers"];
    post: operations["userControllerCreateUser"];
  };
  "/api/users/{id}": {
    get: operations["userControllerGetUserById"];
    put: operations["userControllerUpdateUserById"];
    delete: operations["userControllerDeleteUserById"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Session: {
      id: string;
      userAgent?: Record<string, never>;
      /** Format: date-time */
      expiresAt: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
    };
    Unauthorized: {
      /**
       * @description The error name
       * @default UNAUTHORIZED
       * @example UNAUTHORIZED
       */
      name: string;
      /** @description An error message */
      message: string;
      /**
       * @description The status code of the exception
       * @default 401
       * @example 401
       */
      status: number;
      /** @description A list of related errors */
      errors?: components["schemas"]["GenericError"][];
      /** @description The stack trace (only in development mode) */
      stack?: string;
    };
    GenericError: {
      /** @description The error name */
      name: string;
      /** @description An error message */
      message: string;
      [key: string]: unknown;
    };
    Forbidden: {
      /**
       * @description The error name
       * @default FORBIDDEN
       * @example FORBIDDEN
       */
      name: string;
      /** @description An error message */
      message: string;
      /**
       * @description The status code of the exception
       * @default 403
       * @example 403
       */
      status: number;
      /** @description A list of related errors */
      errors?: components["schemas"]["GenericError"][];
      /** @description The stack trace (only in development mode) */
      stack?: string;
    };
    Email: {
      /** Format: email */
      email?: string;
    };
    PasswordUpdate: {
      oldPassword?: string;
      newPassword?: string;
    };
    LoginResponse: {
      token: string;
    };
    Credentials: {
      /** Format: email */
      username: string;
      password: string;
    };
    AccountInfo: {
      id?: string;
      /** Format: email */
      email?: string;
      role?: string;
      access_token?: string;
      access_token_expires_in?: number;
    };
    UserDTO: {
      id: string;
      email: string;
      /** @enum {string} */
      role: "ADMIN" | "USER";
      createdAt: string;
      updatedAt: string;
    };
    UserCreateDTO: {
      /** Format: email */
      email: string;
      password: string;
      /** @enum {string} */
      role: "ADMIN" | "USER";
    };
    UserUpdateDTO: {
      /** Format: email */
      email?: string;
      /** @enum {string} */
      role?: "ADMIN" | "USER";
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  accountControllerSessions: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Session"][];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  accountControllerDeleteSession: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  accountControllerUpdateEmail: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Email"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  accountControllerUpdatePassword: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PasswordUpdate"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  authControllerLogin: {
    parameters: {
      header?: {
        "user-agent"?: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Credentials"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["LoginResponse"];
        };
      };
    };
  };
  authControllerAccount: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["AccountInfo"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  authControllerLogout: {
    responses: {
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  authControllerRegister: {
    requestBody?: {
      content: {
        "application/json": {
          email?: string;
          password?: string;
        };
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"];
        };
      };
    };
  };
  claimsControllerGetClaims: {
    responses: {
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  claimsControllerGetClaim: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  userControllerGetAllUsers: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"][];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  userControllerCreateUser: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UserCreateDTO"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  userControllerGetUserById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  userControllerUpdateUserById: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UserUpdateDTO"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
  userControllerDeleteUserById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserDTO"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["Unauthorized"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["Forbidden"];
        };
      };
    };
  };
}
