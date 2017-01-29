import React, { Component } from 'react'
import {render} from 'react-dom'
import Die from './die'

import './styles.scss'

class DiceContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  rollAll() {

  }

  render() {
    return (
      <div className="dice-container">
        <Die />
        <Die />
      </div>
    )
  }
}

render(<DiceContainer/>, document.getElementById('app'));