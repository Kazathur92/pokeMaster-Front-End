import React, { Component } from 'react'
import NewDeckForm from './newDeckForm'
import DeckItem from './deckItem'
import './viewDeck.css'



export default class ViewMyDecks extends Component {


    // TODO: need to find a way to update the component so new decks appear when added


    componentDidUpdate() {

    }


    consoleLog = () => {
        console.log("PROPS DEKCS: ", this.props.decks)
    }

    render() {
        return (
            <React.Fragment>
                <h1>Decks</h1>
                <button onClick={this.consoleLog}>consoleLog viewDecks</button>
                <NewDeckForm createNew={this.props.createNew}
                currentUser={this.props.currentUser}
                    />
                <div className="decksArea">
                <DeckItem decks={this.props.decks}
                deleteThis={this.props.deleteThis}/>
                </div>
            </React.Fragment>
        )
    }
}