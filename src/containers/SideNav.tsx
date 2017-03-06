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

  handleConnect(host: string, port: number): Promise<boolean> {
    return Promise.resolve(true)
  }

  handleCloseNewConnectionDialog() {
    this.setState({isNewConnectionDialogOpen: false })
  }

  openNewConnectionDialog() {
    this.setState({isNewConnectionDialogOpen: true })
  }
  
  render() {
    return (
      <Menu>
        <MenuDivider title="Connection"></MenuDivider>
        <MenuItem
          iconName="new-link"
          onClick={this.openNewConnectionDialog.bind(this)}
          text="New Connection" />
        <MenuDivider />
        <NewConnectionDialog
          isOpen={this.state.isNewConnectionDialogOpen}
          pingConnection={this.pingConnection}
          onConnect={this.handleConnect}
          onClose={this.handleCloseNewConnectionDialog.bind(this)} />
      </Menu>
    )
  }
}