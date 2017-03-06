import * as React from 'react'
import { IStore } from '../mobx/store'
import {SideNav} from './SideNav'

export interface AppProps {
  store: IStore
}

export class App extends React.Component<AppProps, void> {
  render () {
    return (
      <div className="app pt-dark tile is-ancestor">
        <div className="sidenav tile is-vertical is-2 is-fullheight">
          <SideNav store={this.props.store} />
        </div>
        <div className="tile is-vertical is-5">
          Editor
        </div>
        <div className="tile is-vertical is-5">
          Game
        </div>
      </div>
    )
  }
}