/**
 * Generates a simple hash from a string value.
 *
 * @param value The string to hash.
 * @returns The resulting hash as a string.
 */
export function generateHash(value: string): string {
  let hash = 0;
  for (const char of value) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }

  return hash.toString();
}
