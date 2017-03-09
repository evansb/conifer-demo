import {Socket} from 'phoenix'
import {Promise} from 'es6-promise'
import {computed, observable} from 'mobx'

export interface IHandle {
  host: string
  port: number
  nickname: string

  displayName: string

  connect(): Promise<void>
  disconnect(): void
}

class Handle implements IHandle {

  private socket: Socket

  constructor(public host: string, public port: number,
    public nickname: string) {
    const endpoint = `ws://${host}:${port}/socket`
    this.socket = new Socket(endpoint, {
      transport: WebSocket,
      params: {
        nickname
      }
    })
  }

  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.socket.connect()
        this.socket.onOpen(resolve)
        this.socket.onError(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  @computed get displayName() {
    return `${this.nickname}@${this.host}:${this.port}`
  }

  disconnect() {
    this.socket.disconnect()
  }

}

export class ConnectionStore {
  @observable connection: IHandle = null

  create(host: string, port: number, nickname: string,
    opts = { protocol: "ws" }): IHandle {
    this.connection = new Handle(host, port, nickname)
    return this.connection
  }
}