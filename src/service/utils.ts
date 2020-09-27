export const parseDate = (str: string): Date =>
  !Number.isNaN(Date.parse(str)) ? new Date(str) : null;
