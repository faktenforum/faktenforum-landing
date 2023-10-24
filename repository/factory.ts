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
};

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

  async call<T>({ method, url, data, extras, requestId }: CallParameters): Promise<T | null> {
    const _extras = extras || {};
    try {
      if (requestId) {
        this.pendingRequests[requestId] = true;
      }
      const res: T = await $fetch<T>(url, {
        ...this.fetchOptions.value,
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
  async use<T extends Record<string, any> | Ref<Record<string, any>>>(
    url: string | Ref<string>,
    options?: {
      method: Methods;
      body?: Record<string, any> | Ref<Record<string, any>>;
      query?: Record<string, any> | Ref<Record<string, any>>;
      immediate?: boolean;
    }
  ) {
    const fetchOptions = this.fetchOptions;
    const opts = computed(() => {
      return {
        methods: options?.method,
        body: options?.body,
        query: options?.query,
        immediate: options?.immediate,
        baseURL: this.fetchOptions.value.baseURL,
        onRequest({ options }: any) {
          options.headers = options.headers || {};
          if (fetchOptions.value.headers && fetchOptions.value.headers && options.headers) {
            options.headers.authorization = (fetchOptions.value.headers as any).authorization;
          }
        }
      };
    });
    console.log("opts", opts.value);
    const { data, error, execute, pending, refresh, status } = await useFetch<T>(
      url,
      opts.value as any
    );

    watch(error, (err) => {
      if (err as any) {
        console.log(JSON.stringify(error.value));
        this.addNotification({ title: error.value?.message || "", type: "error", timeout: 5000 });
      }
    });
    return { data, error, execute, pending, refresh, status };
  }
}

export default HttpFactory;
