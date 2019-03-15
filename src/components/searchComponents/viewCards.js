import React, { Component } from 'react'
import SearchAll from "./searchAll"
import SearchNav from "./searchNav"
import SearchPokemon from "./searchPokemon"
import SearchTrainer from "./searchTrainer"
import SearchEnergy from "./searchEnergy"
import CardItem from "./cardItem"
import './searchComponent.css'



export default class ViewCards extends Component {

    state = {
        // TRIGGER SWITCHES
        defaultView: true,

        // Nav Selector
        all: true,
        byPokemon: false,
        byTrainer: false,
        byEnergy: false,


        // bySupporter: false,
        // byItem: false,
        // byStadium: false,


    }


    componentDidMount() {
        console.log("&&& SEARCH MOUNT &&&")
    }

    componentDidUpdate() {

    }

    loadCards = () => {
        this.setState({
            defaultView: false,
        })
    }


    clickedOnAll = () => {
        this.setState({
            all: true,
            byPokemon: false,
            byTrainer: false,
            byEnergy: false,
        })
    }

    clickedOnPokemon = () => {
        this.setState({
            all: false,
            byPokemon: true,
            byTrainer: false,
            byEnergy: false,
        })
    }

    clickedOnTrainer = () => {
        this.setState({
            all: false,
            byPokemon: false,
            byTrainer: true,
            byEnergy: false,
        })
    }

    clickedOnEnergy = () => {
        this.setState({
            all: false,
            byPokemon: false,
            byTrainer: false,
            byEnergy: true,
        })

    }






    consoleLog = () => {

    }

    render() {


        let searchAll = ""

        if(this.state.all) {
            searchAll = (
                <SearchAll
                gottaGetEmAll={this.props.gottaGetEmAll}
                loadCards={this.loadCards}
                />
            )
        } else {
            searchAll = null
        }


        let searchPokemon = ""

        if(this.state.byPokemon) {
            searchPokemon = (
                <SearchPokemon />
            )
        } else {
            searchPokemon = null
        }

        let searchTrainer = ""

        if(this.state.byTrainer) {
            searchTrainer = (
                <SearchTrainer />
            )
        } else {
            searchTrainer = null
        }

        let searchEnergy = ""

        if(this.state.byEnergy) {
            searchEnergy = (
                <SearchEnergy />
            )
        } else {
            searchEnergy = null
        }




        return (
            <React.Fragment>

                {/* <SearchNav
                all={this.state.all}
                byPokemon={this.state.byPokemon}
                byTrainer={this.state.byTrainer}
                byEnergy={this.state.byTrainer}

                clickedOnAll={this.clickedOnAll}
                clickedOnPokemon={this.clickedOnPokemon}
                clickedOnTrainer={this.clickedOnTrainer}
                clickedOnEnergy={this.clickedOnEnergy}
                /> */}

                {searchAll}
                {/* {searchPokemon} */}
                {/* {searchTrainer} */}
                {/* {searchEnergy} */}

                <div className="cardDiv">
                    <CardItem
                    cards={this.props.cards}
                    apiCards={this.props.apiCards}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    decks={this.props.decks}
                    userDecks={this.props.userDecks}
                    editThis={this.props.editThis}
                    users={this.props.users}
                    token={this.props.token}
                    defaultView={this.state.defaultView}
                    getAll2={this.props.getAll2}/>
                </div>

             </React.Fragment>
        )
    }
}