import React, { Component } from 'react'
import APIManager from '../managerComponents/APIManager'
import './viewCollection.css'


export default class CardModal extends Component {

    state = {
        selectedDeck: {},
        selectedDeckId: {},
        deckInQuestion: []
    }

    componentDidMount() {
        console.log("SWITCH ON MOUNT MODAL", this.props.triggerSwitch)
        this.setState({
            selectedDeck: "---------------------"
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.cardsOfDeck !== prevProps.cardsOfDeck) {
            console.log("!@#!@#COLLECTION MODAL COMPONENT UPDATING!@#!@#")
            this.props.updateCardsOfDeck(this.props.selectedCard, this.state.selectedDeck)
            // let cardsOfThisDeck = []
            // let token = localStorage.getItem("token")
            // APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeckId}`, token)
            //     .then(data => {
            //         console.log("DATA", data)
            //         data.map(card => {
            //             new Promise((resolve, reject) => {
            //                 cardsOfThisDeck.push(card)
            //                 resolve()
            //             })
            //         })
            //     }
            //     ).then(() => {
            //         new Promise((resolve, reject) => {
            //             this.setState({
            //                 deckInQuestion: cardsOfThisDeck
            //             })
            //             resolve()
            //         })
            //     })
        }

        if(this.props.triggerSwitch !== prevProps.triggerSwitch) {
            console.log("!@#!@#TRIGGER SWITCH CHANGED!")
            // this.props.changeTriggerSwitch()
            this.props.getAll2("cards")
        }

        if(this.props.deckOfThisCard !== prevProps.deckOfThisCard){
            console.log("HI")
        }
    }


    selectDeck = (event) => {
        console.log("SELECTED DECK", event.target.value)
        let token = localStorage.getItem("token")

        new Promise((resolve, reject) => {
            this.setState({
                selectedDeck: event.target.value,
            })
            resolve()
        })
            .then(() =>
                APIManager.getWithUrl(`${this.state.selectedDeck}`, token)
            )
            .then(deck => {
                this.setState({
                    selectedDeckId: deck.id
                })
            })

    }

    addCardToDeck = () => {
        let userName = localStorage.getItem("username")
        let token = localStorage.getItem("token")
        console.log("DECK ID", this.state.selectedDeckId)

        let cardsOfThisDeck = []

        if (this.state.selectedDeck === "---------------------" || this.state.selectedDeck === {}) {
            alert("Please select a deck")
        }

        else {

            APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeckId}`, token)
                .then(data => {
                    console.log("DATA", data)
                    data.map(card => {
                        new Promise((resolve, reject) => {
                            cardsOfThisDeck.push(card)
                            resolve()
                        })
                    })
                }
                ).then(() => {
                    new Promise((resolve, reject) => {
                        this.setState({
                            deckInQuestion: cardsOfThisDeck
                        })
                        resolve()
                    })
                })
                .then(() => {
                    if (this.state.deckInQuestion.length >= 60) {
                        alert("This Deck already has 60 cards")
                    }

                    else {
                                const newCardToDeck = {
                                    cardId: this.props.selectedCard.cardId,
                                    card: this.props.selectedCard.url,
                                    deck: this.state.selectedDeck,
                                }
                                console.log(newCardToDeck)

                                this.props.createNewCard("deckcardsrelationship", newCardToDeck)
                                    .then(data => {
                                        this.props.updateCardsOfDeck(this.props.selectedCard, data.deck)
                                        // this.props.getAll2("cards")
                                        console.log("data getting back after postig to relationship: ", data)
                                    })
                    }

                })
            }
    }


    consoleLog = () => {
        console.log("CARDS", this.props.cards)
        console.log("CARDS OF THIS DECK", this.state.deckInQuestion)
        console.log("SELECTED DECK props", this.state.selectedDeck)
        // console.log("DECK ID", this.state.selectedDeckId)
        // console.log("SELECTED CARD", this.props.selectedCard)
        console.log("DECK OF THIS CARD PROPS", this.props.deckOfThisCard)
        console.log("CARDS OF DECK", this.props.cardsOfDeck)
        console.log("TRIGGER SWITCH PROPS", this.props.triggerSwitch)
        // let cardsOfThisDeck = []
        // let token = localStorage.getItem("token")
        // APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeckId}`, token)
        //         .then(data => {
        //             console.log("DATA", data)
        //             data.map(card => {
        //                 new Promise((resolve, reject) => {
        //                     cardsOfThisDeck.push(card)
        //                     resolve()
        //                 })
        //             })
        //         }
        //         ).then(() => {
        //                console.log("CARDS OF DECK", cardsOfThisDeck)

        //         })
    }


    render() {

        let deckInfo = ""

        if (this.props.deckOfThisCard) {
            deckInfo = (
                <p className="deckTitle">{this.props.deckOfThisCard.name}</p>
            )
        } else {
            deckInfo = (
                <div>
                    <p>This card doesnt belong to a deck</p>
                    <select onChange={this.selectDeck}>
                        <option>--------------</option>
                        {this.props.decks.map(deck =>

                            <option value={deck.url} key={deck.id}>{deck.name}</option>

                        )
                        }
                    </select>
                    <button onClick={this.addCardToDeck}>Add to Deck</button>
                </div>
            )
        }


        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Modal title</p>
                            <button onClick={this.props.closeModal} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body modalSection">
                            <img className="selectedCardImage" src={this.props.selectedCard.imageUrlHiRes}></img>
                            <label>Belongs to deck:</label>
                            {deckInfo}
                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={this.consoleLog} className="button is-success">Console Log</button>
                            <button onClick={this.props.closeModal} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}






