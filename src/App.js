import React, { Component } from 'react';
import APIManager from './components/managerComponents/APIManager'
import ViewCards from './components/cardsComponents/viewCards'
import ViewMyDecks from './components/myDecksComponents/viewDecks'
import ViewMyCollection from './components/myCollectionComponents/viewCollection'
import NavBar from './components/nav-barComponent/navBar'
import Login from './components/authComponents/login'
import './App.css';

class App extends Component {

    state = {
        apiCards: [],
        apiUrl: "http://localhost:8000/api/v1/",
        // pokeApi: "https://api.pokemontcg.io/v1/cards?name=charizard"
        pokeApi: "https://api.pokemontcg.io/v1",
        decksPage: false,
        collectionPage: false,
        searchPage: false,
        decks: [],
        cards: [],
        users: [],
        username: "",
        password: "",
        navBarStatus: true,
        woop: false
    }


    componentDidMount() {
        //   this.getCards()
        this.getAll("decks")
        this.getAll("cards")
        this.getAll("users")
    }

    componentDidUpdate() {
        if (this.state.username) {
            this.authenticate()
            this.getAll("decks")
        }
    }

    // THIS FUNCTION GETS CARDS FROM THE POKEMON TCG API
    getCards = (keyword) => {
        APIManager.getThem(`${this.state.pokeApi}/cards?name=${keyword}`)
            .then(data => this.setState({ apiCards: data.cards }))
    }

    getAll = (resource) => {
        APIManager.getAll(resource)
            .then(data => {
                console.log("data list", data)
                this.setState({ [resource]: data })
            })
    }


    createNew = (resource, newObj) => {
        APIManager.create(resource, newObj)
            .then(data => {
                console.log("decks list", data)
            })
    }

    getSingle = (resource, id) => {
        APIManager.getSingle(resource, id)
            .then(data => {
                this.setState({ [resource]: data })
            })
    }

    editThis = (resource, newObj, id) => {
        APIManager.edit(resource, newObj, id)
            .then(() => this.getCards(resource))
    }


    consoleLog = () => {
        // console.log("Cards: ", this.state.cards)
        // this.state.cards.map(function (index, current_value, array) {
        //     console.log("index: ", index, current_value)
        // }
        // )

        // console.log("CARD: ", this.state.cards[0].attacks)
        // console.log(this.state.decks)
        console.log("USERS STATE: ", this.state.username)
        console.log("PASS STATE: ", this.state.password)
        console.log(this.state.users)
        console.log("SESSION STORAGE: ", sessionStorage)
        this.authenticate()
    }


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


    signIn = (username, password) => {
        this.setState({
            username: username,
            password: password,
            navBarStatus: true
        })
        // this.authenticate()
    }

    authenticate = () => {
        let users = this.state.users
        for (let i = 0; i < users.length; i++) {
            console.log("users[i]: ", users[i])
            console.log("users[i] username: ", users[i].user_name)
            console.log("users[i] pass: ", users[i].password)

            if (users[i].user_name === this.state.username && users[i].password === this.state.password) {
                console.log("ITS PASSING")
                sessionStorage.setItem("username", users[i].user_name)
                sessionStorage.setItem("password", users[i].password)
                sessionStorage.setItem("id", users[i].id)
                sessionStorage.setItem("url", users[i].url)

            }


        }

    }



    render() {

        // ALLOWS RENDER THE VIEW CARDS COMPONENT IF SEARCH PAGE STATE IS TRUE
        let searchCards = ""
        if (this.state.searchPage) {
            searchCards = (
                <ViewCards getCards={this.getCards}
                    cards={this.state.cards}
                    apiCards={this.state.apiCards}
                    createNew={this.createNew}
                    decks={this.state.decks}
                    getSingle={this.getSingle}
                    editThis={this.editThis}

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
                    createNew={this.createNew}
                    decks={this.state.decks} />
            )
        } else {
            viewDecks = null
        }


        // ALLOWS RENDER THE VIEW MY COLLECTION COMPONENT IF COLLECTION PAGE STATE IS TRUE
        let viewCollection = ""
        if (this.state.collectionPage) {
            viewCollection = (
                <ViewMyCollection
                    cards={this.state.cards}
                    getAll={this.getAll} />
            )
        } else {
            viewCollection = null
        }

        let login = ""
        if (sessionStorage.length <= 0) {
            login = (
                <Login
                    signIn={this.signIn} />
            )
        } else {
            login = null
        }

        let navbar = ""
        if (sessionStorage.length >= 1 && this.state.navBarStatus) {
            navbar = (
                <NavBar clickOnSearchPage={this.clickOnSearchPage}
                    clickOnMyDecks={this.clickOnMyDecks}
                    clickOnMyCollection={this.clickOnMyCollection}
                />
            )
        }

        return (
            <div className="appItself">
                <button onClick={this.consoleLog}>CONSOLE LOG</button>
                <h1 className="appName">POKEMASTER</h1>
                {login}
                {navbar}
                {searchCards}
                {viewDecks}
                {viewCollection}

            </div>
        );
    }
}

export default App;
