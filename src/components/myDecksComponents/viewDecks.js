import React, { Component } from 'react'
import NewDeckForm from './newDeckForm'
import DeckItem from './deckItem'
import './viewDeck.css'



export default class ViewMyDecks extends Component {


    // TODO: need to find a way to update the component so new decks appear when added

    componentDidMount(){
        console.log("$$$$ DID MOUNT VIEW DECKS $$$$")
        this.props.findUserDecks()
    }


    componentDidUpdate(prevProps) {
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
                middleManUpdater={this.props.middleManUpdater}
                createButDontGet={this.props.createButDontGet}
                    />
                <div className="decksArea">
                <DeckItem decks={this.props.decks}
                deleteThis={this.props.deleteThis}
                deleteThis2={this.props.deleteThis2}
                userDecks={this.props.userDecks}
                findUserDecks={this.props.findUserDecks}/>
                </div>
            </React.Fragment>
        )
    }
}