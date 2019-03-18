import React, { Component } from 'react'


export default class EditDescription extends Component {


    state = {
        deckDescription: this.props.selectedDeck.description
    }


    render(){
        return(
            <React.Fragment>

            <input value={this.state.deckDescription}></input>


            </React.Fragment>


        )
    }
}