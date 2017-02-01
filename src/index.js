import React, { Component } from 'react'
import {render} from 'react-dom'
import Die from './die'

import './styles.scss'

class DiceContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalValue: props.numDice * 6
    }
    this.dice = []

    this.rollDone = this.rollDone.bind(this)
    this.rollAll = this.rollAll.bind(this)
    this.getDiceTotal = this.getDiceTotal.bind(this)

  }

  rollAll() {
    for (let die of this.dice) {
      if(die !== null) {
        die.rollDie()
      }
    }
  }

  rollDone() {
    this.getDiceTotal()
  }

  getDiceTotal() {
    let total = 0
    for (let die of this.dice) {
      if(die !== null) {
        total += die.getValue()
      }
    }
    this.setState({totalValue: total})
    this.props.totalDisplay(total)
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.numDice !== this.props.numDice) {
  //     let temp = this.dice.slice()
  //     let diff = nextProps.numDice - this.props.numDice
  //     if(diff < 0) {
  //       temp.splice(diff, Math.abs(diff))
  //     } else {
  //       for(let i = 0; i < diff; i++) { temp.push(6) }
  //     }
  //     this.dice = temp
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // this.getDiceTotal()
    // if(prevState.dice !== this.dice) { this.getDiceTotal() }
  }

  componentDidMount() {
        this.props.totalDisplay(this.state.totalValue)
    // this.getDiceTotal()
  }

  render() {
    let { props } = this
    let dice = []
    for (let i = 0; i < props.numDice; i++) {
      dice.push(<Die {...props} key={i} rollDone={this.rollDone.bind(this, i)} ref={die => this.dice[i] = die} />)
    }

    return (
      <div className="dice">
        {dice}
      </div>
    )
  }
}


class TestApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dieSize: 60,
      numDice: 4,
      sides: 6,
      rollTime: 2,
      faceColor: '#FF00AC',
      dotColor: '#5AFF44',
      diceTotal: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.totalDisplay = this.totalDisplay.bind(this)
    this.rollAll = this.rollAll.bind(this)
  }

  handleChange(e) {
    console.log('handleChange', e.target.name, e.target.value, e.target.type);
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value
    })
  }

  totalDisplay(value) {
    this.setState({diceTotal: value})
  }

  rollAll() {
    this.diceContainer.rollAll()
  }

  render() {
    let { state } = this
    let colorStyle = {height: '2.375rem'}
    return (
      <div className="dice-test">
        <form className="row controls align-items-end">
          <fieldset className="form-group col">
            <label htmlFor="numDice">Dice</label>
            <input type="number" name="numDice" id="numDice" className="form-control"
              value={state.numDice} onChange={this.handleChange} min="1" max="100"/>
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="faceColor">Face Color</label>
            <input type="color" name="faceColor" id="faceColor" className="form-control" style={colorStyle}
              value={state.faceColor} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="dotColor">Dot Color</label>
            <input type="color" name="dotColor" id="dotColor" className="form-control" style={colorStyle}
              value={state.dotColor} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="dieSize">Die Size (px)</label>
            <input type="number" name="dieSize" id="dieSize" className="form-control"
              value={state.dieSize} onChange={this.handleChange} disabled/>
          </fieldset>
          <fieldset className="form-group col">
            <label htmlFor="rollTime">Roll Time (seconds)</label>
            <input type="number" name="rollTime" id="rollTime" className="form-control"
              value={state.rollTime} onChange={this.handleChange} />
          </fieldset>
        </form>
        <div className="row info">
          <div className="col">
            <h4>
              <button className="btn btn-primary" onClick={this.rollAll}>Roll All</button>
              {'   '} or click individual dice
            </h4>
          </div>

          <div className="col">
            <h4 className="text-primary">Dice Total:
              <span>{this.state.diceTotal}</span>
            </h4>
          </div>
        </div>
        <div className="row dice">
          <div className="col">
            <DiceContainer {...this.state} totalDisplay={this.totalDisplay}
              ref={c=> this.diceContainer = c} />
          </div>
        </div>
      </div>
    )
  }
}

render(<TestApp />, document.getElementById('app'));
