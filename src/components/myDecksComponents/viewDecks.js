import React, { Component } from 'react'
import NewDeckForm from './newDeckForm'
import DeckItem from './deckItem'
import './viewDeck.css'



export default class ViewMyDecks extends Component {


    state = {
        woop: false,
        createNewDeckForm: false
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

    showCreateDeckForm = () => {
        if(this.state.createNewDeckForm === true) {
            this.setState({
                createNewDeckForm: false
            })
        }
        else {
            this.setState({
                createNewDeckForm: true
            })
        }
    }

    hideCreateDeckForm = () => {
        this.setState({
            createNewDeckForm: false
        })
    }



    consoleLog = () => {
        console.log("PROPS DEKCS: ", this.props.decks)
    }

    render() {

        let createNewDeckForm = ""
        if(this.state.createNewDeckForm) {
            createNewDeckForm = (
                <NewDeckForm createNew={this.props.createNew}
                    createNewDeck={this.props.createNewDeck}
                    getAll2={this.props.getAll2}
                    users={this.props.users}
                    middleManUpdater={this.props.middleManUpdater}
                    createButDontGet={this.props.createButDontGet}
                    decks={this.props.decks}
                    hideCreateDeckForm={this.hideCreateDeckForm}
                />
            )
        } else {
            createNewDeckForm = null
        }

        let scrollRightMessage = ""
        if(this.props.decks.length > 4) {
            scrollRightMessage = (
                <p className="scrollRightMessage">Scroll Right to see more Decks</p>
            )
        } else {
            scrollRightMessage = null
        }


        return (
            <React.Fragment>
                <h1 className="decksTitle">DECKS</h1>
                {/* <button onClick={this.consoleLog}>consoleLog viewDecks</button> */}
                <button onClick={this.showCreateDeckForm}>Create New Deck</button>
                {createNewDeckForm}
                {scrollRightMessage}
                <div className="decksArea">
                    <DeckItem decks={this.props.decks}
                        getAll2={this.props.getAll2}
                        token={this.props.token}
                        getAllWithQuery={this.props.getAllWithQuery}
                        deleteIt={this.props.deleteIt}
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
                        cards={this.props.cards}

                        cardsOfDeck={this.props.cardsOfDeck}
                        emptyDeck={this.props.emptyDeck}
                        updateCardsOfDeckStateFalse={this.props.updateCardsOfDeckStateFalse}
                        updateCardsOfDeckStateTrue={this.props.updateCardsOfDeckStateTrue}
                    />
                </div>
            </React.Fragment>
        )
    }
}