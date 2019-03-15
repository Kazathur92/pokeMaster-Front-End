import React, { Component } from 'react';
import APIManager from './components/managerComponents/APIManager'
import Register from './components/authComponents/register'
import Login from './components/authComponents/login'
import ApplicationViews from './applicationViews'
import './App.css';

// let username = sessionStorage.getItem("username")

class App extends Component {

    state = {
        // API
        pokeApi: "https://api.pokemontcg.io/v1",
        // FETCHED DATA
        apiCards: [],
        decks: [],
        cards: [],
        users: [],
        cardsOfDeck: [],
        // CREATED DATA
        token: localStorage.getItem("token"),
        currentUser: [],
        decksNumba2: [],
        // FORM VALUES
        password: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        // TRIGGER SWITCHES
        decksPage: false,
        collectionPage: false,
        searchPage: false,
        navBarStatus: false,
        showLogin: true,
        showRegister: false,


    }


    componentDidMount() {
        console.log("**** DID MOUNT APP START ****")
        // console.log("users before fetching", this.state.users)
        console.log("cards before fetch", this.state.cards)


        // THIS FUNCTIONS CAN GET THE DATA WITHOUT A TOKEN BEING PASSED TO THEM, SEE API MANAGER
        APIManager.getAllOnRefresh("decks")
            .then(data => {
                this.setState({ decks: data })
            })

        APIManager.getAllOnRefresh("cards")
            .then(data => {
                // console.log("cards list after fetch before setting state", data)
                this.setState({ cards: data })
            })

        // APIManager.getAllOnRefresh("users")
        //     .then(data => {
        //         this.setState({ users: data })
        //     })

            APIManager.getAllOnRefresh("user-id")
            .then(data => {
                console.log("USER", data)
                this.setState({ users: data })
            })

    //     console.log("**** DID MOUNT APP END ****")

    // this.getSingle("decks")
}


    componentDidUpdate() {
    }


    //    STATE CHANGING FUNCTIONS ================

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    findCurrentUser = () => {
        // let username = localStorage.getItem('username')
        // // console.log("its firing the find user function", this.state.users)
        // this.state.users.forEach(user => {
        //     // console.log("inside for each", user)
        //     if (user.username === username) {
        //         // console.log("inside if statement", user)
        //         this.setState({
        //             currentUser: user
        //         })
        //     }
        // })
        console.log("LOCAL STORAGE: ", localStorage.getItem("token"))

        APIManager.getAllOnRefresh("user-id")
        .then(data => {
            console.log("USER", data)
            this.setState({ users: data })
        })


    }






    // C R U D FUNCTIONS START ===================C R U D ==========================START

    // THIS FUNCTIONS GET CARDS FROM THE POKEMON TCG API

    getSingle = (resource) => {
        APIManager.getSingleUser(resource)
        .then(user => console.log(user))

    }

    gottaGetEmAll = (subtype, keyword) => {
        APIManager.getThem(`${this.state.pokeApi}/cards?subtype=${subtype}&name=${keyword}`)
            .then(data => {
                console.log(data)
                this.setState({ apiCards: data.cards })
            })
    }

    getCardsById = (keyword) => {
        return APIManager.getThemById(`${this.state.pokeApi}/cards/${keyword}`)
    }

    // ===============================================================

    getAllWithQuery = (resource, query) => {
        APIManager.getAllWithQuery(resource, query)
            .then(data => {
                // console.log("data list", data)
                console.log("ITs Getting All")
                this.setState({ cardsOfDeck: data },
                 )
                console.log("just fetched and set new state")
            })
    }

    getAll2 = (resource) => {
        let token = localStorage.getItem("token")
        APIManager.getAll2(resource, token)
            .then(data => {
                    console.log("setting state with getAll 2")
                    this.setState({ [resource]: data })
            })
    }

    getAllWithToken = (resource, token) => {
        APIManager.getAllWithToken(resource, token)
        .then(data => {
            console.log("USING THE TOKEN")
            this.setState({ [resource]: data})
        })
    }

