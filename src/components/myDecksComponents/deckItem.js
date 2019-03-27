import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import DeckModal from './deckModal'
import APIManager from '../managerComponents/APIManager';
import './viewDeck.css'


// ========================ANIMATIONS=======================

const fadeInAnimation = {
  fadeIn: {
    animation: "1s",
    animationName: Radium.keyframes(fadeIn, "fadeIn")
  }
}

export default class DeckItem extends Component {

  state = {
    selectedDeck: [],
    modal: false,
    warningModal: false,
    warningModalDescription: false,
    warningModalStrategy: false,
    warningModalTypes: false,
    inspectField: false,
    cardsOfDeck: this.props.cardsOfDeck,
    emptyDeck: false,
    newName: "",
    newDescription: "",
    newStrategy: "",
    deckMvp: "",
    imageCover1: "",
    imageCover2: "",
    energyType1: "",
    energyType2: "",

  }

  componentDidMount() {
    console.log("!!! DECK ITEM MOUNT !!!")

  }

  componentDidUpdate(prevProps) {
    console.log("DECK ITEM UPDATING")
    if (this.props.woop !== prevProps.woop) {
      console.log("WOOP IS DIFFERENT")

    }

  }


  //   ===============================  WARNING MODALS SECTION ===================================

  showWarningModal = (newName, deck) => {
    this.setState({
      warningModal: true,
      modal: false,
      newName: newName,
      selectedDeck: deck
    })
    console.log("warningModalState", this.state.warningModal)
  }

