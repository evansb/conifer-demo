import * as React from 'react'
import {Promise} from 'es6-promise'
import {IStore} from '../mobx/store'
import {Menu, MenuItem, MenuDivider} from '@blueprintjs/core'
import {NewConnectionDialog} from '../components/NewConnectionDialog'

export interface SideNavProps {
  store: IStore
}

export interface SideNavState {
  isNewConnectionDialogOpen: boolean
}

export class SideNav extends React.Component<SideNavProps, SideNavState>  {
  constructor(props: SideNavProps) {
    super(props)
    this.state = {
      isNewConnectionDialogOpen: false
    }
  }

  pingConnection(host: string, port: number): Promise<void> {
    return Promise.resolve()
  }

  handleConnect = (host: string, port: number, nickname: string): Promise<void> => {
    const connection = this.props.store.connectionStore.create(host,
      port, nickname)
    return connection.connect()
  }

  handleCloseNewConnectionDialog = () => {
    this.setState({isNewConnectionDialogOpen: false })
  }

  openNewConnectionDialog = () => {
    this.setState({isNewConnectionDialogOpen: true })
  }

  renderConnectionStatus() {
    const connection = this.props.store.connectionStore.connection
    if (!connection) {
      return (
        <a className="pt-button pt-intent-primary pt-icon-new-link"
          onClick={this.openNewConnectionDialog} role="button">
          Connect
        </a>
      )
    } else {
      return (
        <a className="pt-button pt-intent-success" role="button">
          {connection.nickname}@{connection.host}
        </a>
      )
    }
  }
  
  render() {
    return (
      <div className="columns is-multiline">
        <div className="top-right-bar column is-12">
          <div className="pt-button-group pt-fill">
            {this.renderConnectionStatus()}
            <a className="pt-button pt-active pt-icon-eye-on" role="button"></a>
          </div>
        </div>

        <div className="entities-menu column is-12">
          <div className="pt-button-group">
            <a className="pt-button pt-intent-warning pt-icon-git-commit" role="button">
            Commit
            </a>
            <a className="pt-button" role="button">New</a>
            <a className="pt-button" role="button">Remove</a>
          </div>
        </div>

        <div className="peers-menu column is-12">
          <div className="columns">
            <div className="column is-12 is-mobile">
              <b>PEERS</b>
            </div>
          </div>
        </div>

        <NewConnectionDialog
          isOpen={this.state.isNewConnectionDialogOpen}
          pingConnection={this.pingConnection}
          onConnect={this.handleConnect}
          onClose={this.handleCloseNewConnectionDialog} />
      </div>
    )
  }
}