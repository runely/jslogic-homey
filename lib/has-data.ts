export default function hasData<T> (value: T): boolean {
  if (Array.isArray(value)) {
    return value.length !== 0;
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  if (['boolean', 'function', 'number'].includes(typeof value)) {
    return true;
  }

  return Object.keys(value as object).length !== 0;
}
