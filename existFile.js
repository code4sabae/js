export const existFile = async (fn) => {
  try {
    await Deno.stat(fn);
    return true;
  } catch (_) {
  }
  return false;
};
