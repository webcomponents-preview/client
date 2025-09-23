import type { OutgoingHttpHeaders, Server, ServerResponse } from 'node:http';
import http from 'node:http';

type DevServer = Server & {
  /**
   * To be used as banner for the client script.
   * Reloads the page if the dev server sends a message.
   * @param reloadQueryParam - query parameter to be added to the URL
   * @param host - optional host to be used (defaults to empty string)
   */
  reloadBanner(reloadQueryParam?: string, host?: string): string;

  /**
   * Sends a message to the client using Server-Sent Events.
   * @param data - arbitrary data to be send to the client that can be stringified to JSON
   */
  respond(data: unknown): void;
};

/**
 * Creates a local dev server as proxy for `esbuild.serve()`.
 * @param port - of the public facing dev server
 * @param cors - whether to enable CORS headers (defaults to false)
 * @returns a proxy dev server
 */
export function createServer(port: number, cors = false): DevServer {
  let stream: ServerResponse;

  const server = http.createServer((request, response) => {
    const proxyRequest = http.request(
      {
        port,
        path: request.url,
        method: request.method,
        headers: request.headers,
      },
      proxyResponse => {
        // intercept /wcp requests
        if (request.headers.accept === 'text/event-stream' && request.url === '/wcp') {
          // prepare headers for SSE
          const headers: OutgoingHttpHeaders = {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          };

          // enable CORS if requested
          if (cors) {
            headers['Access-Control-Allow-Origin'] = '*';
          }

          stream = response;
          stream.writeHead(200, headers);
          stream.write('\n');
          return;
        }

        // Otherwise, forward the response from esbuild to the client
        response.writeHead(proxyResponse.statusCode ?? 200, proxyResponse.headers);
        proxyResponse.pipe(response, { end: true });
      }
    );
    request.pipe(proxyRequest, { end: true });
  }) as DevServer;

  server.respond = (data: unknown) => {
    if (stream) {
      stream.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  };

  server.reloadBanner = (reloadQueryParam, host = '') => `
// reload page on file change
if (typeof EventSource !== 'undefined') {
  new EventSource('${host}/wcp').addEventListener('message', () => {
    ${
      !reloadQueryParam
        ? 'window.location.reload();'
        : `const redirect = new URL(window.location.href);
    redirect.searchParams.set('${reloadQueryParam}', '');
    window.location.href = redirect.toString();`
    }
  });
}
    `;

  return server;
}
