/**
 *	Compress a string with browser native APIs into a string representation
 *
 * @param data - Input string that should be compressed
 * @param encoding - Compression algorithm to use
 * @returns The compressed string
 */
export declare function compress(data: string, encoding: CompressionFormat): Promise<string>;
/**
 * Decompress a string representation with browser native APIs in to a normal js string
 *
 * @param data - String that should be decompressed
 * @param encoding - Decompression algorithm to use
 * @returns The decompressed string
 */
export declare function decompress(data: string, encoding: CompressionFormat): Promise<string>;
