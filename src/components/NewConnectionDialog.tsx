import * as React from 'react'
import { IStore } from '../mobx/store'
import { Dialog, Position, Toaster, InputGroup, Button, Intent } from '@blueprintjs/core'
import { Promise } from 'es6-promise'
import * as validUrl from 'valid-url'
import axios from 'axios'

export interface NewConnectionDialogProps {
  isOpen: boolean
  pingConnection(host: string, port: number): Promise<void>
  onConnect(host: string, port: number): Promise<boolean>
  onClose(): void
}

interface NewConnectionDialogState {
  host: string
  port: number
  nickname: string
  canConnect: boolean
}

export class NewConnectionDialog
  extends React.Component<NewConnectionDialogProps,
                          NewConnectionDialogState>  {

  private getDefaultState = () => ({
    host: '127.0.0.1',
    port: 6789,
    nickname: '',
    canConnect: false
  })

  constructor(props: NewConnectionDialogProps, context: any) {
    super(props, context)
    this.state = this.getDefaultState()
  }

  validateConnectionParams = () => {
    const url = `http://${this.state.host}:${this.state.port}`
    if (this.state.nickname.length > 0 && validUrl.isHttpUri(url)) {
      const pingUrl = `${url}/api/v1/status` 
      axios.get(pingUrl).then(() => {
        this.setState({ canConnect: true })
      }).catch(() => {
        this.setState({ canConnect: false })
      })
    } else {
      this.setState({ canConnect: false })
    }
  }

  handleClose = () => {
    this.setState(this.getDefaultState())
    this.props.onClose()
  }

  handleConnect = () => {
    const { host, port } = this.state
    this.props.onConnect(host, port).then((success) => {
      if (success) {
        this.handleClose()
      }
    }).catch((e) => {
      const connectionError = Toaster.create({
        position: Position.TOP
      })
      connectionError.show({
        message: "Connection Error. Details: " + e
      })
    })
  }

  render() {
    const {host, port, nickname} = this.state

    const handleHostChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({host: (event.target as HTMLInputElement).value})
      this.validateConnectionParams()
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({nickname: (event.target as HTMLInputElement).value})
      this.validateConnectionParams()
    }

    const handlePortChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({port: +(event.target as HTMLInputElement).value})
      this.validateConnectionParams()
    }

    return (
      <Dialog title="New Connection"
        iconName="new-link"
        onClose={this.handleClose.bind(this)}
        isOpen={this.props.isOpen}>
        <div className="pt-dialog-body">
          <label>Hostname</label>
          <InputGroup value={host} type="text"
            onChange={handleHostChange}/>
          <label>Port</label>
          <InputGroup value={port.toString()} type="text"
            onChange={handlePortChange}/>
          <label>Nickname</label>
          <InputGroup value={nickname} type="text"
            onChange={handleNicknameChange}/>
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button
              disabled={!this.state.canConnect}
              intent={Intent.SUCCESS}
              onClick={this.handleConnect}
              text="Connect" />
          </div>
        </div>
      </Dialog>
    )
  }
}