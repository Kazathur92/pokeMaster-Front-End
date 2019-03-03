import React, { Component } from 'react';


export default class AddDeckForm extends Component {

  state = {
    name: "",
    date_added: "",
    deleted_on: null
  }

  handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  createDeck = (resource) => {
    var yearDate = new Date()
    var monthDate = new Date()
    var dayDate = new Date()
    let year = yearDate.getFullYear()
    let month = monthDate.getMonth() + 1
    let day = dayDate.getDay()
    let today = year + "-" + "0" + month + "-" + "0" + day
    let formattedDate = `${today}`
    // let month = thisDate.getMonth()
    // let today = thisDate.Date.now()
    console.log("TODAY: ", formattedDate)
      this.setState({
          date_added: String(formattedDate),
          deleted_on: ""
      })
      this.props.create(resource, this.state)

  }

  consoleLog = () => {
    console.log("date_Added state", this.state.date_added)
  }

  render(){
    return(
      <React.Fragment>
        <h3>Add a new deck to the collection!</h3>
        <input id="name" type="text" placeholder="deck title" onChange={this.handleFieldChange}></input>
        <button onClick={() => this.createDeck("decks")}>Save Deck</button>
        {/* <button onClick={this.consoleLog}>check states</button> */}
      </React.Fragment>
    )
  }
}