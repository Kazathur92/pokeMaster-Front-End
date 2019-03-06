import React, { Component } from 'react';
import APIManager from './components/managerComponents/APIManager'
import Register from './components/authComponents/register'
import Login from './components/authComponents/login'
import ApplicationViews from './applicationViews'
import './App.css';

// let username = sessionStorage.getItem("username")

class App extends Component {

    state = {
        pokeApi: "https://api.pokemontcg.io/v1",
        apiCards: [],
        decks: [],
        cards: [],
        users: [],
        currentUser: [],
        decksPage: false,
        collectionPage: false,
        searchPage: false,
        navBarStatus: false,
        showLogin: true,
        showRegister: false,
        password: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        token: localStorage.getItem("token"),

        // ==========================
        isAuth: false,
        register: false,
        // ==========================
    }


    componentDidMount() {
        APIManager.getAllOnRefresh("decks")
            .then(data => {
                console.log("data list", data)
                this.setState({ decks: data })
            })
        APIManager.getAllOnRefresh("cards")
            .then(data => {
                console.log("data list", data)
                this.setState({ cards: data })
            })
        APIManager.getAllOnRefresh("users")
            .then(data => {
                console.log("data list", data)
                this.setState({ users: data })
            })
    }




    // THIS FUNCTION GETS CARDS FROM THE POKEMON TCG API
    getCards = (keyword) => {
        APIManager.getThem(`${this.state.pokeApi}/cards?name=${keyword}`)
            .then(data => this.setState({ apiCards: data.cards }))
    }

    getAll = (resource, token) => {
        APIManager.getAll(resource, token)
            .then(data => {
                console.log("data list", data)
                this.setState({ [resource]: data })
            })
    }

    createNew = (resource, newObj) => {
        let token = this.state.token
        console.log("CREATE TOKEN", token)
         APIManager.create(resource, newObj, token)
             .then(data => {
                 console.log("after create list", data)
                 this.getAll(resource, token)
             })
     }

     deleteThis = (resource, id) => {
        let token = this.state.token
        APIManager.delete(resource, id)
        .then(() =>
        this.getAll(resource, token)
        )
    }


    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    consoleLog = () => {
        console.log("STATES")
        console.log("CURRENT USER APP LEVEL: ", this.state.currentUser)
        console.log("DECKS app layer: ", this.state.decks)
        console.log("DB CARDS app layer: ", this.state.cards)
        console.log("USERS app layer: ", this.state.users)
        console.log("username app layer state: ", this.state.username)
        console.log("password app layer state: ", this.state.password)
        console.log("navBar app layer state: ", this.state.navBarStatus)
        console.log("showRegister app layer state: ", this.state.showRegister)
        console.log("showLogin app layer state: ", this.state.showLogin)
        console.log("TOKEN STATE: ", this.state.token)


    }

    findCurrentUser = () => {
        console.log("OUTSIDE")
        console.log("USERS AP VIEWS LEVEL", this.props.users)
        let username = localStorage.getItem('username')
        this.state.users.forEach(user => {
            console.log("IN LOOP")
            if (user.username === username) {
                console.log("WENT THROUGH", user)
                this.setState({
                    currentUser: user
                })
            }
        })
    }

    clickedOnRegister = () => {

        this.setState({
            showLogin: false,
            showRegister: true,
        })
    }


    registerUser = (username, password, email, firstName, lastName) => {

        let user = {
            password: password,
            username: username,
            first_name: firstName,
            email: email,
            last_name: lastName
        }
        console.log(user)

        this.postAuth("register", user)
        .then(() => {
        console.log("woop")
        }
        )
        }


    registering = () => {
        this.setState({
            showRegister: false,
            navBarStatus: true
        })
    }


    signIn = (username, password) => {
        this.setState({
            username: username,
            password: password,
        })
        this.logIn()
    }

    updateStateOnRegister = () => {
        this.setState({
            navBarStatus: true,
            showLogin: false,
            showRegister: false
        })
    }

    logIn() {
        console.log('log in', localStorage.getItem("token"));
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        this.postAuth("api-token-auth", user)
            .then(() => {
                console.log("user logged in!")
            })
    }

    postAuth(route, user) {
        console.log('PostAuth called', route, user);

        return fetch(`http://127.0.0.1:8000/api/v1/${route}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("auth", response)
                // if status code is 200 render nav bar
                if (response.status === 200) {
                    console.log("its 200")
                    return response.json();
                } else {
                    return "you aint a user brah!"
                }
            })
            .then((tokenObj) => {
                console.log("converted token", tokenObj.token);
                localStorage.setItem("token", tokenObj.token)
                localStorage.setItem("username", user.username)
                console.log("local s user?", localStorage.getItem("user"))
                this.getAll("decks", tokenObj.token)
                this.getAll("cards", tokenObj.token)
                this.getAll("users", tokenObj.token)
                this.setState({
                    navBarStatus: true,
                    showLogin: false,
                    showRegister: false,
                    token: tokenObj.token
                })

            })
            .catch((err) => {
                console.log("auth no like you, brah", err);
            });
    }





    render() {

        let register = ""
        if (localStorage.length <= 0 && this.state.showLogin === false && this.state.showRegister === true) {
            register = (
                <Register handleFieldChange={this.handleFieldChange}
                    username={this.state.username}
                    password={this.state.password}
                    first_name={this.state.first_name}
                    email={this.state.email}
                    last_name={this.state.last_name}
                    registerUser={this.registerUser}
                    // date_joined={this.state.date_joined}
                    postAuth={this.postAuth} />
            )
        } else {
            register = null
        }


        let login = ""
        if (localStorage.length <= 0 && this.state.showLogin && this.state.showRegister === false) {
            login = (
                <Login
                    signIn={this.signIn}
                    clickedOnRegister={this.clickedOnRegister}
                    postAuth={this.postAuth}
                    handleFieldChange={this.handleFieldChange}
                    username={this.state.username}
                    password={this.state.password} />
            )
        } else {
            login = null
        }


        return (
            <React.Fragment>
                <button onClick={this.consoleLog}>App States</button>
                {login}
                {register}
                <ApplicationViews
                    findCurrentUser={this.findCurrentUser}
                    createNew={this.createNew}
                    deleteThis={this.deleteThis}
                    getCards={this.getCards}
                    updateStates={this.updateStates}
                    postAuth={this.postAuth}
                    navBarStatus={this.state.navBarStatus}
                    apiCards={this.state.apiCards}
                    decks={this.state.decks}
                    cards={this.state.cards}
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    token={this.state.token}
                />
            </React.Fragment>
        );
    }
}

export default App;
