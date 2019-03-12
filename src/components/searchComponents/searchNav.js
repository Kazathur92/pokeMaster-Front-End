import React, { Component } from 'react'
import './searchComponent.css'



export default class SearchNav extends Component {

    // IF AT SOME POINT I WANT TO ONLY HAVE POKEMON AND TRAINER SEARCH BUT ADD CHECK BOXES ON SEARCH TRAINER
    // THAT WILL FILTER BY ITEM, SUPPORTER OR STADIUM, OR IF STATEMENTS THAT DO A QUERY BASED ON WHICH CHECKBOX
    // IS CHECKED
    state = {

    }










render() {

    return(
        <nav className="searchNav">
            <button onClick={this.props.clickedOnAll}>All</button>
            <button onClick={this.props.clickedOnPokemon}>Pokemon</button>
            <button onClick={this.props.clickedOnTrainer}>Trainer</button>
            <button onClick={this.props.clickedOnEnergy}>Energy</button>
        </nav>
    )
}


}