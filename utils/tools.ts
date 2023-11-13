export function nonReactiveClone(object: any) {
  return JSON.parse(JSON.stringify(object));
}

export function fileToSizeString(bytes: number) {
  if (bytes < 1000) return `${bytes} bytes`;
  if (bytes < 1000000) return `${(bytes / 1000).toFixed(2)} kb`;
  if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(2)} mb`;
  if (bytes < 1000000000000) return `${(bytes / 1000000000).toFixed(2)} gb`;
  return `${(bytes / 1000000000000).toFixed(2)} tb`;
}

export function fileToUrl(file: File) {
  return URL.createObjectURL(file);
}

export function isUUIDv4(str: string): boolean {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(str);
}
