export function getParamsSingle(params: any, key: string) {
  if (params[key]) {
    if (typeof params[key] === "string") {
      return params[key];
    }
    throw new Error("Invalid id");
  }
  throw new Error("No id provided");
}
