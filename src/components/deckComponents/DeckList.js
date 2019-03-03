import React, { Component } from 'react'

export default class DeckList extends Component {

deleteThis = (resource, id) => {
  this.props.delete(resource, id)

}

editFieldTrigger = (resource, deck) => {
  this.props.editTrigger(resource, deck)
}


  render() {

    const deckNode = this.props.decks.map(deck => {
      return (<li key={deck.id}>{deck.name} Deck<button onClick={() => this.deleteThis("decks", deck.id)}>X</button><button onClick={() => this.editFieldTrigger("decks", deck)}>edit</button></li>)
    })

    return (
      <React.Fragment>
        {deckNode}
      </React.Fragment>
    )
  }
}