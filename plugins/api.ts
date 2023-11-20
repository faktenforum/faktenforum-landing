import type { FetchOptions } from "ofetch";
import { defineNuxtPlugin } from "#app";
import AccountModule from "~/repository/modules/account";
import UsersModule from "~/repository/modules/users";
import SubmissionModule from "~/repository/modules/submission";
/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  account: AccountModule;
  users: UsersModule;
  submission: SubmissionModule;
  usePendingRequests: () => { pendingRequests: Record<string, boolean> };
}

export default defineNuxtPlugin((nuxtApp) => {
  const { token } = useAuth();
  const config = useRuntimeConfig();
  const pendingRequests = reactive<Record<string, boolean>>({});
  const fetchOptions: Ref<FetchOptions> = computed(() => {
    return {
      baseURL: config.public.apiBase,
      headers: {
        authorization: "" + token.value
      }
    };
  });

  /** create a new instance of $fetcher with custom option */

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    account: new AccountModule(fetchOptions, pendingRequests),
    users: new UsersModule(fetchOptions, pendingRequests),
    submission: new SubmissionModule(fetchOptions, pendingRequests),
    usePendingRequests: () => ({
      pendingRequests
    })
  };

  return {
    provide: {
      api: modules
    }
  };
});
