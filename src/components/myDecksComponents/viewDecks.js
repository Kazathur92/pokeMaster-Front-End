import React, { Component } from 'react'
import NewDeckForm from './newDeckForm'
import DeckItem from './deckItem'
import './viewDeck.css'



export default class ViewMyDecks extends Component {


    render() {
        return (
            <React.Fragment>
                <h1>Decks</h1>
                <NewDeckForm createNew={this.props.createNew} />
                <div className="decksArea">
                <DeckItem decks={this.props.decks}/>
                </div>
            </React.Fragment>
        )
    }
}