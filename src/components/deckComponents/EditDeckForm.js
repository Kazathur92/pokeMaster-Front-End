import React, { Component } from 'react';

export default class EditDeckForm extends Component {

state = {
  name: this.props.selectedDeck.name
}

handleFieldChange = (event) => {
  const stateToChange = {}
  stateToChange[event.target.id] = event.target.value
  this.setState(stateToChange)
}

render(){
  return(
    <React.Fragment>
      <button onClick={this.props.backButton}>Back to list</button>
       <h3>{this.props.selectedDeck.title}</h3>
        <input id="name" type="text" onChange={this.handleFieldChange} value={this.state.name}></input>
        <button onClick={() => this.props.editThis("decks", this.state, this.props.selectedDeck.id)}>Submit Changes</button>
        {/* <button onClick={this.consoleLog}>check states</button>  */}
    </React.Fragment>
  )
}

}