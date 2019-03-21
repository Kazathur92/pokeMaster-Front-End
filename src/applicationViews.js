import React, { Component } from 'react';
import { slideInDown, flipInX, headShake, fadeIn, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import APIManager from './components/managerComponents/APIManager'
import ViewCards from './components/searchComponents/viewCards'
import ViewMyDecks from './components/myDecksComponents/viewDecks'
import ViewMyCollection from './components/myCollectionComponents/viewCollection'
import NavBar from './components/nav-barComponent/navBar'
import Login from './components/authComponents/login'
import './App.css';

let username = sessionStorage.getItem("username")

// ============================ANIMATIONS=========================
const fadeInAnimation = {
    fadeIn: {
      animation: "1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn")
    }
  }

export default class AplicationViews extends Component {

    state = {
        pokeApi: "https://api.pokemontcg.io/v1",
        decksPage: false,
        collectionPage: false,
        searchPage: false,
        userCards: this.props.userCards,
        userDecks: this.props.userDecks,

        cardsOfDeck: [],
        emptyDeck: false,
        triggerSwitch: false
    }


    componentDidMount() {
        console.log("===APP VIEWS MOUNT===")

    }

    componentDidUpdate(prevProps) {
        // THIS ONLY ACTIVATES IF A NEW DECK IS ADDED OR DELETED
        if (this.props.userDecks !== prevProps.userDecks) {
            this.setState({
                userDecks: this.props.userDecks,
            })
        }

        if (this.props.userCards !== prevProps.userCards) {
            this.setState({
                userCards: this.props.userCards,
            })
        }

        if (this.props.token !== prevProps.token) {
            this.props.getAll2("cards")
            this.props.getAll2("decks")
            let token = localStorage.getItem("token")
            this.props.setUser("user-id", token)
        }
    }

    signOut = () => {
        localStorage.clear()
        this.setState({
            collectionPage: false,
            searchPage: false,
            decksPage: false
        })
        this.props.logOut()
    }

    changeTriggerSwitch = () => {
        this.setState({
            triggerSwitch: !this.state.triggerSwitch
        })
    }

    updateCardsOfDeckStateFalse = (cardsOfDeck) => {
        console.log("CARDS OF DECK CHANGING IN AP VIEWS", cardsOfDeck)
        this.setState({
            cardsOfDeck: cardsOfDeck,
            emptyDeck: false,
            triggerSwitch: true
        })
    }

    updateCardsOfDeckStateTrue = (cardsOfDeck) => {
        this.setState({
            cardsOfDeck: "",
            emptyDeck: true,
        })
    }

    // NAV BAR CLICKS START =============== NAV BAR CLICKS START ==================

    clickOnMyDecks = () => {
        this.setState({
            decksPage: true,
            collectionPage: false,
            searchPage: false,
        })
    }

    clickOnMyCollection = () => {
        this.setState({
            collectionPage: true,
            decksPage: false,
            searchPage: false,
        })
    }

    clickOnSearchPage = () => {
        this.setState({
            searchPage: true,
            decksPage: false,
            collectionPage: false,
        })
    }

    // NAV BAR CLICKS END ======================= NAV BAR CLICKS END =============


    // C O N S O L E  L O G  FUNCTION ==========================

    consoleLog = () => {
        console.log("=== STATES VIEWS LAYER START ===")
        // console.log("USER CARDS: ", this.state.userCards)
        console.log("USER DECKS", this.state.userDecks)
        console.log("USER CARDS: ", this.state.userCards)
        console.log("current user props", this.props.currentUser)
        console.log("TriggerSwitch AP VIEWS", this.state.triggerSwitch)
        console.log("=== STATES VIEWS LAYER END ===")
    }

