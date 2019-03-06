import React, { Component } from 'react';
import APIManager from './components/managerComponents/APIManager'
import ViewCards from './components/cardsComponents/viewCards'
import ViewMyDecks from './components/myDecksComponents/viewDecks'
import ViewMyCollection from './components/myCollectionComponents/viewCollection'
import NavBar from './components/nav-barComponent/navBar'
import Login from './components/authComponents/login'
import './App.css';

let username = sessionStorage.getItem("username")

export default class AplicationViews extends Component {

    state = {
        apiCards: [],
        pokeApi: "https://api.pokemontcg.io/v1",
        decksPage: false,
        collectionPage: false,
        searchPage: false,
        currentUser: []
    }


    componentDidMount() {

    }


    findCurrentUser = () => {
        console.log("OUTSIDE")
        console.log(this.props.users)
        let username = localStorage.getItem('username')
        this.props.users.forEach( user => {
            console.log("IN LOOP")
            if(user.username === username) {
                console.log("WENT THROUGH", user)
                this.setState({
                    currentUser: user
                })
            }
        })
    }

    // IF THERE IS NO USER NAME THIS WILL START AN INFINITE LOOP must fix!
    componentDidUpdate(prevProps) {


    }

    // THIS FUNCTION GETS CARDS FROM THE POKEMON TCG API
    getCards = (keyword) => {
        APIManager.getThem(`${this.state.pokeApi}/cards?name=${keyword}`)
            .then(data => this.setState({ apiCards: data.cards }))
    }

    getAll = (resource) => {
        let token = this.props.token
        APIManager.getAll(resource, token)
            .then(data => {
                console.log("data list", data)
                this.setState({ [resource]: data })
            })
    }

    // not in use
    getSingle = (resource, id) => {
        APIManager.getSingle(resource, id)
        .then(() => this.getAll(resource))
    }

    //not in use
    editThis = (resource, newObj, id) => {
        APIManager.edit(resource, newObj, id)
            .then(() => this.getCards(resource))
    }


    consoleLog = () => {
        console.log("USERS STATE: ", this.state.username)
        console.log("PASS STATE: ", this.state.password)
        console.log("USERS PROPS: ", this.state.currentUser)
        console.log("SESSION STORAGE: ", sessionStorage)
    }


    clickOnMyDecks = () => {
        this.setState({
            decksPage: true,
            collectionPage: false,
            searchPage: false,
        })
        this.findCurrentUser()
    }



// NAV BAR CLICKS
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


    render() {

        // ALLOWS RENDER THE VIEW CARDS COMPONENT IF SEARCH PAGE STATE IS TRUE
        let searchCards = ""
        if (this.state.searchPage) {
            searchCards = (
                <ViewCards getCards={this.getCards}
                    apiCards={this.state.apiCards}
                    createNew={this.props.createNew}
                    decks={this.props.decks}
                    getSingle={this.getSingle}
                    editThis={this.editThis}
                    users={this.props.users}
                    token={this.props.token}

                />
            )
        } else {
            searchCards = null
        }

        // ALLOWS RENDER THE VIEW MY DECKS COMPONENT IF DECKS PAGE STATE IS TRUE
        let viewDecks = ""
        if (this.state.decksPage) {
            viewDecks = (
                <ViewMyDecks
                    getAll={this.getAll}
                    createNew={this.props.createNew}
                    decks={this.props.decks}
                    deleteThis={this.props.deleteThis}
                    currentUser={this.state.currentUser}
                    />
            )
        } else {
            viewDecks = null
        }


        // ALLOWS RENDER THE VIEW MY COLLECTION COMPONENT IF COLLECTION PAGE STATE IS TRUE
        let viewCollection = ""
        if (this.state.collectionPage) {
            viewCollection = (
                <ViewMyCollection
                    cards={this.props.cards}
                    getAll={this.getAll} />
            )
        } else {
            viewCollection = null
        }

        let navbar = ""
        if (localStorage.length >= 1 || this.props.navBarStatus) {
            navbar = (
                <NavBar clickOnSearchPage={this.clickOnSearchPage}
                    clickOnMyDecks={this.clickOnMyDecks}
                    clickOnMyCollection={this.clickOnMyCollection}
                />
            )
        } else {
            navbar = null
        }

        return (
            <div className="appItself">
                <button onClick={this.consoleLog}>CONSOLE LOG</button>
                <h1 className="appName">POKEMASTER</h1>
                {/* {login} */}
                {navbar}
                {searchCards}
                {viewDecks}
                {viewCollection}

            </div>
        );
    }
}
