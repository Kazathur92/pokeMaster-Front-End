import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY, rollIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import APIManager from '../managerComponents/APIManager';
import 'bulma/css/bulma.css'
import './searchComponent.css'

let userId = sessionStorage.getItem("id")



export default class CardModal extends Component {

    state = {
        attacks: [],
        resistances: [],
        weaknesses: [],
        selectedDeck: "",
        ability: this.props.selectedCard.ability,
        selectedCard: this.props.selectedCard,
        dbCards: [],
        deckInQuestion: {},
        selectedDeckId: ""
    }

    componentDidMount() {
        if (this.state.selectedCard.attacks) {
            this.setState({
                attacks: this.props.selectedCard.attacks
            })
        }

        else {
            this.setState({
                attacks: []
            })
        }
    }


    addCard = () => {
        let userName = localStorage.getItem("username")
        let token = localStorage.getItem("token")
        console.log("DECK ID", this.state.selectedDeckId)

        let cardsOfThisDeck = []

        if (this.state.selectedDeck === "---------------------" || this.state.selectedDeck === "") {
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
                        const newCard = {
                            cardId: this.props.selectedCard.id,
                            imageUrl: this.props.selectedCard.imageUrl,
                            imageUrlHiRes: this.props.selectedCard.imageUrlHiRes,
                            name: this.props.selectedCard.name,
                            rarity: this.props.selectedCard.rarity,
                            user: this.props.users.url
                        }

                        this.props.createNewCard("cards", newCard)
                            .then(data => {
                                console.log(data)
                                let newBornCard = data


                                const newCardToDeck = {
                                    cardId: newBornCard.cardId,
                                    card: newBornCard.url,
                                    deck: this.state.selectedDeck,
                                }
                                console.log(newCardToDeck)

                                this.props.createNewCard("deckcardsrelationship", newCardToDeck)
                                    .then(data => {
                                        alert("This card has now been added to your Deck.")
                                        this.props.getAll2("cards")
                                        console.log("data getting back after postig to relationship: ", data)
                                    })
                            })
                    }
                })
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


    consoleLog = () => {
        // console.log("USER", this.props.users)
        // console.log("CARDS IN THIS DECK", this.state.cardsOfThisDeck)
        // console.log("SELECTED CARD: ", this.props.selectedCard.attacks)
        // console.log("SELECTED CARD STATE: ", this.state.selectedCard)
        // console.log("CURRENT DECK: ", this.state.selectedDeck)
        // console.log("VALUE STATE", this.state.value)
        // console.log("CARDS modal layer", this.props.cards)
        // console.log("CURRENT DECK ID", this.state.selectedDeckId)
        // console.log("SEELCTED DECK".this.state.selectedDeck)
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
                            <React.Fragment >
                                <p className="cardModalAttacks">{attack.name}</p>
                                <p className="cardModalAttacksEnergyCost">Energy Cost:&nbsp;{attack.convertedEnergyCost}&nbsp;{attack.cost}</p>
                                <p className="cardModalAttacksText">{attack.text}</p>
                            </React.Fragment>
                        )
                    }

                </div>
            )
        } else {
            cardModalAttacksFieldContent = null
        }


        // TRAINER CARDS
        let cardModalTrainerContent = ""

        if (this.props.selectedCard.supertype === "Trainer") {
            cardModalTrainerContent = (
                <div className="cardModalTrainerField">
                    <p className="cardModalContentTitle">Effect: </p>
                    {this.state.selectedCard.attacks ?
                        this.state.selectedCard.attacks.length >= 1 ? <p className="cardModalText">{this.state.selectedCard.attacks[0].text}</p> :
                            <p className="cardModalText">{this.props.selectedCard.text}</p> : <p></p>
                    }
                    <p className="cardModalText">{this.props.selectedCard.text}</p>
                    <p className="cardModalContentTitle">Series: </p>
                    <p className="cardModalText">{this.props.selectedCard.series}</p>
                    <p className="cardModalContentTitle">Set: </p>
                    <p className="cardModalText">{this.props.selectedCard.set}</p>
                    <p className="cardModalContentTitle">Rarity:&nbsp;{this.props.selectedCard.rarity}</p>

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

                </div>
            )
        } else {
            cardModalEnergyContent = null
        }


        return (
            <div className="modal is-active theWholeModal">
                <div className="modal-background modalBackground" onClick={this.props.closeViewCard}></div>
                <div className="modal-content cardModal">
                    <h1 className="cardModalName">{this.props.selectedCard.name}</h1>
                    <div className="cardModalContentField">
                        {/* <button onClick={this.consoleLog}>console log</button> */}
                        <img className="cardModalImage" src={this.props.selectedCard.imageUrlHiRes}></img>
                        <div className="pokemonActions">
                            {this.state.selectedCard.ability ? this.state.selectedCard.ability.length = 1 ?
                                <div>
                                    <p className="abilityTitle">Ability: </p>
                                    <p className="abilityType">{this.state.selectedCard.ability.type}</p>
                                    <p className="abilityName">{this.state.selectedCard.ability.name}</p>
                                    <p className="abilityText">{this.state.selectedCard.ability.text}</p>

                                </div>
                                :
                                <p>This pokemon has no ability</p>
                                :
                                <p></p>
                            }

                            {this.state.selectedCard.ability ? this.state.selectedCard.ability.length > 1 ?
                                <div>
                                    <p className="abilityTitle">Abilities: </p>
                                    <p>{this.state.selectedCard.ability[0].type}</p>
                                    <p>{this.state.selectedCard.ability[0].name}</p>
                                    <p>{this.state.selectedCard.ability[0].text}</p>
                                    <p>{this.state.selectedCard.ability[1].type}</p>
                                    <p>{this.state.selectedCard.ability[1].name}</p>
                                    <p>{this.state.selectedCard.ability[1].text}</p>

                                </div>
                                :
                                <p></p>
                                :
                                <p></p>
                            }

                            {this.state.selectedCard.attacks ? cardModalAttacksFieldContent : <p></p>}
                            {cardModalTrainerContent}
                            {cardModalSpecialEnergyContent}
                            {cardModalEnergyContent}

                            <select onChange={this.selectDeck} value={this.state.value}>
                                <option>---------------------</option>
                                {
                                    this.props.decks.map(deck =>
                                        <option woop={deck.date_added} name={deck.name} id={deck.id} value={deck.url}>{deck.name}</option>
                                    )
                                }
                            </select>
                            <button onClick={() => this.addCard("cards")}>add to deck</button>
                        </div>
                    </div>
                </div>
                <button onClick={this.props.closeViewCard} className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}