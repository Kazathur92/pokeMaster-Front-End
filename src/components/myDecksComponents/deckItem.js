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

    componentDidMount() {
        console.log("!!! DECK ITEM MOUNT !!!")
    }

    componentDidUpdate(prevProps) {
        console.log("DECK ITEM UPDATING")



    }


    deleteRelationship = (resource) => {
        let token = this.props.token
        APIManager.deleteIt(resource, token)
            .then(() => {
                let cardsOfDeck = []
                let token = localStorage.getItem("token")
                APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeck.id}`, token)
                    .then(data => {
                        console.log("NEW DATA COMING IN", data)
                        if (data.length >= 1) {
                            data.map(card => {
                                console.log("CARD", card)
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
                            })

                        } else {
                            this.setState({
                                cardsOfDeck: []
                            })
                        }
                    }
                    )
            })

    }


    viewDeck = (deck) => {
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
            let cardsOfDeck = []
            let token = localStorage.getItem("token")
            APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeck.id}`, token)
                .then(data => {
                    console.log(data)
                    data.map(card => {
                        console.log("CARD", card)
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
                    })
                }
                )
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
                    getAll2={this.props.getAll2}
                    closeViewDeck={this.closeViewDeck}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getCardsById={this.props.getCardsById}
                    editThis={this.props.editThis}
                    deleteThis2={this.props.deleteThis2}
                    deleteRelationship={this.deleteRelationship}
                    // DATA STATES
                    selectedDeck={this.state.selectedDeck}
                    decks={this.props.decks}
                    users={this.props.users}
                    token={this.props.token}
                    cards={this.props.cards}
                    cardsOfDeck={this.state.cardsOfDeck}
                    // CREATED DATA
                    changeWoop={this.props.changeWoop}
                    woop={this.props.woop}
                />
            )
        } else {
            modal = null
        }


        let inspect = ""
        if (this.state.inspectField) {

            inspect = (
                <React.Fragment>
                    <button onClick={() => this.viewDeck(this.state.selectedDeck)}>inspect</button>
                    <br></br>
                </React.Fragment>
            )


        }
        else {
            inspect = null
        }


        let deckItem = ""

        if (this.props.decks) {

            deckItem = (
                <React.Fragment>
                    {modal}
                    <button onClick={this.consoleLog}>console log deck item</button>
                    {this.props.decks.map(deck =>

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
                                    <div className="deckNameDiv">
                                        <p className="deckName">{deck.name}</p>
                                    </div>
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