  showWarningModalDescriptionForm = (newDescription, deck) => {
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

  showWarningModalTypesForm = (deck, stateObj) => {
    this.setState({
      warningModalTypes: true,
      modal: false,
      imageCover1: stateObj.imageCover1,
      imageCover2: stateObj.imageCover2,
      energyType1: stateObj.energyType1,
      energyType2: stateObj.energyType2,
      selectedDeck: deck
    })
    console.log("warningModalState", stateObj)

  }

  closeWarningModal = () => {
    this.setState({
      modal: true
    })
    console.log("warningModalState", this.state.warningModal)
  }

  closeWarningModalDescription = () => {
    this.setState({
      warningModalDescription: false,
      modal: true
    })
    console.log("warningModalState", this.state.warningModal)
  }

  closeWarningModalStrategy = () => {
    this.setState({
      warningModalStrategy: false,
      modal: true
    })
    console.log("warningModalState", this.state.warningModal)
  }

  closeWarningModalTypes = () => {
    this.setState({
      warningModalTypes: false,
      modal: true
    })
    console.log("warningModalState", this.state.warningModal)
  }

  warningModalProceed = (obj) => {
    let deckId = this.state.selectedDeck.id

    this.props.editThis("decks", this.state.newName, deckId)
      .then(data => {
        this.setState({
          warningModal: false,
          modal: true,
          selectedDeck: obj
        })
        this.props.changeWoop()
        this.props.getAll2("decks")
      })
  }

  warningModalProceedDescription = (deck) => {
    console.log("NEW DESCRIPTION", this.state.newDescription, this.state.selectedDeck.id)
    let deckId = this.state.selectedDeck.id
    this.props.editThis("decks", this.state.newDescription, deckId)
      .then(data => {
        new Promise((resolve, reject) => {
          this.setState({
            warningModalDescription: false,
            modal: true,
            selectedDeck: deck
          })
          resolve()
        })
          .then(() => {
            new Promise((resolve, reject) => {
              this.props.changeWoop()
              resolve()
            })
              .then(() => {
                this.props.getAll2("decks")
              })
          })
      })

  }

  warningModalProceedStrategy = (deck) => {
    let deckId = this.state.selectedDeck.id
    this.props.editThis("decks", this.state.newStrategy, deckId)
      .then(data => {
        this.setState({
          warningModalStrategy: false,
          modal: true,
          selectedDeck: deck
        })
        this.props.changeWoop()
        this.props.getAll2("decks")
      })

  }

  warningModalProceedTypes = (obj) => {
    let deckId = this.state.selectedDeck.id

    let thingsToEdit = {
      imageCover1: this.state.imageCover1,
      imageCover2: this.state.imageCover2,
      energyType1: this.state.energyType1,
      energyType2: this.state.energyType2
    }

    this.props.editThis("decks", thingsToEdit, deckId)
      .then(data => {
        new Promise((resolve, reject) => {
          this.setState({
            warningModalTypes: false,
            modal: true,
            selectedDeck: obj
          })
          this.props.changeWoop()
          resolve()

        })
          .then(() => {
            this.props.getAll2("decks")
          })
      })
  }


  warningModalCancel = (deck) => {
    this.setState({
      warningModal: false,
      warningModalDescription: false,
      warningModalStrategy: false,
      warningModalTypes: false,
      modal: true,
      selectedDeck: deck
    })
    this.props.changeWoop()
  }

  warningModalTypesCancel = (deck) => {
    this.setState({
      warningModalTypes: false,
      modal: true,
      selectedDeck: deck
    })
    this.props.changeWoop()
  }


  // ===========================================WARNING MODAL SECTION END===============================


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
                        this.props.updateCardsOfDeckStateFalse(cardsOfDeck)
                      })

                  })
              })
            } else {
              this.props.updateCardsOfDeckStateTrue()
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
                            emptyDeck: false
                          })
                          this.props.updateCardsOfDeckStateFalse(cardsOfDeck)
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
    new Promise((resolve, reject) => {

      console.log("setting state of selected deck")
      this.setState({
        modal: true,
        selectedDeck: deck
      })
      resolve()
    })
      .then(() => {
        let cardsOfDeck = []
        let token = localStorage.getItem("token")
        console.log("SELECTED DECK BEFORE FETCH", this.state.selectedDeck)
        APIManager.getAllWithQuery("deckcardsrelationship", `?filter=${this.state.selectedDeck.id}`, token)
          .then(data => {
            console.log(data)
            data.map(card => {
              console.log("BRING ME CARD", card)
              this.props.getCardsById(card.cardId)
                .then(card => {
                  new Promise((resolve, reject) => {
                    cardsOfDeck.push(card)
                    resolve()
                  })
                    .then(() => {
                      console.log("CARDS OF DECK AFTER GETTING", cardsOfDeck)
                      this.props.updateCardsOfDeckStateFalse(cardsOfDeck)
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
    this.props.updateCardsOfDeckStateTrue()
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

  makeMvp = (card, deck) => {

    if (card.imageUrl) {

      let newObj = {
        imageMvp: card.imageUrl
      }

      this.props.editThis("decks", newObj, deck.id)
        .then(deck => {
          console.log("DATA BROUGHT BACK", deck)
          this.props.getAll2("decks")
        })
    }
    else {
      let newObj = {
        imageMvp: "https://bulma.io/images/placeholders/1280x960.png"

      }

      this.props.editThis("decks", newObj, deck.id)
        .then(deck => {
          console.log("DATA BROUGHT BACK", deck)
          this.props.getAll2("decks")
        })
    }
  }


  consoleLog = (deck) => {
    console.log("cards of deck in deck item layer", this.state.cardsOfDeck)
    console.log("SELECTED DECK IN DECK ITEM", this.state.selectedDeck)
    // console.log("warning modal stat", this.state.warningModal)
    console.log("NEW NAME", this.state.newName)
    console.log("THIS DECK", deck)
    console.log("CARDS", this.props.cards)

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
          cardsOfDeck={this.props.cardsOfDeck}
          // CREATED DATA
          emptyDeck={this.state.emptyDeck}
          newName={this.state.newName}
          //TRIGGER SWITCH FUNCTIONS
          showWarningModal={this.showWarningModal}
          closeWarningModal={this.closeWarningModal}
          warningModalProceed={this.warningModalProceed}
          warningModalCancel={this.warningModalCancel}
          showWarningModalDescriptionForm={this.showWarningModalDescriptionForm}
          warningModalProceedDescription={this.warningModalProceedDescription}
          showWarningModalStrategyForm={this.showWarningModalStrategyForm}
          warningModalProceedStrategy={this.warningModalProceedStrategy}
          showWarningModalTypesForm={this.showWarningModalTypesForm}

          makeMvp={this.makeMvp}

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
              <button onClick={() => this.warningModalProceed(this.state.selectedDeck)} className="button is-success">Save changes</button>
              <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
            </section>
            <footer className="modal-card-foot">
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
              <button onClick={() => this.warningModalProceedDescription(this.state.selectedDeck)} className="button is-success">Save changes</button>
              <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
            </section>
            <footer className="modal-card-foot">
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
              <button onClick={() => this.warningModalProceedStrategy(this.state.selectedDeck)} className="button is-success">Save changes</button>
              <button onClick={() => this.warningModalCancel(this.state.selectedDeck)} className="button">Cancel</button>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      )
    } else {
      warningModalFieldStrategy = null
    }

    let warningModalFieldTypes = ""

    if (this.state.warningModalTypes) {
      warningModalFieldTypes = (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure you want save this changes?</p>
              <button onClick={() => this.warningModalTypesCancel(this.state.selectedDeck)} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <button onClick={() => this.warningModalProceedTypes(this.state.selectedDeck)} className="button is-success">Save changes</button>
              <button onClick={() => this.warningModalTypesCancel(this.state.selectedDeck)} className="button">Cancel</button>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      )
    } else {
      warningModalFieldTypes = null
    }



    let inspect = ""
    if (this.state.inspectField) {

      inspect = (
        <React.Fragment>
          <StyleRoot>
            <button className="inspectButton" style={fadeInAnimation.fadeIn} onClick={() => this.viewDeck(this.state.selectedDeck)}>
              <span className="icon">
                <i className="fas fa-search"></i>
              </span>
              inspect</button>
          </StyleRoot>
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
          {warningModalFieldTypes}
          {modal}
          {/* <button onClick={this.consoleLog}>console log deck item</button> */}
          {this.props.decks.map(deck =>

            <div onClick={() => this.consoleLog(deck)} className="deckItself" key={deck.id} >
              <div className="card deckDiv" onMouseEnter={() => this.inspectIt(deck)} onMouseLeave={this.dontInspectIt}>
                <div className="card-image deckImageDiv" >
                  <img className="deckCoverImage1" src={deck.imageCover1} alt="Placeholder image" />
                  {deck.imageCover2 && <img className="deckCoverImage2" src={deck.imageCover2} alt="Placeholder image" />}
                </div>
                <div className="">
                  <div className="media">
                    <div className="media-left">
                      {deck.imageMvp ? <img className="deckMVPImage" src={deck.imageMvp} alt="Placeholder image" /> : <img className="deckMVPImageNone" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />}
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
                  <button className="deleteButton" onClick={() => this.props.deleteThis2("decks", deck.id)}>delete</button>
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


