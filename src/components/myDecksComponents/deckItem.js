import React, { Component } from 'react'
import DeckModal from './deckModal'
import APIManager from '../managerComponents/APIManager';
import './viewDeck.css'

export default class DeckItem extends Component {

    state = {
        selectedDeck: [],
        modal: false,
        warningModal: false,
        warningModalDescription: false,
        warningModalStrategy: false,
        inspectField: false,
        cardsOfDeck: [],
        emptyDeck: false,
        newName: "",
        newDescription: "",
        newStrategy: ""

    }

    componentDidMount() {
        console.log("!!! DECK ITEM MOUNT !!!")
    }

    componentDidUpdate(prevProps) {
        console.log("DECK ITEM UPDATING")
        if(this.props.woop !== prevProps.woop) {
            console.log("WOOP IS DIFFERENT")
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
                })
                APIManager.getSingle("decks", this.state.selectedDeck.id, token)
                .then( deck => {
                    this.setState({
                        selectedDeck: deck,
                    })
                })
        }
    }

    showWarningModal = (newName, deck) => {
        this.setState({
            warningModal: true,
            modal: false,
            newName: newName,
            selectedDeck: deck
        })
        console.log("warningModalState", this.state.warningModal)
    }

    showWarningModalFromDescriptionForm = (newDescription, deck) => {
        this.setState({
            warningModalDescription: true,
            modal: false,
            newDescription: newDescription,
            selectedDeck: deck
        })
        console.log("warningModalState", this.state.warningModal)

    }

    showWarningModalStrategyForm = (newStrategy, deck) => {
        this.setState({
            warningModalStrategy: true,
            modal: false,
            newStrategy: newStrategy,
            selectedDeck: deck
        })
        console.log("warningModalState", this.state.warningModal)

    }

    closeWarningModal = () => {
        this.setState({
            modal:true
        })
        console.log("warningModalState", this.state.warningModal)
    }

    warningModalProceed = (deck) => {
        let deckId = this.state.selectedDeck.id
        this.props.editThis("decks", this.state.newName, deckId)
        .then( data => {
                this.setState({
                    warningModal: false,
                    modal: true,
                    selectedDeck: deck
                })
                this.props.changeWoop()
            this.props.getAll2("decks")
        })

    }

    warningModalProceedDescription = (deck) => {
        let deckId = this.state.selectedDeck.id
        this.props.editThis("decks", this.state.newDescription, deckId)
        .then( data => {
                this.setState({
                    warningModalDescription: false,
                    modal: true,
                    selectedDeck: deck
                })
                this.props.changeWoop()
            this.props.getAll2("decks")
        })

    }

    warningModalProceedStrategy = (deck) => {
        let deckId = this.state.selectedDeck.id
        this.props.editThis("decks", this.state.newStrategy, deckId)
        .then( data => {
                this.setState({
                    warningModalStrategy: false,
                    modal: true,
                    selectedDeck: deck
                })
                this.props.changeWoop()
            this.props.getAll2("decks")
        })

    }

    warningModalCancel = (deck) => {
            this.setState({
                warningModal: false,
                modal: true,
                selectedDeck: deck
            })
            this.props.changeWoop()
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
                                                    cardsOfDeck: cardsOfDeck,
                                                    emptyDeck: false
                                            })
                                        })

                                    })
                            })

                        } else {
                            this.setState({
                                cardsOfDeck: [],
                                emptyDeck: true,
                            })
                        }
                    }
                    )
            })

    }

    deleteRelationshipToGetId = (resource) => {
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
                                        console.log("FIRST LAYER PROMISE")
                                        new Promise((resolve, reject) => {
                                            cardsOfDeck.push(card)
                                            resolve()
                                        })
                                            .then(() => {
                                                console.log("SECOND LAYER PROMISE")
                                                new Promise((resolve, reject) => {
                                                this.setState({
                                                    cardsOfDeck: cardsOfDeck,
                                                    emptyDeck: false
                                                })
                                                resolve()
                                            })
                                            })
                                            .then(() => {
                                                console.log("ITS DOING THIS LAST")
                                                this.props.getAll2("cards")
                                            })
                                    })
                            })

                        }
                        else {
                            new Promise((resolve, reject) => {
                            this.setState({
                                cardsOfDeck: [],
                                emptyDeck: true,
                            })
                            resolve()
                        })
                        .then(() => {
                            this.props.getAll2("cards")
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



    consoleLog = (deck) => {
        console.log("cards of deck in deck item layer", this.state.cardsOfDeck)
        console.log("SELECTED DECK IN DECK ITEM", this.state.selectedDeck)
        // console.log("warning modal stat", this.state.warningModal)
        console.log("NEW NAME", this.state.newName)
        console.log("THIS DECK", deck)

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
                    deleteThis={this.props.deleteThis}
                    deleteIt={this.props.deleteIt}
                    deleteThis2={this.props.deleteThis2}
                    deleteRelationship={this.deleteRelationship}
                    deleteRelationshipToGetId={this.deleteRelationshipToGetId}
                    // DATA STATES
                    selectedDeck={this.state.selectedDeck}
                    decks={this.props.decks}
                    users={this.props.users}
                    token={this.props.token}
                    cards={this.props.cards}
                    cardsOfDeck={this.state.cardsOfDeck}
                    // CREATED DATA
                    emptyDeck={this.state.emptyDeck}
                    newName={this.state.newName}
                    //TRIGGER SWITCH FUNCTIONS
                    showWarningModal={this.showWarningModal}
                    closeWarningModal={this.closeWarningModal}
                    warningModalProceed={this.warningModalProceed}
                    warningModalCancel={this.warningModalCancel}
                    showWarningModalFromDescriptionForm={this.showWarningModalFromDescriptionForm}
                    warningModalProceedDescription={this.warningModalProceedDescription}
                    showWarningModalStrategyForm={this.showWarningModalStrategyForm}
                    warningModalProceedStrategy={this.warningModalProceedStrategy}

                />
            )
        } else {
            modal = null
        }


        let warningModalField = ""

        if (this.state.warningModal) {
            warningModalField = (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Are you sure you want save this changes?</p>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                             <buttton onClick={this.consoleLog}>console log</buttton>
                         </section>
                        <footer className="modal-card-foot">
                            <button onClick={() => this.warningModalProceed(this.state.selectedDeck)}className="button is-success">Save changes</button>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        } else {
            warningModalField = null
        }

        let warningModalFieldDescription = ""

        if (this.state.warningModalDescription) {
            warningModalFieldDescription = (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Are you sure you want save this changes?</p>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                             <buttton onClick={this.consoleLog}>console log</buttton>
                         </section>
                        <footer className="modal-card-foot">
                            <button onClick={() => this.warningModalProceedDescription(this.state.selectedDeck)}className="button is-success">Save changes</button>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        } else {
            warningModalFieldDescription = null
        }


        let warningModalFieldStrategy = ""

        if (this.state.warningModalStrategy) {
            warningModalFieldStrategy = (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Are you sure you want save this changes?</p>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                             <buttton onClick={this.consoleLog}>console log</buttton>
                         </section>
                        <footer className="modal-card-foot">
                            <button onClick={() => this.warningModalProceedStrategy(this.state.selectedDeck)}className="button is-success">Save changes</button>
                            <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            )
        } else {
            warningModalFieldStrategy = null
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
                    {warningModalField}
                    {warningModalFieldDescription}
                    {warningModalFieldStrategy}
                    {modal}
                    <button onClick={this.consoleLog}>console log deck item</button>
                    {this.props.decks.map(deck =>

                        <div onClick={() => this.consoleLog(deck)} className="deckItself" key={deck.id} >
                            <div className="card deckDiv" onMouseEnter={() => this.inspectIt(deck)} onMouseLeave={this.dontInspectIt}>
                                <div className="card-image deckImageDiv" >
                                    <img className="deckCoverImage1" src={deck.imageCover1} alt="Placeholder image" />
                                    { deck.imageCover2 && <img className="deckCoverImage2" src={deck.imageCover2} alt="Placeholder image" /> }
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


