import React, { Component } from 'react'
import DeckList from './DeckList'
import EditDeckForm from './EditDeckForm'


export default class AllDecks extends Component {


  state = {
    editFields: false,
    selectedDeck: {}
  }

  componentDidMount() {
    this.props.getAll("decks")

    // fetch('http://localhost:8000/decks')
    //   .then(stuff => stuff.json())
    //   .then(decks => {
    //     // console.log(decks)
    //     this.props.setMovies(decks)
    //   })
  }

  consoleLog = () => {
    console.log(this.props.decks)
  }

  backButton = () => {
    this.setState({editFields: false})
    console.log(this.state.selectedDeck)
  }

  editTrigger = (resource, deck) => {
    this.setState({editFields: true})
    this.setState({selectedDeck: deck})
  }

  editThis = (resource, newObj, id) => {
    this.props.edit(resource, newObj, id)
    this.setState({editFields: false})
  }

  render() {

    let deckList = ""

    if (this.state.editFields == false) {
      deckList = (<DeckList decks={this.props.decks} delete={this.props.delete} editTrigger={this.editTrigger}></DeckList>)
    } else {
      deckList = (<EditDeckForm decks={this.props.decks} backButton={this.backButton} selectedDeck={this.state.selectedDeck} editThis={this.editThis}/>)
    }

    return (
      <div>
        {/* <button onClick={this.consoleLog}>GET MOVIES</button> */}
        <ul>
          {deckList}
        </ul>
      </div>
    )
  }
}