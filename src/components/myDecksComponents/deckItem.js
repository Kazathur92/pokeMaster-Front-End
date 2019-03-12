import React, { Component } from 'react'
import DeckModal from './deckModal'
import APIManager from '../managerComponents/APIManager';
import './viewDeck.css'

export default class DeckItem extends Component {

    state = {
        selectedDeck: [],
        modal: false,
        inspectField: false,
        cardsOfDeck: []
    }



    componentDidUpdate(prevProps) {
        if(this.props.woop !== prevProps.woop){
            console.log("DECK ITEM UPDATING")
            // console.log("HI")
        }
    }

    viewDeck= (deck) => {
        // console.log(deck.target)

        const waiter = () => new Promise((resolve, reject) => {
        return setTimeout(() => {
            console.log("setting state of selected deck")
        this.setState({
            modal: true,
            selectedDeck: deck
        })
        resolve()
    })
    })

    waiter().then(() => {
        let token = localStorage.getItem("token")
        APIManager.getAll("deckcardsrelationship", token, "?filter=")
            .then(data => {
                // START OF AFTER GETTING ALL CARDS IN RELATIONSHIP
                let cardsOfDeck = []

                data.map(card => {
                    // START OF RELATIONSHIP MAP
                    if (card.deck === this.state.selectedDeck.url) {
                        // START OF IF
                        this.props.getCardsById(card.cardId)
                            .then(card => {

                                new Promise((resolve, reject) => {
                                    cardsOfDeck.push(card)
                                    resolve()
                                })
                                    .then(() => {
                                        this.setState({
                                            cardsOfDeck: cardsOfDeck
                                        })
                                    })
                            })

                        // END OF IF
                    }


                    // END OF RELATIONSHIP MAP
                })


                // END OF .THEN AFTER GETTING ALL CARDS IN RELATIONSHIP
            })

            // END OF FUNCTION VIEW DECK
        })


    }

    closeViewDeck = () => {
        this.setState({
            modal: false
        })
    }

    inspectIt = (deck) => {
        this.setState({
            inspectField: true,
            selectedDeck: deck,
            cardsOfDeck: []
        })
    }

    dontInspectIt = () => {
        this.setState({
            inspectField: false,
        })
    }



    consoleLog = () => {
        console.log("cards of deck in deck item layer", this.state.cardsOfDeck)
        console.log("SELECTED DECK IN DECK ITEM", this.state.selectedDeck)

    }

    render() {


        let modal = ""

        if (this.state.modal) {
            modal = (
                <DeckModal
                    closeViewDeck={this.closeViewDeck}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getAll={this.props.getAll}
                    getCardsById={this.props.getCardsById}
                    editThis={this.props.editThis}
                    deleteThis2={this.props.deleteThis2}
                    deleteRelationship={this.props.deleteRelationship}
                    // DATA STATES
                    selectedDeck={this.state.selectedDeck}
                    decks={this.props.decks}
                    userDecks={this.props.userDecks}
                    userCards={this.props.userCards}
                    users={this.props.users}
                    token={this.props.token}
                    cards={this.props.cards}
                    // CREATED DATA
                    cardsOfDeck={this.state.cardsOfDeck}
                    changeWoop={this.props.changeWoop}
                    woop={this.props.woop}
                    />
            )
        } else {
            modal = null
        }


        let inspect = ""
        if(this.state.inspectField) {

            inspect = (
                <button  onClick={() => this.viewDeck(this.state.selectedDeck)}>inspect</button>
            )


        }
        else {
            inspect = null
        }


        let deckItem = ""

        if (this.props.userDecks) {

            deckItem = (
                <React.Fragment>
                    {modal}
                    {/* <button onClick={this.consoleLog}>console log deck item</button> */}
                    {this.props.userDecks.map(deck =>

                        <div key={deck.id} >
                            <div className="card deckDiv" onMouseEnter={() => this.inspectIt(deck)} onMouseLeave={this.dontInspectIt}>
                                <div className="card-image" >
                                    <img className="deckCoverImage" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                </div>
                                <div className="">
                                    <div className="media">
                                        <div className="media-left">
                                            <img className="deckMVPImage" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                        </div>
                                        <div className="media-content">
                                            <p className="title deckMVP">MVP</p>
                                            <p className="subtitle deckSub">name of pokemon</p>
                                        </div>
                                    </div>
                                    <p className="deckName">{deck.name}</p>
                                    {inspect}
                                    <time className="deckDate" dateTime={deck.date_added}>created: {deck.date_added}</time>
                                    <button onClick={() => this.props.deleteThis2("decks", deck.id)}>delete</button>
                                    <button>edit</button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </React.Fragment>
            )


        } else {
            deckItem = (
                <div>
                    <p>You dont have any decks!</p>
                </div>
            )
        }





        return (
            <React.Fragment>

                {deckItem}
            </React.Fragment>
        )
    }


}


