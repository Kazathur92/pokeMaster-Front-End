import React, { Component } from 'react'
import './viewDeck.css'
import APIManager from '../managerComponents/APIManager';



export default class DeckModal extends Component {

    state = {
        selectedDeck: {},
        selectedCardOnDeck: {},
        woop: true
    }

    // onMouseOut={this.outOfCard}

    componentDidMount() {
        console.log("%%% DECK MODAL MOUNT %%%")

        this.setState({
            selectedDeck: this.props.selectedDeck,
            selectedCardOnDeck: {}
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardsOfDeck !== prevProps.cardsOfDeck) {
            console.log("MODAL UPDATING")
            if(this.props.cardsOfDeck.length < 1){
                this.setState({
                    selectedCardOnDeck: []
                })
            }

            else {
            this.setState({
                selectedCardOnDeck: this.props.cardsOfDeck[0].card,
            })
        }
        }
    }


    pickCard = (card) => {
        this.setState({
            selectedCardOnDeck: card.card
        })

    }

    clickOnCard = (card) => {
        console.log(this.state.selectedCardOnDeck)
    }

    outOfCard = () => {
        this.setState({
            selectedCardOnDeck: {}
        })
    }

    removeFromDeck = () => {



                let deck_id = parseInt(this.props.selectedDeck.id)
                let card_id = this.state.selectedCardOnDeck.id
            this.props.deleteRelationship(`deckcardsrelationship/${deck_id}?card=${card_id}`)

    }


    removeFromCollection = () => {

    }

    consoleLog = () => {
        // console.log("USER CARDS", this.props.userCards)
        console.log("SELECTED DECK", this.props.selectedDeck)
        console.log("cards of deck state modal: ", this.state.cardsOfDeck)
        console.log("cards of deck props", this.props.cardsOfDeck)
        console.log("CARDS PROPS", this.props.cards)
        console.log("selected card on deck", this.state.selectedCardOnDeck)
    }

    // TODO ADD A TERNARY IN JSX SO IT SEPARATES THE CARDS AND RENDERS DIFFERENT DIVS FOR EACH SUPERTYPE OF CARD

    render() {


        let deckContent = ""

        if (this.props.cardsOfDeck.length >= 1) {
            deckContent = (
                <React.Fragment>
                    {
                        this.props.cardsOfDeck.map(card =>

                            <div className="allCardsInDeck">
                                <div className="deckModalContentField">
                                    <img onMouseEnter={() => this.pickCard(card)} onClick={() => this.clickOnCard(this.state.selectedCardOnDeck)} src={card.card.imageUrl} className="deckCard"></img>

                                </div>
                                <div>
                                    <p className="deckModalText">{card.card.name}</p>
                                    <p>&nbsp;</p>
                                    {/* <p className="deckModalContentTitle">Rarity:&nbsp;{card.card.rarity}</p> */}
                                </div>
                            </div>



                        )
                    }
                </React.Fragment>
            )
        } else {
            deckContent = (<h6 className="emptyDeck">There are no cards in this deck.</h6>)
        }

        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.props.closeViewDeck}></div>
                    <div className="modal-content deckModal">
                        <button onClick={this.consoleLog}>console Log modal</button>
                        <h1 className="deckModalName">{this.state.selectedDeck.name}</h1>
                        <p className="descriptionText">{this.state.selectedDeck.description}</p>
                        <p className="strategyText">{this.state.selectedDeck.strategy}</p>
                        {/* <div className="cardModalContentField"></div> */}
                        <img className="lookAtCard" src={this.state.selectedCardOnDeck.imageUrlHiRes}></img>
                        <button className="deleteFromDeckButton" onClick={this.removeFromDeck}>Remove from Deck</button><button className="deleteFromCollectionButton" onClick={this.removeFromCollection}>Remove from Collection</button>
                        <div className="wrap">
                            {deckContent}

                        </div>
                    </div>
                    <button onClick={this.props.closeViewDeck} className="modal-close is-large" aria-label="close"></button>
                </div>
            </React.Fragment >
        )
    }
}