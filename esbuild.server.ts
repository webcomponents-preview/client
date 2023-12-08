import http, { type ServerResponse, type Server } from 'node:http';

type DevServer = Server & {
  /**
   * To be used as banner for the client script.
   * Reloads the page if the dev server sends a message.
   * @param reloadQueryParam - query parameter to be added to the URL
   */
  reloadBanner(reloadQueryParam?: string): string;

  /**
   * Sends a message to the client using Server-Sent Events.
   * @param data - arbitrary data to be send to the client that can be stringified to JSON
   */
  respond(data: unknown): void;
};

export function createServer(port: number): DevServer {
  let stream: ServerResponse;

  const server = http.createServer((request, response) => {
    const proxyRequest = http.request(
      {
        port,
        path: request.url,
        method: request.method,
        headers: request.headers,
      },
      (proxyResponse) => {
        // intercept /wcp requests
        if (request.headers.accept === 'text/event-stream' && request.url === '/wcp') {
          stream = response;
          stream.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          });
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

  server.reloadBanner = (reloadQueryParam) => `
// reload page on file change
if (typeof EventSource !== 'undefined') {
  new EventSource('/wcp').addEventListener('message', () => {
    ${
      !reloadQueryParam
        ? `window.location.reload();`
        : `const redirect = new URL(window.location.href);
    redirect.searchParams.set('${reloadQueryParam}', '');
    window.location.href = redirect.toString();`
    }
  });
}
    `;

  return server;
}
