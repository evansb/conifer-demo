import {Socket} from 'phoenix'

export interface IHandle {
  host: string
  port: number
  close(): void
}

export class ConnectionStore {
  connections: IHandle[]

  constructor() {
    this.connections = []
  }

  create(host: string, port: number, opts = { protocol: "wss" }) {
    const endpoint = `${opts.protocol}://${host}:${port}/socket` 
    const socket = new Socket(endpoint)
    socket.connect()
  }
}