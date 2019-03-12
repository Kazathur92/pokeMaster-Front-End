import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './searchComponent.css'
import APIManager from '../managerComponents/APIManager';

let userId = sessionStorage.getItem("id")

// TODO: NEED TO FIGURE OUT HOW TO PATCH THE CARD RIGHT AFTER POST TO PASS URL
export default class CardModal extends Component {


    state = {
        attacks: [],
        resistances: [],
        weaknesses: [],
        selectedDeck: "",
        ability: this.props.selectedCard.ability,
        selectedCard: this.props.selectedCard,
        dbCards: [],
    }

    componentDidMount() {
        this.setState({
            attacks: this.props.selectedCard.attacks
        })
    }


    addCard = () => {
        let userName = localStorage.getItem("username")
        console.log(userName)

        if (this.state.selectedDeck === "---------------------" || this.state.selectedDeck === "") {
            alert("Please select a deck")
        } else {

            this.props.users.forEach(user => {
                if (user.username === userName) {
                    const newCard = {
                        cardId: this.props.selectedCard.id,
                        imageUrl: this.props.selectedCard.imageUrl,
                        imageUrlHiRes: this.props.selectedCard.imageUrlHiRes,
                        name: this.props.selectedCard.name,
                        rarity: this.props.selectedCard.rarity,
                        user: user.url
                    }





                    this.props.createNewCard("cards", newCard)
                        .then(data => {
                            console.log(data)
                            let newBornCard = data
                            let token = localStorage.getItem("token")



                            const newCardToDeck = {
                                cardId: newBornCard.cardId,
                                card: newBornCard.url,
                                deck: this.state.selectedDeck,
                            }
                            console.log(newCardToDeck)

                            this.props.createNewCard("deckcardsrelationship", newCardToDeck)
                                .then(data => {
                                    console.log("data getting back after postig to relationship: ", data)
                                })

                        })

                }

            })
        }
    }


    selectDeck = (event) => {
        console.log("SELECTED DECK", event.target.value)
        this.setState({ selectedDeck: event.target.value });
    }


    consoleLog = () => {

        // console.log("SELECTED CARD: ", this.props.selectedCard)
        // console.log("SELECTED CARD STATE: ", this.state.selectedCard)
        console.log("CURRENT DECK: ", this.state.selectedDeck)
        // console.log("VALUE STATE", this.state.value)
        // console.log("CARDS modal layer", this.props.cards)
    }

