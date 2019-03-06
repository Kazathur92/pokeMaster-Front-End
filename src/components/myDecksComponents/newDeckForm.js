import React, { Component } from 'react';

let userId = sessionStorage.getItem("id")

export default class NewDeckForm extends Component {

  state = {
    name: "",
    description: "",
    strategy: "",
    date_added: "",
    deleted_on: "",
    cardAmount: 0,
    maxCardAmmount: 60,
    user: this.props.currentUser.id
  }

  componentDidMount(){
      this.makeDate()
  }

  handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
    console.log(userId)
  }

  createDeck = (resource) => {
    console.log("STATE", this.state)
    this.props.createNew(resource, this.state)
  }

  makeDate = () => {

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    // today = mm + '-' + dd + '-' + yyyy;
    today = yyyy + '-' + mm + '-' + dd;

    this.setState({
      date_added: today
    })
    }

  consoleLog = () => {
    console.log("date_added state", this.state.date_added)
    console.log("deleted on state", this.state.deleted_on)
    console.log("name state", this.state.name)
    console.log("desc state", this.state.description)
    console.log("strat", this.state.strategy)
  }

  render(){
    return(
      <React.Fragment>
        <h3>Add a new deck to the collection!</h3>
        <input id="name" type="text" placeholder="deck title" onChange={this.handleFieldChange}></input>
        <input id="description" type="text" placeholder="description" onChange={this.handleFieldChange}></input>
        <input id="strategy" type="text" placeholder="strategy" onChange={this.handleFieldChange}></input>
        <button onClick={() => this.createDeck("decks")}>Save Deck</button>
        <button onClick={this.consoleLog}>check states</button>
      </React.Fragment>
    )
  }
}