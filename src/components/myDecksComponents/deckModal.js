import React, { Component } from 'react'
import './viewDeck.css'
import EditName from './editNameForm'
import APIManager from '../managerComponents/APIManager';



export default class DeckModal extends Component {

    state = {
        selectedDeck: {},
        currentDeck: {},
        selectedCardOnDeck: {},
        editName: false,
        editDescription: false,
        editStrategy: false,
        editNameForm: false,
        editDescriptionForm: false,
        editStrategyForm: false,
    }

    // onMouseOut={this.outOfCard}

    componentDidMount() {
        console.log("%%% DECK MODAL MOUNT %%%")
        let token = localStorage.getItem("token")
        APIManager.getSingle("decks", this.props.selectedDeck.id, token)
        .then( deck => {
            this.setState({
                currentDeck: deck,
                selectedDeck: this.props.selectedDeck,
                selectedCardOnDeck: {}
            })
        })

    }

    componentDidUpdate(prevProps) {
        if (this.props.cardsOfDeck !== prevProps.cardsOfDeck) {
            console.log("MODAL UPDATING")
            if (this.props.cardsOfDeck.length < 1) {
                this.setState({
                    selectedCardOnDeck: []
                })
            }

            else {
                console.log("CARDS OF DECK REMAIN THE SAME")
                this.setState({

                    selectedCardOnDeck: this.props.cardsOfDeck[0].card,
                })
            }
        }
    }

    closeEditForm = () => {
        this.setState({
            editNameForm: false
        })
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
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

    showEditNameIcon = () => {
        this.setState({
            editName: true
        })
    }

    hideEditNameIcon = () => {
        this.setState({
            editName: false
        })
    }

    showEditDescriptionIcon = () => {
        this.setState({
            editDescription: true
        })
    }

    hideEditDescriptionIcon = () => {
        this.setState({
            editDescription: false
        })
    }

    showEditStrategyIcon = () => {
        this.setState({
            editStrategy: true
        })
    }

    hideEditStrategyIcon = () => {
        this.setState({
            editStrategy: false
        })
    }

    showEditNameForm = () => {
        this.setState({
            editNameForm: true
        })
    }



    consoleLog = () => {
        console.log("USER CARDS", this.props.userCards)
        // console.log("EMPTY DECK STATE", this.props.emptyDeck)
        console.log("SELECTED DECK", this.props.selectedDeck)
        console.log("cards of deck props", this.props.cardsOfDeck)
        // console.log("CARDS PROPS", this.props.cards)
        // console.log("selected card on deck", this.state.selectedCardOnDeck)
        console.log("EDIT NAME STATE", this.state.editName)
        console.log("EDIT DESCRIPTION STATE", this.state.editDescription)
        console.log("EDIT STRATEGY STATE", this.state.editStrategy)
        console.log("CURRENT DECK", this.state.currentDeck)
        console.log("NEW NAME", this.props.newName)
    }

    // TODO ADD A TERNARY IN JSX SO IT SEPARATES THE CARDS AND RENDERS DIFFERENT DIVS FOR EACH SUPERTYPE OF CARD

    render() {


        let deckContent = ""

        if (this.props.cardsOfDeck.length >= 1 && this.props.emptyDeck === false) {
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
        } else if (this.props.emptyDeck) {
            deckContent = (
                <div>
                    <h6 className="emptyDeck">There are no cards in this deck.</h6>
                </div>
            )
        }

        let editDeckName = ""

        if(this.state.editName) {
            editDeckName = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckName = (
                <i className=""></i>
            )
        }

        let editDeckDescription = ""

        if(this.state.editDescription) {
            editDeckDescription = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckDescription = (
                <i className=""></i>
            )
        }

        let editDeckStrategy = ""

        if(this.state.editStrategy) {
            editDeckStrategy = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckStrategy = (
                <i className=""></i>
            )
        }

        let deckName = ""
        if(this.state.editNameForm) {
            deckName = (
                <EditName selectedDeck={this.props.selectedDeck}
                showWarningModal={this.props.showWarningModal}
                closeWarningModal={this.props.closeWarningModal}
                warningModalProceed={this.props.warningModalProceed}
                continueEditing={this.continueEditing}
                closeEditForm={this.closeEditForm}/>
            )
        } else {
            deckName = (
                <h1 onMouseEnter={this.showEditNameIcon} onMouseLeave={this.hideEditNameIcon} className="deckModalName" onClick={this.consoleLog}>{this.state.currentDeck.name}<span className="icon" onClick={this.showEditNameForm}>{editDeckName}</span></h1>
            )
        }


        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.props.closeViewDeck}></div>
                    <div className="modal-content deckModal">
                        <button onClick={this.consoleLog}>console Log modal</button>
                        {deckName}
                        {/* <h1 onMouseEnter={this.showEditNameIcon} onMouseLeave={this.hideEditNameIcon} className="deckModalName" onClick={this.consoleLog}>{this.state.selectedDeck.name}<span className="icon">{editDeckName}</span></h1> */}
                        <p className="descriptionText" onMouseEnter={this.showEditDescriptionIcon} onMouseLeave={this.hideEditDescriptionIcon} onClick={this.consoleLog}>{this.state.selectedDeck.description}<span className="icon">{editDeckDescription}</span></p>
                        <br></br>
                        <p className="strategyText" onMouseEnter={this.showEditStrategyIcon} onMouseLeave={this.hideEditStrategyIcon} onClick={this.consoleLog}>{this.state.selectedDeck.strategy} <span className="icon">{editDeckStrategy}</span></p>
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