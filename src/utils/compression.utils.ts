/**
 *	Compress a string with browser native APIs into a string representation
 *
 * @param data - Input string that should be compressed
 * @param encoding - Compression algorithm to use
 * @returns The compressed string
 */
export async function compress(data: string, encoding: CompressionFormat): Promise<string> {
  // stream the string through the compressor
  const stream = new Blob([new TextEncoder().encode(data)]).stream().pipeThrough(new CompressionStream(encoding));
  // convert the stream to an array buffer
  const buffer = await new Response(stream).arrayBuffer();
  // convert the array buffer to a binary string
  const binary = Array.from(new Uint8Array(buffer), (x) => String.fromCodePoint(x)).join('');
  // convert and deliver the binary as ascii string
  return btoa(binary);
}

/**
 * Decompress a string representation with browser native APIs in to a normal js string
 *
 * @param data - String that should be decompressed
 * @param encoding - Decompression algorithm to use
 * @returns The decompressed string
 */
export async function decompress(data: string, encoding: CompressionFormat): Promise<string> {
  // convert the input to a binary string
  const binary = atob(data);
  // stream the string through the decompressor
  const stream = new Blob([Uint8Array.from(binary, (m) => m.codePointAt(0) ?? 0)])
    .stream()
    .pipeThrough(new DecompressionStream(encoding));
  // convert the stream to a string
  return new Response(stream).text();
}