    getUser = (resource, token) => {
        APIManager.getAllWithToken(resource, token)
        .then(data => {
            console.log("USING THE TOKEN")
            this.setState({ users: data})
        })
    }

    // MAKE IT RETURN THE CREATE AND PROCEED WITH .THEN DOWN WHERE IM ADDING

    createNew = (resource, newObj) => {
        let token = this.state.token
        console.log("CREATE TOKEN", token)
        APIManager.create(resource, newObj, token)
            .then(data => {
                console.log("just created, now calling get all", data)
                this.getAllWithQuery(resource, token)
            })
    }

    createNewCard = (resource, newObj) => {
        let token = this.state.token
        return APIManager.create(resource, newObj, token)

    }

    createButDontGet = (resource, newObj) => {
        let token = this.state.token
        console.log("CREATE TOKEN", token)
        APIManager.create(resource, newObj, token)
            .then(data => {
                this.getAll2(resource, token)
            })
    }

    deleteThis = (resource, id) => {
        console.log("DELETE THIS", resource, id)
        let token = this.state.token
        APIManager.delete(resource, id, token)
            .then(() =>
                APIManager.getAll2(resource, token)
                .then(data => {
                    // console.log("data list", data)
                    console.log("ITs Getting All")
                    this.setState({ [resource]: data },
                        )
                    console.log("just fetched and set new state")
                })
            )
    }

    deleteThis2 = (resource, id, deckId) => {
        let token = this.state.token
        APIManager.delete(resource, id, deckId)
            .then(data => {
                this.getAll2(resource, token)
            })
    }



    // C R U D  FUNCTIONS END ==============================C R U D ====================END




    // AUTHENTICATION FUNCTIONS START ======================= AUTHENTICATION FUNCTIONS START ===========


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
                let token = localStorage.getItem("token")
                this.getAllWithToken("decks", token)
                this.getAllWithToken("cards", token)
                this.getUser("user-id", token)


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

                localStorage.setItem("token", tokenObj.token)
                localStorage.setItem("username", user.username)
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

    // AUTHENTICATION FUNCTIONS END =============================== AUTHENTICATION FUNCTIONS END ================




    //  C O N S O L E  L O G  FUNCTION =====================================

    consoleLog = () => {
        console.log("****** STATES APP LAYER START ******")
        console.log("TOKEN STATE", this.state.token)
        console.log("DECKS app layer: ", this.state.decks)
        console.log("CARDS", this.state.cards)
        console.log("USERS", this.state.users)
        // console.log("DECKNUMBA 2", this.state.decksNumba2)
        // console.log("users after fetch", this.state.users)
        // console.log("current User: ", this.state.currentUser)
        console.log("****** STATES APP LAYER END ******")


    }



    // =============================================R E N D E R ================================================

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
                    // CRUD
                    getCards={this.getCards}
                    getCardsById={this.getCardsById}
                    gottaGetEmAll={this.gottaGetEmAll}
                    getAllWithQuery={this.getAllWithQuery}
                    createButDontGet={this.createButDontGet}
                    getAll2={this.getAll2}
                    getAllWithToken={this.getAllWithToken}
                    createNew={this.createNew}
                    createNewCard={this.createNewCard}
                    deleteThis={this.deleteThis}
                    deleteThis2={this.deleteThis2}
                    deleteRelationship={this.deleteRelationship}
                    // FETCHED DATA
                    apiCards={this.state.apiCards}
                    cards={this.state.cards}
                    decks={this.state.decks}
                    users={this.state.users}
                    token={this.state.token}
                    cardsOfDeck={this.state.cardsOfDeck}
                    // CREATED DATA
                    findCurrentUser={this.findCurrentUser}
                    updateStates={this.updateStates}
                    postAuth={this.postAuth}
                    currentUser={this.state.currentUser}
                    // TRIGGER SWITCHES
                    woop={this.state.woop}
                    navBarStatus={this.state.navBarStatus}
                    cardsNumba2={this.state.cardsNumba2}
                    // STATE CHANGING FUNCTIONS
                />
            </React.Fragment>
        );
    }
}

export default App;
