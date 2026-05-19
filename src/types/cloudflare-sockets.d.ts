declare module 'cloudflare:sockets' {
  interface SocketAddress {
    hostname: string;
    port: number;
  }

  interface SocketOptions {
    secureTransport?: 'on' | 'off' | 'starttls';
    allowHalfOpen?: boolean;
  }

  interface Socket {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<Uint8Array>;
    closed: Promise<void>;
    close(): Promise<void>;
    startTls(): Socket;
  }

  export function connect(address: SocketAddress, options?: SocketOptions): Socket;
}
