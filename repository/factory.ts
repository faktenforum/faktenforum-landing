import type { FetchError, FetchOptions } from "ofetch";
import type { NotificationBase } from "~/stores/notifications";
type UseFetchOptions = Parameters<typeof useFetch>[1]; // This will get the type of the first parameter (options).
type UseFetchReturnType = ReturnType<typeof useFetch>; // This will get the return type.
import type { AvailableRouterMethod as _AvailableRouterMethod } from "nitropack";

import type { MaybeRef, Ref } from "vue";

type Methods = "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options";

type CallParameters = {
  method: "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options";
  url: string;
  data?: object;
  extras?: object;
  requestId?: string;
  contentType?: string;
};

export type FormFile = { file: File; formName: string };

type FileCallParameters = {
  files: FormFile[];
} & CallParameters;

class HttpFactory {
  private fetchOptions: Ref<FetchOptions>;
  private pendingRequests: Record<string, boolean>;
  private addNotification: (notification: NotificationBase) => void;

  constructor(fetchOptions: Ref<FetchOptions>, pendingRequests: Record<string, boolean>) {
    this.fetchOptions = fetchOptions;
    const store = useNotificationStore();
    const { addNotification } = store;
    this.addNotification = addNotification;
    this.pendingRequests = pendingRequests;
  }

  private throwError(error: FetchError, redirect?: string) {
    console.log(error.data);
    const message = (error.data && error.data.message) || error.message;
    throw createError({
      statusCode: error?.statusCode,
      statusMessage: message,
      data: { ...error?.data, redirect: redirect || "/" },
      fatal: true
    });
  }

  async call<T>({ method, url, data, extras, requestId, contentType }: CallParameters): Promise<T> {
    const _extras = extras || {};
    try {
      if (requestId) {
        this.pendingRequests[requestId] = true;
      }
      const options = {
        ...this.fetchOptions.value
      };
      options.headers = (options.headers as any) || {};
      if (contentType) {
        (options["headers"] as any)["Content-Type"] = contentType;
      }

      const res: T = await $fetch<T>(url, {
        ...options,
        method,
        body: data,
        ..._extras
      });
      return res;
    } catch (error: any) {
      console.log(JSON.stringify(error));
      this.addNotification({ title: error.message, type: "error", timeout: 5000 });
      throw error;
    } finally {
      if (requestId) {
        delete this.pendingRequests[requestId];
      }
    }
  }

  async fileCall<T>({
    method,
    url,
    data,
    files,
    extras,
    requestId
  }: FileCallParameters): Promise<T> {
    const payload = new FormData();
    if (files) {
      files.forEach((file) => {
        payload.append("files", file.file, file.file.name);
      });
    }
    if (data) {
      payload.append("payload", JSON.stringify({ ...data }));
    }
    return this.call<T>({
      method,
      url,
      data: payload,
      extras,
      requestId
    });
  }

  async use<T extends Record<string, any> | Ref<Record<string, any>>>(
    url: string | Ref<string>,
    options?: {
      method?: Methods;
      body?: Record<string, any> | Ref<Record<string, any>>;
      query?: Record<string, any> | Ref<Record<string, any>>;
      immediate?: boolean;
      server?: boolean;
      key?: string;
      default?: () => T;
      onErrorRedirect?: string;
    }
  ) {
    const fetchOptions = this.fetchOptions;
    const opts = computed(() => {
      return {
        methods: options?.method,
        body: options?.body,
        key: options?.key,
        query: options?.query,
        immediate: options?.immediate,
        baseURL: this.fetchOptions.value.baseURL,
        server: options?.server,
        default: options?.default,
        onRequest({ options }: any) {
          options.headers = options.headers || {};
          if (fetchOptions.value.headers && fetchOptions.value.headers && options.headers) {
            options.headers.authorization = (fetchOptions.value.headers as any).authorization;
          }
        }
      };
    });

    const { data, error, execute, pending, refresh, status } = await useFetch<T>(
      url,
      opts.value as any
    );
    if (error.value) {
      this.throwError(error.value);
    }

    watch(error, (err) => {
      if (err as any) {
        console.log("error 12", JSON.stringify(error.value));
        throw createError({
          statusCode: error.value?.statusCode,
          statusMessage: error.value?.message,
          data: { ...error.value?.data, redirect: options?.onErrorRedirect || "/" },
          fatal: true
        });
        // this.addNotification({ title: error.value?.message || "", type: "error", timeout: 5000 });
      }
    });

    return { data, error, execute, pending, refresh, status };
  }
}

export default HttpFactory;
