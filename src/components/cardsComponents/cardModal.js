import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './searchComponent.css'
import APIManager from '../managerComponents/APIManager';

let userId = sessionStorage.getItem("id")


export default class CardModal extends Component {


    state = {
        attacks: [],
        resistances: [],
        weaknesses: [],
        selectedDeck: {},
        ability: this.props.selectedCard.ability,
        selectedCard: this.props.selectedCard,
        dbCards: []
    }

    componentDidMount() {
        this.setState({
            attacks: this.props.selectedCard.attacks
        })
    }

    consoleLog = () => {
        // console.log(this.state.attacks)
        console.log(this.props.selectedCard)
        // console.log(this.props.selectedCard.ability.name)
        // console.log(this.props.selectedCard.attacks[0])
        // console.log(this.props.selectedCard.attacks[1])
        // console.log(this.state.ability.name)
        console.log(sessionStorage.getItem("url"))

        // console.log(this.props.selectedCard.weaknesses[0])

    }

    addCard = (resource1, resource2) => {
        let userId = sessionStorage.getItem("id")
        let userUrl = sessionStorage.getItem("url")

       if(this.props.selectedCard.attacks[1]){

        let newObj = {
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: this.props.selectedCard.attacks[1].name,
            attack2_text: this.props.selectedCard.attacks[1].text,
            attack2_damage: this.props.selectedCard.attacks[1].damage,
            attack2_convertedEnergyCost: this.props.selectedCard.attacks[1].convertedEnergyCost,
            // resistancesType: this.props.selectedCard.resistances[0].type,
            // resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }

        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)

       }

       else if (this.props.selectedCard.attacks[1] && this.props.selectedCard.ability) {
        let newObj = {
            ability_name: this.state.ability.name,
            ability_text: this.state.ability.text,
            ability_type: this.state.ability.type,
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: this.props.selectedCard.attacks[1].name,
            attack2_text: this.props.selectedCard.attacks[1].text,
            attack2_damage: this.props.selectedCard.attacks[1].damage,
            attack2_convertedEnergyCost: this.props.selectedCard.attacks[1].convertedEnergyCost,
            resistancesType: this.props.selectedCard.resistances[0].type,
            resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }

        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)
       }

       else if (this.props.selectedCard.attacks[0] && this.props.selectedCard.ability) {
        let newObj = {
            ability_name: this.state.ability.name,
            ability_text: this.state.ability.text,
            ability_type: this.state.ability.type,
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: this.props.selectedCard.attacks[1].name,
            attack2_text: this.props.selectedCard.attacks[1].text,
            attack2_damage: this.props.selectedCard.attacks[1].damage,
            attack2_convertedEnergyCost: this.props.selectedCard.attacks[1].convertedEnergyCost,
            resistancesType: this.props.selectedCard.resistances[0].type,
            resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }

        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)
       }

       else if (this.props.selectedCard.attacks[0] && this.props.selectedCard.resistances) {
        let newObj = {
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: undefined,
            attack2_text: undefined,
            attack2_damage: undefined,
            attack2_convertedEnergyCost: undefined,
            resistancesType: this.props.selectedCard.resistances[0].type,
            resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }


        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)
    }

    else if (this.props.selectedCard.attacks[1] && this.props.selectedCard.resistances) {
        let newObj = {
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: undefined,
            attack2_text: undefined,
            attack2_damage: undefined,
            attack2_convertedEnergyCost: undefined,
            resistancesType: this.props.selectedCard.resistances[0].type,
            resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }


        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)
    }

    else {
        let newObj = {
            attack1: this.props.selectedCard.attacks[0].name,
            attack1_text: this.props.selectedCard.attacks[0].text,
            attack1_damage: this.props.selectedCard.attacks[0].damage,
            attack1_convertedEnergyCost: this.props.selectedCard.attacks[0].convertedEnergyCost,
            attack2: undefined,
            attack2_text: undefined,
            attack2_damage: undefined,
            attack2_convertedEnergyCost: undefined,
            // resistancesType: this.props.selectedCard.resistances[0].type,
            // resistancesValue: this.props.selectedCard.resistances[0].value,
            retreatCost1: this.props.selectedCard.retreatCost[0],
            retreatCost2: this.props.selectedCard.retreatCost[1],
            retreatCost3: this.props.selectedCard.retreatCost[2],
            retreatCost4: this.props.selectedCard.retreatCost[3],
            retreatCost5: this.props.selectedCard.retreatCost[4],
            weaknessName: this.props.selectedCard.weaknesses[0].type,
            weaknessValue: this.props.selectedCard.weaknesses[0].value,
            type1: this.props.selectedCard.types[0],
            type2: this.props.selectedCard.types[1],
            user: userUrl
        }


        this.props.createNew(resource1, this.props.selectedCard)
        // this.props.createNew(resource2, newCardDeckObj)
        // this.props.getSingle("cards", )
        // YOU WANT TO THEN DO A PATCH TO ADD THE USER URL
        this.props.editThis(resource1, newObj, 9)
    }
}

    selectDeck = (deck) => {
        this.setState({
            selectedDeck: deck
        })
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
                                <p key={attack.id} className="cardModalAttacks">{attack.name}</p>
                                <p className="cardModalAttacksEnergyCost">Energy Cost:&nbsp;{attack.convertedEnergyCost}&nbsp;{attack.cost}</p>
                                <p className="cardModalAttacksText">{attack.text}</p>
                            </React.Fragment>
                        )
                    }
                    <select>
                        {
                            this.props.decks.map(deck =>
                                <option onClick={() => this.selectDeck(deck)} value={deck.id}>{deck.name}</option>
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
                    <select>
                        {
                            this.props.decks.map(deck =>
                                <option value={deck.id}>{deck.name}</option>
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
                    <select>
                        {
                            this.props.decks.map(deck =>
                                <option value={deck.id}>{deck.name}</option>
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
                    <select>
                        {
                            this.props.decks.map(deck =>
                                <option value={deck.id}>{deck.name}</option>
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
                        <img className="cardModalImage" src={this.props.selectedCard.imageUrlHiRes}></img>
                        <button onClick={this.consoleLog}>console log</button>
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