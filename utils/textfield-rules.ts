export function isEmail(message: string): (value: string) => string | boolean {
  return (value: string) => /.+@.+\..+/.test(value) || message;
}

export function isRequired(message: string): (value: string) => string | boolean {
  return (value: string) => !!value || message;
}
