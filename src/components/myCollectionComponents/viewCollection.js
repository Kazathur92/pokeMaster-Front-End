import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'
import './viewCollection.css'

export default class ViewMyCollection extends Component {

    state = {
        cards: [],
        woop: false
    }

    componentDidMount() {
        this.props.getAll2("cards")

    }

    componentDidUpdate = (prevProps) => {
        console.log("!@#!@#view collection updating")

    }



    consoleLog = () => {
        console.log("CARDS", this.props.cards)
        console.log("USER CARDS", this.props.userCards)
        console.log("trigger switch", this.props.triggerSwitch)
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.consoleLog}>console log collection</button>
                <h1 className="cardCollectionTitle">CARD COLLECTION</h1>
                <div className="collectionDiv">
                    <CollectionItem
                        cards={this.props.cards}
                        decks={this.props.decks}
                        deleteThis={this.props.deleteThis}
                        users={this.props.users}
                        createNewCard={this.props.createNewCard}
                        getAll2={this.props.getAll2}
                        triggerSwitch={this.props.triggerSwitch}
                        cardsOfDeck={this.props.cardsOfDeck}
                        triggetSwitch={this.props.triggerSwitch}
                        changeTriggerSwitch={this.props.changeTriggerSwitch}
                    />
                </div>
            </React.Fragment>
        )
    }
}