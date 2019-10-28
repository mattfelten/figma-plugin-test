import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

declare function require(path: string): any

class App extends React.Component {

  onConvert = () => {
    parent.postMessage({ pluginMessage: { type: 'convert-wireframe' } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return <div>
      <h2>Convert Wireframe to UI</h2>
      <button id="create" onClick={this.onConvert}>Convert</button>
      <button onClick={this.onCancel}>Cancel</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
