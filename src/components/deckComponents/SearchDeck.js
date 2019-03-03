import React, { Component } from 'react'


export default class SearchDeck extends Component {

  state = {
    keyword: null
  }


  searchDecks = () => {
    this.props.search("decks", this.state.keyword)
  }

  setKeyword = (event) => {
    this.setState({ keyword: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" onChange={this.setKeyword} placeholder="Deck Name"></input>
        <button onClick={this.searchDecks}>search</button>
      </React.Fragment>
    )
  }
}