    render() {

        // POKEMON CARDS
        let cardModalAttacksFieldContent = ""
        if (this.props.selectedCard.supertype === "Pokémon") {

            cardModalAttacksFieldContent = (
                <div className="cardModalAttacksField">
                    <h3 className="cardModalAttacksTitle">Attacks:</h3>
                    {
                        this.state.attacks.map(attack =>
                            <React.Fragment>
                                <p className="cardModalAttacks">{attack.name}</p>
                                <p className="cardModalAttacksEnergyCost">Energy Cost:&nbsp;{attack.convertedEnergyCost}&nbsp;{attack.cost}</p>
                                <p className="cardModalAttacksText">{attack.text}</p>
                            </React.Fragment>
                        )
                    }
                    {/* <select onChange={(event) => this.selectDeck(event)}> */}
                    <select onChange={this.selectDeck} value={this.state.value}>
                        <option>---------------------</option>
                        {
                            this.props.userDecks.map(deck =>
                                <option woop={deck.date_added} name={deck.name} value={deck.url}>{deck.name}</option>
                            )
                        }
                    </select>
                    <button onClick={() => this.addCard("cards")}>add to deck</button>
                </div>
            )
        } else {
            cardModalAttacksFieldContent = null
        }


        // TRAINER CARDS
        let cardModalTrainerContent = ""

        // NOT IN USE/ THIS IS IN CASE SOME CARDS DONT HAVE A TEXT PROPERTY
        // YOU PUT THIS INSIDE THE cardModalTrainerContent
        // let effectField = ""
        // if (this.props.selectedCard.text) {
        //     effectField = (
        //         <React.Fragment>
        //         <p className="cardModalContentTitle">Effect: </p>
        //         <p className="cardModalText">{this.props.selectedCard.text}</p>
        //         </React.Fragment>
        //     )
        // }


        if (this.props.selectedCard.supertype === "Trainer") {
            cardModalTrainerContent = (
                <div className="cardModalTrainerField">
                    <p className="cardModalContentTitle">Effect: </p>
                    <p className="cardModalText">{this.props.selectedCard.text}</p>
                    <p className="cardModalContentTitle">Series: </p>
                    <p className="cardModalText">{this.props.selectedCard.series}</p>
                    <p className="cardModalContentTitle">Set: </p>
                    <p className="cardModalText">{this.props.selectedCard.set}</p>
                    <p className="cardModalContentTitle">Rarity:&nbsp;{this.props.selectedCard.rarity}</p>

                    <select onChange={this.selectDeck} value={this.state.value}>
                        <option>---------------------</option>
                        {
                            this.props.userDecks.map(deck =>
                                <option woop={deck.date_added} name={deck.name} value={deck.url}>{deck.name}</option>
                            )
                        }
                    </select>

                    <button onClick={() => this.addCard("cards")}>add to deck</button>
                </div>
            )
        } else {
            cardModalTrainerContent = null
        }


        // SPECIAL ENERGY CARDS
        let cardModalSpecialEnergyContent = ""
        if (this.props.selectedCard.supertype === "Energy" && this.props.selectedCard.subtype === "Special") {
            cardModalSpecialEnergyContent = (
                <div className="cardModalEnergyField">
                    <p className="cardModalContentTitle">Effect: </p>
                    <p className="cardModalText">{this.props.selectedCard.text}</p>
                    <p className="cardModalContentTitle">Series: </p>
                    <p className="cardModalText">{this.props.selectedCard.series}</p>
                    <p className="cardModalContentTitle">Set: </p>
                    <p className="cardModalText">{this.props.selectedCard.set}</p>
                    <p className="cardModalContentTitle">Rarity:&nbsp;{this.props.selectedCard.rarity}</p>
                    <select onChange={this.selectDeck} value={this.state.value}>
                        <option>---------------------</option>
                        {
                            this.props.userDecks.map(deck =>
                                <option woop={deck.date_added} name={deck.name} value={deck.url}>{deck.name}</option>
                            )
                        }
                    </select>
                    <button onClick={() => this.addCard("cards")}>add to deck</button>
                </div>
            )
        } else {
            cardModalSpecialEnergyContent = null
        }

        // ENERGY CARDS
        let cardModalEnergyContent = ""
        if (this.props.selectedCard.supertype === "Energy" && this.props.selectedCard.subtype === "Basic") {
            cardModalEnergyContent = (
                <div className="cardModalEnergyField">
                    <p className="cardModalContentTitle">Series: </p>
                    <p className="cardModalText">{this.props.selectedCard.series}</p>
                    <p className="cardModalContentTitle">Set: </p>
                    <p className="cardModalText">{this.props.selectedCard.set}</p>
                    <p className="cardModalContentTitle">Rarity:&nbsp;{this.props.selectedCard.rarity}</p>
                    <select onChange={this.selectDeck} value={this.state.value}>
                        <option>---------------------</option>
                        {
                            this.props.userDecks.map(deck =>
                                <option woop={deck.date_added} name={deck.name} value={deck.url}>{deck.name}</option>
                            )
                        }
                    </select>
                    <button onClick={() => this.addCard("cards")}>add to deck</button>
                </div>
            )
        } else {
            cardModalEnergyContent = null
        }


        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.closeViewCard}></div>
                <div className="modal-content cardModal">
                    <h1 className="cardModalName">{this.props.selectedCard.name}</h1>
                    <div className="cardModalContentField">
                        {/* <button onClick={this.consoleLog}>console log</button> */}
                        <img className="cardModalImage" src={this.props.selectedCard.imageUrlHiRes}></img>
                        {cardModalAttacksFieldContent}
                        {cardModalTrainerContent}
                        {cardModalSpecialEnergyContent}
                        {cardModalEnergyContent}
                    </div>
                </div>
                <button onClick={this.props.closeViewCard} className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}