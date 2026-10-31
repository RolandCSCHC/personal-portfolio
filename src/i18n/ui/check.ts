function collectPaths(value: unknown, path: string, paths: Set<string>): void {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      throw new Error(`Empty translation at ${path}`);
    }
    paths.add(path);
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`Empty translation list at ${path}`);
    }
    value.forEach((item, index) => {
      collectPaths(item, `${path}.${index}`, paths);
    });
    return;
  }

  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      collectPaths(child, `${path}.${key}`, paths);
    }
    return;
  }

  throw new Error(`Unsupported translation at ${path}`);
}

/** Fail the build when a locale is missing a key, has an extra key, or is blank. */
export function assertSameShape(
  left: unknown,
  right: unknown,
  label: string,
): void {
  const leftPaths = new Set<string>();
  const rightPaths = new Set<string>();
  collectPaths(left, label, leftPaths);
  collectPaths(right, label, rightPaths);

  const missing = [...leftPaths].filter((path) => !rightPaths.has(path)).sort();
  const extra = [...rightPaths].filter((path) => !leftPaths.has(path)).sort();

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      `Translation mismatch. Missing: ${missing.join(', ') || 'none'}. Extra: ${extra.join(', ') || 'none'}.`,
    );
  }
}
