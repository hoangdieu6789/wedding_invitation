export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  // Strip surrounding quotes some env-var UIs preserve literally when pasted.
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}
