import React, { Component } from 'react'
import CollectionCardList from './collectionCardList'
import CardModal from './collectionCardModal'
import APIManager from '../managerComponents/APIManager';

export default class CollectionItem extends Component {

    state = {
        modal: false,
        selectedCard: {},
        deckOfThisCard: {},
        woopie: false,
        deckUrl: ""
    }

    deleteThisFromCollection = (deck_id) => {
        this.props.deleteThis("cards", deck_id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({
                woopie: true
            })
        }


    }

    showCardModal = (card) => {
        let token = localStorage.getItem("token")

        APIManager.getWithUrl(card.deck, token)
            .then(data => {
                this.setState({
                    modal: true,
                    selectedCard: card,
                    deckOfThisCard: data
                })
            })

    }

    updateCardsOfDeck = (card, deck) => {
        let token = localStorage.getItem("token")

        APIManager.getWithUrl(deck, token)
            .then(data => {
                this.setState({
                    modal: true,
                    selectedCard: card,
                    deckOfThisCard: data,
                    deckUrl: deck
                })
            })
    }


    closeModal = () => {
        new Promise((resolve, reject) => {
            this.setState({
                modal: false
            })
            resolve()
        })
            .then(() => {
                this.props.getAll2("cards")
            })
    }

    consoleLog = () => {
        console.log("DECK OF THIS CARD", this.state.deckOfThisCard)
    }

    render() {

        let cardItem = ""

        if (this.props.cards) {

            cardItem = <CollectionCardList userCards={this.props.userCards}
                cards={this.props.cards}
                deleteThis={this.props.deleteThis}
                deleteThisFromCollection={this.deleteThisFromCollection}
                showCardModal={this.showCardModal}
            />

        } else {
            cardItem = null
        }


        let cardModal = ""

        if (this.state.modal) {
            cardModal = (
                <CardModal
                    decks={this.props.decks}
                    selectedCard={this.state.selectedCard}
                    closeModal={this.closeModal}
                    deckOfThisCard={this.state.deckOfThisCard}
                    users={this.props.users}
                    createNewCard={this.props.createNewCard}
                    getAll2={this.props.getAll2}
                    cards={this.props.cards}
                    updateCardsOfDeck={this.updateCardsOfDeck}
                    cardsOfDeck={this.props.cardsOfDeck}
                    triggerSwitch={this.props.triggerSwitch}
                    changeTriggerSwitch={this.props.changeTriggerSwitch}
                    deckUrl={this.state.deckUrl} />
            )
        } else {
            cardModal = null
        }


        return (

            <React.Fragment>
                {/* <button onClick={this.consoleLog}>CONSOLE LOG</button> */}
                {cardModal}
                {cardItem}

            </React.Fragment>
        )
    }
}