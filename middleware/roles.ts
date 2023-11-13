interface Meta {
  roles: string[];
}

export default defineNuxtRouteMiddleware((to) => {
  const { status, data, token, lastRefreshedAt, getSession, signUp, signIn, signOut } = useAuth();
  console.log(JSON.stringify(to.meta, null, 2));
  if (to.meta && to.meta.meta) {
    const meta: Meta = to.meta.meta as any;
    if (meta.roles) {
      const roles = meta.roles as string[] | undefined;
      // console.log(`Path Roles ${roles} : User Roles ${data.value?.role}`);
      if (roles && roles.includes(data.value?.role)) {
        return true;
      } else {
        abortNavigation({ statusCode: 403, message: "Access Denied" });
      }
    }
  }
  throw new Error(`Missing roles on route ${to.path}`);
});
