import * as React from 'react'
import { IStore } from '../mobx/store'
import {SideNav} from './SideNav'
import {MiddleContent} from './MiddleContent'
import {GameContent} from './GameContent'

export interface AppProps {
  store: IStore
}

export class App extends React.Component<AppProps, void> {
  render () {
    return (
      <div className="app pt-dark columns is-fullheight">
        <div className="sidenav column is-vertical is-2 is-fullheight">
          <SideNav store={this.props.store} />
        </div>
        <div className="middle-content column is-4">
          <MiddleContent />
        </div>
        <div className="game-content column is-6">
          <GameContent />
        </div>
      </div>
    )
  }
}