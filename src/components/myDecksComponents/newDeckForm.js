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
    user: this.props.users.url
  }

  componentDidMount(){
    console.log("#### DID MOUNT DECK FORM START ####")
      this.makeDate()
      this.setState({
          user: this.props.users.url
      })
    console.log("#### DID MOUNT DECK FORM END  ####")
  }

  handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  createDeck = (resource) => {
    //   this.props.createButDontGet(resource, this.state)
    this.props.createNewDeck(resource, this.state)
    .then(() => {
        this.setState({
            name: "",
        description: "",
        strategy: "",
        date_added: "",
        deleted_on: "",
        cardAmount: 0,
        maxCardAmmount: 60,
        user: this.props.users.url
        })
        this.props.getAll2(resource)
    })
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
    console.log("current user props", this.props.currentUser)
    console.log("STATES", this.state)
  }

  render(){
    return(
      <React.Fragment>
        <h3>Add a new deck to the collection!</h3>
        <div className="newDeckFields">
        <input id="name" type="text" placeholder="deck title" onChange={this.handleFieldChange}></input>
        <div className="newDeckDescriptionAndStrategy">
        <textarea id="description" rows="4" cols="50" type="text" placeholder="description" onChange={this.handleFieldChange}></textarea>
        <textarea id="strategy" rows="4" cols="50" type="text" placeholder="strategy" onChange={this.handleFieldChange}></textarea>
        </div>
        <button className="saveDeckButton" onClick={() => this.createDeck("decks")}>Save Deck</button>
        {/* <button onClick={this.consoleLog}>check states</button> */}
        </div>
      </React.Fragment>
    )
  }
}