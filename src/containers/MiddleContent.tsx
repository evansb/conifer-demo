import * as React from 'react'
import { Tabs2, Tab2 } from '@blueprintjs/core'

export class MiddleContent extends React.Component<void, void> {

  getPanel(tab: string) {
    return (
      <div className="behavior-content">
        {tab}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Tabs2 animate={false} id="behavior-tab">
          <Tab2 id="behavior-live" title="Current" panel={this.getPanel("live")} />
          <Tab2 id="behavior-staged" title="Staged" panel={this.getPanel("staged")} />
          <Tab2 id="behavior-debug" title="Debug" panel={this.getPanel("debug")} />
        </Tabs2>
      </div>
    )
  }
}