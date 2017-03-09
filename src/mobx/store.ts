import {ConnectionStore} from './ConnectionStore'

export interface IStore {
  connectionStore: ConnectionStore
}

export function createStore(): IStore {
  return {
    connectionStore: new ConnectionStore()
  }
}


