export const toBoolean = (
  value: string
): boolean => {
  const bool = ["true", "1"].includes(value.toLowerCase())
  return bool;
};