    render() {

        // ALLOWS RENDER THE VIEW CARDS COMPONENT IF SEARCH PAGE STATE IS TRUE
        let searchCards = ""
        if (this.state.searchPage) {
            searchCards = (
                <StyleRoot>
                <div style={fadeInAnimation.fadeIn}>
                <ViewCards
                    // CRUD FUNCTIONS
                    gottaGetEmAll={this.props.gottaGetEmAll}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getAll2={this.props.getAll2}
                    getSingle={this.getSingle}
                    editThis={this.editThis}
                    // DATA STATES
                    apiCards={this.props.apiCards}
                    cards={this.props.cards}
                    decks={this.props.decks}
                    users={this.props.users}
                    token={this.props.token}
                    // CREATED DATA STATES
                    userDecks={this.props.userDecks}
                    // TRIGGER SWITCHES PROPS

                    // STATE CHANGING FUNCTIONS PROPS
                    findUserDecks={this.props.findUserDecks}
                />
                </div>
                </StyleRoot>
            )
        } else {
            searchCards = null
        }

        // ALLOWS RENDER THE VIEW MY DECKS COMPONENT IF DECKS PAGE STATE IS TRUE
        let viewDecks = ""
        if (this.state.decksPage) {
            viewDecks = (
                <StyleRoot>
                    <div style={fadeInAnimation.fadeIn}>

                    <ViewMyDecks
                        // CRUD
                        getAllWithQuery={this.props.getAllWithQuery}
                        getAll2={this.props.getAll2}
                        getCardsById={this.props.getCardsById}
                        createNew={this.props.createNew}
                        createNewDeck={this.props.createNewDeck}
                        createButDontGet={this.props.createButDontGet}
                        deleteIt={this.props.deleteIt}
                        deleteThis={this.props.deleteThis}
                        deleteThis2={this.props.deleteThis2}
                        editThis={this.props.editThis}
                        // FETCHED DATA PROPS
                        users={this.props.users}
                        decks={this.props.decks}
                        cards={this.props.cards}
                        // CREATED DATA PROPS
                        currentUser={this.props.currentUser}
                        userDecks={this.state.userDecks}
                        userCards={this.state.userCards}
                        cardsOfDeck={this.props.cardsOfDeck}
                        token={this.props.token}
                        // TRIGGER SWITCHES PROPS

                        // STATE CHANGING FUNCTIONS PROPS
                        findUserDecks={this.props.findUserDecks}
                        findUserCards={this.props.findUserCards}

                        updateCardsOfDeckStateFalse={this.updateCardsOfDeckStateFalse}
                        updateCardsOfDeckStateTrue={this.updateCardsOfDeckStateTrue}
                        cardsOfDeck={this.state.cardsOfDeck}
                        emptyDeck={this.state.emptyDeck}
                    />

                    </div>

                </StyleRoot>
            )
        } else {
            viewDecks = null
        }


        // ALLOWS RENDER THE VIEW MY COLLECTION COMPONENT IF COLLECTION PAGE STATE IS TRUE
        let viewCollection = ""
        if (this.state.collectionPage) {
            viewCollection = (
                <StyleRoot>
                    <div style={fadeInAnimation.fadeIn}>
                <ViewMyCollection
                    // CRUD
                    getAllWithQuery={this.props.getAllWithQuery}
                    deleteThis={this.props.deleteThis}
                    getAll2={this.props.getAll2}
                    createNewCard={this.props.createNewCard}
                    // FETCHED DATA PROPS
                    decks={this.props.decks}
                    cards={this.props.cards}
                    users={this.props.users}
                    // CREATED DATA PROPS
                    currentUser={this.props.currentUser}
                    userCards={this.state.userCards}
                    cardsOfDeck={this.state.cardsOfDeck}
                    // TRIGGER SWITCHES PROPS

                    // STATE CHANGING FUNCTIONS PROPS
                    findUserCards={this.props.findUserCards}
                    findCurrentUser={this.props.findCurrentUser}
                    triggerSwitch={this.state.triggerSwitch}
                    changeTriggerSwitch={this.changeTriggerSwitch}
                     />
                    </div>
                    </StyleRoot>
            )
        } else {
            viewCollection = null
        }

        let navbar = ""
        if (localStorage.length >= 1 || this.props.navBarStatus) {
            navbar = (
              <StyleRoot>
                <div style={fadeInAnimation.fadeIn}>
                <NavBar clickOnSearchPage={this.clickOnSearchPage}
                    clickOnMyDecks={this.clickOnMyDecks}
                    clickOnMyCollection={this.clickOnMyCollection}
                    findCurrentUser={this.props.findCurrentUser}
                />
                </div>
                </StyleRoot>
            )
        } else {
            navbar = null
        }

        let logOutButton = ""
        if (this.props.token) {
            logOutButton = (
                <div>
                <button className="logOutButton" onClick={this.signOut}>
                <span className="icon">
                    <i className="fas fa-sign-out-alt logOutIcon"></i>
                </span>
                Log Out
                </button>
                </div>

            )
        }
        else {
            logOutButton = null
        }

        return (
            <div className="appItself">
                {/* <button onClick={this.consoleLog}>CONSOLE LOG AP VIEWS</button> */}
                {logOutButton}
                <h1 className="appName">POKE-MASTER <img className="pokeballImage" src="/images/pokeball2.png"></img></h1>
                {navbar}
                {searchCards}
                {viewDecks}
                {viewCollection}

            </div>
        );
    }
}
