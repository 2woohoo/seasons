/* eslint-disable no-useless-constructor */
import React from 'react'
import ReactDom from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Loader from './Loader'

class App extends React.Component {
  state = { lat: null, errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        this.setState({ errorMessage: err.message })
      }
    )
    console.log('Rendered!!')
  }

  componentDidUpdate() {
    console.log('Updated!!')
  }
  renderCOntent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div> Error:{this.state.errorMessage} </div>
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Loader message="Please accept location request" />
  }

  render() {
    return <div className="border red">{this.renderCOntent()}</div>
  }
}

ReactDom.render(<App />, document.querySelector('#root'))
