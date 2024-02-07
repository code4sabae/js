export const equals = (a, b) => {
  if (a == b) return true;
  if (!a || !b) return false;
  if (typeof a != typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!equals(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a == "object") {
    if (Object.keys(a).length != Object.keys(b).length) return false;
    for (const name in a) {
      if (!equals(a[name], b[name])) return false;
    }
    return true;
  }
  return a == b;
};
