import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY, rollIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import APIManager from '../managerComponents/APIManager';
import EditName from './editNameForm'
import EditDescription from './editDescriptionForm'
import EditStrategy from './editStrategyForm'
import EditTypes from './editTypes'
import './viewDeck.css'


// ========================ANIMATIONS========================

const flipInAnimation = {
    flipInX: {
      animation: "1s",
      animationName: Radium.keyframes(flipInX, "flipInX")
    }
  }

const flipInYAnimation = {
    flipInY: {
      animation: "3s",
      animationName: Radium.keyframes(flipInY, "flipInY")
    }
  }

  const rollInAnimation = {
    rollIn: {
    animation: "1s",
    animationName: Radium.keyframes(rollIn, "rollIn")
  }
}


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
        editEnergyType1Icon: false,
        editEnergyType2Icon: false,
        editTypesForm: false,
        type1: "",
        type2: ""
    }

    componentDidMount() {
        console.log("%%% DECK MODAL MOUNT %%%")
        console.log("CARDS OF DECK", this.props.cardsOfDeck)
        let token = localStorage.getItem("token")
        if (this.props.cardsOfDeck.length >= 1) {
            console.log("MORE THAN I CARD IN CARDS OF DECK")
            APIManager.getSingle("decks", this.props.selectedDeck.id, token)
                .then(deck => {
                    this.setState({
                        currentDeck: deck,
                        selectedDeck: this.props.selectedDeck,
                        selectedCardOnDeck: this.props.cardsOfDeck[0].card
                    })
                })
        }
        else {
            console.log("ANYTHING ELSE")
            APIManager.getSingle("decks", this.props.selectedDeck.id, token)
                .then(deck => {
                    this.setState({
                        currentDeck: deck,
                        selectedDeck: this.props.selectedDeck,
                        selectedCardOnDeck: {}
                    })
                })
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.cardsOfDeck !== prevProps.cardsOfDeck) {
            console.log("MODAL UPDATING")
            if (this.props.cardsOfDeck.length >= 1) {
                console.log("NOTHING HERE")
                this.setState({
                    selectedCardOnDeck: this.props.cardsOfDeck[0].card,
                })
            }

            else {
                console.log("CARDS OF DECK REMAIN THE SAME")
                this.setState({

                    selectedCardOnDeck: ""
                })
            }
        }
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
        new Promise((resolve, reject) => {
            this.setState({
                cardsOfDeck: ""
            })
            resolve()
        })
            .then(() => {
                this.props.deleteRelationship(`deckcardsrelationship/${deck_id}?card=${card_id}`)
            })
    }


    removeFromCollection = () => {
        let deck_id = parseInt(this.props.selectedDeck.id)
        let card_id = this.state.selectedCardOnDeck.id
        new Promise((resolve, reject) => {
            this.setState({
                selectedCardOnDeck: ""
            })
            resolve()
        })
            .then(() => {
                console.log("ITS WAITING TO DELETE")
                this.props.deleteRelationshipToGetId(`findRelationship/${deck_id}?card=${card_id}`)
            })
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
            editNameForm: true,
            editDescriptionForm: false,
            editStrategyForm: false,
            editTypesForm: false,
        })
    }

    showEditDescriptionForm = () => {
        this.setState({
            editNameForm: false,
            editDescriptionForm: true,
            editStrategyForm: false,
            editTypesForm: false,
        })
        console.log("description state", this.state.editDescriptionForm)
    }

    showEditStrategyForm = () => {
        this.setState({
            editNameForm: false,
            editDescriptionForm: false,
            editStrategyForm: true,
            editTypesForm: false,
        })
    }

    showEditTypesForm = (type1, type2) => {
        this.setState({
            editTypesForm: true,
            editNameForm: false,
            editDescriptionForm: false,
            editStrategyForm: false,
            type1: type1,
            type2: type2
        })
    }

    closeEditNameForm = () => {
        this.setState({
            editNameForm: false,
            editName: false,
            editDescription: false,
            editStrategy: false,
            editEnergyType1Icon: false
        })
    }

    closeEditDescriptionForm = () => {
        this.setState({
            editDescriptionForm: false,
            editName: false,
            editDescription: false,
            editStrategy: false,
            editEnergyType1Icon: false
        })
    }

    closeEditTypesForm = () => {
        this.setState({
            editTypesForm: false,
            editName: false,
            editDescription: false,
            editStrategy: false,
            editEnergyType1Icon: false
        })
    }

    closeEditStrategyForm = () => {
        this.setState({
            editStrategyForm: false,
            editName: false,
            editDescription: false,
            editStrategy: false,
            editEnergyType1Icon: false
        })
    }

    showEditEnergyType1Icon = () => {
        this.setState({
            editEnergyType1Icon: true
        })
    }

    hideEditEnergyType1Icon = () => {
        this.setState({
            editEnergyType1Icon: false
        })
    }

    showEditEnergyType2Icon = () => {
        this.setState({
            editEnergyType2Icon: true
        })
    }

    hideEditEnergyType2Icon = () => {
        this.setState({
            editEnergyType2Icon: false
        })
    }






    consoleLog = () => {
        // console.log("SELECTED CARD ON DECK", this.state.selectedCardOnDeck)
        // console.log("USER CARDS", this.props.userCards)
        console.log("NEW DESCRIPTION", this.state.newDdescription)
        // console.log("EMPTY DECK STATE", this.props.emptyDeck)
        // console.log("SELECTED DECK", this.props.selectedDeck)
        // console.log("cards of deck props", this.props.cardsOfDeck)
        // console.log("CARDS PROPS", this.props.cards)
        // console.log("selected card on deck", this.state.selectedCardOnDeck)
        // console.log("EDIT NAME STATE", this.state.editName)
        // console.log("EDIT DESCRIPTION STATE", this.state.editDescription)
        // console.log("EDIT STRATEGY STATE", this.state.editStrategy)
        // console.log("CURRENT DECK", this.state.currentDeck)
        // console.log("NEW NAME", this.props.newName)
    }

    render() {

        let interactionButtons = ""

        if (this.props.cardsOfDeck.length >= 1 && this.props.emptyDeck === false) {
            interactionButtons = (
                <React.Fragment>
                    <button className="deleteFromDeckButton" onClick={this.removeFromDeck}>Remove from Deck</button><button className="deleteFromCollectionButton" onClick={() => this.removeFromCollection(this.state.selectedCardOnDeck.id)}>Remove from Collection</button>
                </React.Fragment>
            )
        }
        else {
            interactionButtons = null
        }


        let deckContent = ""

        if (this.props.cardsOfDeck.length >= 1 && this.props.emptyDeck === false) {
            deckContent = (
                <React.Fragment>
                    {
                        this.props.cardsOfDeck.map(card =>

                            <StyleRoot>
                            <div className="allCardsInDeck">
                                <div className="deckModalContentField">
                                    <img style={rollInAnimation.rollIn} onMouseEnter={() => this.pickCard(card)} onClick={() => this.clickOnCard(this.state.selectedCardOnDeck)} src={card.card.imageUrl} className="deckCard"></img>

                                </div>
                                <div>
                                    <p className="deckModalText">{card.card.name}</p>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                            </StyleRoot>



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

        if (this.state.editName) {
            editDeckName = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckName = (
                <i className=""></i>
            )
        }

        let editDeckDescription = ""

        if (this.state.editDescription) {
            editDeckDescription = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckDescription = (
                <i className=""></i>
            )
        }

        let editDeckStrategy = ""

        if (this.state.editStrategy) {
            editDeckStrategy = (

                <i className="fas fa-edit editIcon"></i>

            )
        } else {
            editDeckStrategy = (
                <i className=""></i>
            )
        }

        let deckName = ""
        if (this.state.editNameForm) {
            deckName = (
                <EditName selectedDeck={this.props.selectedDeck}
                    showWarningModal={this.props.showWarningModal}
                    closeWarningModal={this.props.closeWarningModal}
                    warningModalProceed={this.props.warningModalProceed}
                    continueEditing={this.continueEditing}
                    closeEditNameForm={this.closeEditNameForm}
                />
            )
        } else {
            deckName = (
                <h1 onMouseEnter={this.showEditNameIcon} onMouseLeave={this.hideEditNameIcon} className="deckModalName" onClick={this.consoleLog}>{this.state.currentDeck.name}<span className="icon" onClick={this.showEditNameForm}>{editDeckName}</span></h1>
            )
        }

        let deckDescription = ""
        if (this.state.editDescriptionForm) {
            deckDescription = (
                <EditDescription selectedDeck={this.props.selectedDeck}
                    showWarningModal={this.props.showWarningModal}
                    closeWarningModal={this.props.closeWarningModal}
                    warningModalProceed={this.props.warningModalProceed}
                    continueEditing={this.continueEditing}
                    closeEditForm={this.closeEditForm}
                    closeEditDescriptionForm={this.closeEditDescriptionForm}
                    showWarningModalDescriptionForm={this.props.showWarningModalDescriptionForm}

                />
            )
        } else {
            deckDescription = (
                <p className="descriptionText" onMouseEnter={this.showEditDescriptionIcon} onMouseLeave={this.hideEditDescriptionIcon} onClick={this.consoleLog}>{this.state.currentDeck.description}<span className="icon" onClick={this.showEditDescriptionForm}>{editDeckDescription}</span></p>
            )
        }

        let deckStrategy = ""
        if (this.state.editStrategyForm) {
            deckStrategy = (
                <EditStrategy selectedDeck={this.props.selectedDeck}
                    showWarningModal={this.props.showWarningModal}
                    closeWarningModal={this.props.closeWarningModal}
                    warningModalProceed={this.props.warningModalProceed}
                    continueEditing={this.continueEditing}
                    closeEditForm={this.closeEditForm}
                    closeEditDescriptionForm={this.closeEditDescriptionForm}
                    showWarningModalStrategyForm={this.props.showWarningModalStrategyForm}
                    closeEditStrategyForm={this.closeEditStrategyForm}
                />
            )
        } else {
            deckStrategy = (
                <p className="descriptionText" onMouseEnter={this.showEditStrategyIcon} onMouseLeave={this.hideEditStrategyIcon} onClick={this.consoleLog}>{this.state.currentDeck.strategy}<span className="icon" onClick={this.showEditStrategyForm}>{editDeckStrategy}</span></p>
            )
        }

        let editEnergyType1Icon = ""

        if (this.state.editEnergyType1Icon) {
            editEnergyType1Icon = (
                <i onClick={() => this.showEditTypesForm(this.props.selectedDeck.energyType1, this.props.selectedDeck.energyType2)} className="fas fa-edit editIconEnergies"></i>
            )
        } else {
            editEnergyType1Icon = null
        }

        let editTypes = ""

        if (this.state.editTypesForm) {
            editTypes = (
                <EditTypes
                    showWarningModalTypesForm={this.props.showWarningModalTypesForm}
                    selectedDeck={this.props.selectedDeck}
                    closeEditTypesForm={this.closeEditTypesForm} />
            )
        } else {
            editTypes = null
        }

        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.props.closeViewDeck}></div>
                    <div className="modal-content deckModal">
                        {/* <button onClick={this.consoleLog}>console Log modal</button> */}
                        <div className="deckInfoDiv">
                        {deckName}
                        {deckDescription}
                        {deckStrategy}
                        <div className="primaryEnergiesDiv" onMouseEnter={this.showEditEnergyType1Icon} onMouseLeave={this.hideEditEnergyType1Icon}>
                            <p className="energiesTitles">Primary Energies:</p>&nbsp;&nbsp;
                            <p className="energyType1">{this.state.currentDeck.energyType1}</p>
                            <p onMouseEnter={this.hidEditEnergyType2Icon} className="energyType2">{this.state.currentDeck.energyType2}</p>
                            <span className="energyType1Span">
                                {editEnergyType1Icon}
                            </span>
                        </div>
                        {editTypes}
                        </div>
                        <br></br>
                        { this.props.cardsOfDeck.length < 1 ? <p></p> : <button onClick={() => this.props.makeMvp(this.state.selectedCardOnDeck, this.props.selectedDeck)} className="makeMvp">Make MVP</button>}
                        <StyleRoot>
                        <img className="lookAtCard" style={flipInYAnimation.flipInY} src={this.state.selectedCardOnDeck.imageUrlHiRes}></img>
                        </StyleRoot>
                        {interactionButtons}
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