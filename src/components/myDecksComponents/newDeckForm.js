import React, { Component } from 'react';
import './viewDeck.css'

let userId = sessionStorage.getItem("id")

export default class NewDeckForm extends Component {

    state = {
        name: "",
        description: "",
        strategy: "",
        date_added: "",
        deleted_on: "",
        cardAmount: 0,
        maxCardAmmount: 60,
        user: this.props.users.url,
        imageCover1: "https://bulma.io/images/placeholders/1280x960.png",
        imageCover2: "https://bulma.io/images/placeholders/1280x960.png"
    }

    componentDidMount() {
        console.log("#### DID MOUNT DECK FORM START ####")
        this.makeDate()
        this.setState({
            user: this.props.users.url
        })
        console.log("#### DID MOUNT DECK FORM END  ####")
    }

    componentDidUpdate(prevProps) {
        if (this.props.decks !== prevProps.decks) {
            this.makeDate()
        }
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    createDeck = (resource) => {
        //   this.props.createButDontGet(resource, this.state)

        if(this.state.imageCover1 === "" || this.state.imageCover1 === "https://bulma.io/images/placeholders/1280x960.png") {
            alert("A DECK MUST HAVE AT LEAST 1 TYPE OF ENERGY")
        }

        else if (this.state.imageCover2 === "https://bulma.io/images/placeholders/1280x960.png" || this.state.imageCover2 === "") {

            new Promise((resolve, reject) => { this.setState({
                imageCover2: ""
            })
            resolve()
        })
            .then(() => {
                console.log("PROMISE 2nd LAYER")
            this.props.createNewDeck(resource, this.state)
        })
            .then(() => {
                console.log("PROMISE 3rd LAYER")
                new Promise((resolve, reject) => {
                    this.setState({
                        name: "",
                        description: "",
                        strategy: "",
                        date_added: "",
                        deleted_on: "",
                        cardAmount: 0,
                        maxCardAmmount: 60,
                        user: this.props.users.url,
                        imageCover1: this.state.imageCover1,
                        imageCover2: "https://bulma.io/images/placeholders/1280x960.png"
                    })
                    resolve()
                })
            })
            .then(() => {
                console.log("FOURTH LAYER DOWN")
                this.props.getAll2(resource)
            })

    } else {


        this.props.createNewDeck(resource, this.state)
            .then(() => {
                new Promise((resolve, reject) => {
                    this.setState({
                        name: "",
                        description: "",
                        strategy: "",
                        date_added: "",
                        deleted_on: "",
                        cardAmount: 0,
                        maxCardAmmount: 60,
                        user: this.props.users.url,
                        imageCover1: this.state.imageCover1,
                        imageCover2: this.state.imageCover2
                    })
                    resolve()
                })
            })
            .then(() => {
                console.log("THIRD LAYER DOWN")
                this.props.getAll2(resource)
            })
        }
    }

    makeDate = () => {

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        // today = mm + '-' + dd + '-' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;

        this.setState({
            date_added: today
        })
    }

    selectImageCover1 = (event) => {
        console.log("WOOP", event.target.value)
        this.setState({
            imageCover1: event.target.value
        })
    }

    selectImageCover2 = (event) => {
        console.log("WOOP", event.target.value)
        this.setState({
            imageCover2: event.target.value
        })
    }

    consoleLog = () => {
        console.log("date_added state", this.state.date_added)
        console.log("deleted on state", this.state.deleted_on)
        console.log("name state", this.state.name)
        console.log("desc state", this.state.description)
        console.log("strat", this.state.strategy)
        console.log("current user props", this.props.currentUser)
        console.log("STATES", this.state)
    }

    render() {
        return (
            <React.Fragment>
                <div className="newDeckFields">
                    {/* <button onClick={this.props.hideCreateDeckForm}>^</button> */}
                    <h3 className="viewDecksTitle">Add a new deck to the collection!</h3>
                    <label for="name">Deck Name: <input name="name" id="name" type="text" placeholder="deck title" value={this.state.name} onChange={this.handleFieldChange}></input></label>

                    <div className="newDeckDescriptionAndStrategy">
                        <label for="description">Deck Description: </label>
                        <textarea name="description" id="description" rows="4" cols="50" type="text" placeholder="Notes about this Deck" value={this.state.description} onChange={this.handleFieldChange}></textarea>
                        <label for="strategy">Deck Strategy: </label>
                        <textarea name="strategy" id="strategy" rows="4" cols="50" type="text" placeholder="How is this deck played?" value={this.state.strategy} onChange={this.handleFieldChange}></textarea>
                    </div>
                    <p className="predominantEnergy">Predominant Energy: </p>
                    <select onChange={this.selectImageCover1}  className="selectImage">
                        <option value="https://bulma.io/images/placeholders/1280x960.png">---------</option>
                        <option value="/images/DarknessSymbol.jpg">Darkness</option>
                        <option value="/images/DragonSymbol.jpg">Dragon</option>
                        <option value="/images/FairySymbol.jpg">Fairy</option>
                        <option value="/images/FireSymbol.jpg">Fire</option>
                        <option value="/images/FightingSymbol.jpg">Fighting</option>
                        <option value="/images/GrassSymbol.jpg">Grass</option>
                        <option value="/images/LightingSymbol.jpg">Lighting</option>
                        <option value="/images/MetalSymbol.jpg">Metal</option>
                        <option value="/images/NormalSymbol.jpg">Normal</option>
                        <option value="/images/PsychicSymbol.jpg">Psychic</option>
                        <option value="/images/WaterSymbol.jpg">Water</option>
                    </select>
                    <p className="secondaryPredominantEnergy">Secondary Predominant Energy:</p>
                    <select onChange={this.selectImageCover2}  className="selectImage">
                        <option value="https://bulma.io/images/placeholders/1280x960.png">---------</option>
                        <option value="/images/DarknessSymbol.jpg">Darkness</option>
                        <option value="/images/DragonSymbol.jpg">Dragon</option>
                        <option value="/images/FairySymbol.jpg">Fairy</option>
                        <option value="/images/FireSymbol.jpg">Fire</option>
                        <option value="/images/FightingSymbol.jpg">Fighting</option>
                        <option value="/images/GrassSymbol.jpg">Grass</option>
                        <option value="/images/LightingSymbol.jpg">Lighting</option>
                        <option value="/images/MetalSymbol.jpg">Metal</option>
                        <option value="/images/NormalSymbol.jpg">Normal</option>
                        <option value="/images/PsychicSymbol.jpg">Psychic</option>
                        <option value="/images/WaterSymbol.jpg">Water</option>
                    </select>
                    <div className="predominantEnergiesDiv">
                    <img className="deckImage" src={`${this.state.imageCover1}`}></img>
                    <img className="deckImage" src={`${this.state.imageCover2}`}></img>
                    </div>
                    <button className="saveDeckButton" onClick={() => this.createDeck("decks")}>Save Deck</button>
                    {/* <button onClick={this.consoleLog}>check states</button> */}
                </div>
            </React.Fragment>
        )
    }
}