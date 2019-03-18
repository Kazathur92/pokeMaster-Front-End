import React, { Component } from 'react'


export default class EditStrategy extends Component {


    state = {
        deckStrategy: this.props.selectedDeck.strategy
    }


    render(){
        return(
            <React.Fragment>

            <input className="editDescriptionForm" value={this.state.deckStrategy}></input>


            </React.Fragment>


        )
    }
}