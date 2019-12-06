export const isValidUsername = (str: string) =>
  str ? str.trim().length >= 0 : false;

export const isExternal = (path: string) =>
  /^(https?:|mailto:|tel:)/.test(path);
