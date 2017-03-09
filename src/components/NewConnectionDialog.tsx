import * as React from 'react'
import { IStore } from '../mobx/store'
import { Dialog, Position, Toaster, InputGroup, Button, Intent } from '@blueprintjs/core'
import { Promise } from 'es6-promise'
import * as validUrl from 'valid-url'
import axios from 'axios'

export interface NewConnectionDialogProps {
  isOpen: boolean
  pingConnection(host: string, port: number): Promise<void>
  onConnect(host: string, port: number, nickname: string): Promise<void>
  onClose(): void
}

interface NewConnectionDialogState {
  host: string
  port: number
  nickname: string
}

export class NewConnectionDialog
  extends React.Component<NewConnectionDialogProps,
                          NewConnectionDialogState>  {

  private getDefaultState = () => ({
    host: 'localhost',
    port: 6789,
    nickname: ''
  })

  constructor(props: NewConnectionDialogProps, context: any) {
    super(props, context)
    this.state = this.getDefaultState()
  }

  handleClose = () => {
    this.setState(this.getDefaultState())
    this.props.onClose()
  }

  handleConnect = () => {
    const { host, port, nickname } = this.state
    this.props.onConnect(host, port, nickname).then(() => {
      this.handleClose()
    }).catch((e) => {
      const connectionError = Toaster.create({
        position: Position.TOP
      })
      connectionError.show({
        intent: Intent.DANGER,
        message: "Connection Error"
      })
    })
  }

  render() {
    const {host, port, nickname} = this.state

    const handleHostChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({host: (event.target as HTMLInputElement).value})
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({nickname: (event.target as HTMLInputElement).value})
    }

    const handlePortChange = (event: React.FormEvent<HTMLElement>) => {
      this.setState({port: +(event.target as HTMLInputElement).value})
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
              disabled={this.state.nickname.length <= 0}
              intent={Intent.SUCCESS}
              onClick={this.handleConnect}
              text="Connect" />
          </div>
        </div>
      </Dialog>
    )
  }
}