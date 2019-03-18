import React, { Component } from 'react'
import NewDeckForm from './newDeckForm'
import DeckItem from './deckItem'
import './viewDeck.css'



export default class ViewMyDecks extends Component {


    state = {
        woop: false
    }

    // TODO: need to find a way to update the component so new decks appear when added

    componentDidMount() {
        console.log("$$$$ DID MOUNT VIEW DECKS $$$$")
    }

    componentDidUpdate() {
        console.log("VIEW DECKS UPDATING")
    }

    changeWoop = () => {
        // THIS FORCEs AN UPDATE DOWN IN DECK ITEM
        this.setState({
            woop: !this.state.woop
        })
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
                    createNewDeck={this.props.createNewDeck}
                    getAll2={this.props.getAll2}
                    users={this.props.users}
                    middleManUpdater={this.props.middleManUpdater}
                    createButDontGet={this.props.createButDontGet}
                />
                <div className="decksArea">
                    <DeckItem decks={this.props.decks}
                        getAll2={this.props.getAll2}
                        token={this.props.token}
                        getAllWithQuery={this.props.getAllWithQuery}
                        deleteThis={this.props.deleteThis}
                        deleteThis2={this.props.deleteThis2}
                        deleteRelationship={this.props.deleteRelationship}
                        findUserDecks={this.props.findUserDecks}
                        findUserCards={this.props.findUserCards}
                        getCardsById={this.props.getCardsById}
                        woop={this.state.woop}
                        changeWoop={this.changeWoop}
                        cardsOfDeck={this.props.cardsOfDeck}
                        editThis={this.props.editThis}
                    />
                </div>
            </React.Fragment>
        )
    }
}