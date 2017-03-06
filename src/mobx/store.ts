import {ConnectionStore} from './ConnectionStore'

export interface IStore {
  connections: ConnectionStore
}

export function createStore(): IStore {
  return {
    connections: new ConnectionStore()
  }
}


