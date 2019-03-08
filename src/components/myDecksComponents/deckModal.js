import React, { Component } from 'react'
import './viewDeck.css'



export default class DeckModal extends Component {

    componentDidMount = () => {
        this.setState({
            selectedCard: this.props.selectedDeck
        })
    }

    state = {
        selectedDeck: {}
    }

    consoleLog = () => {
        console.log("USER CARDS", this.props.userCards)
        console.log("SELECTED DECK", this.props.selctedDeck)
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal is-active">
                    <div className="modal-background" onClick={this.props.closeViewDeck}></div>
                    <div className="modal-content cardModal">
                        <h1 className="cardModalName">{this.state.selectedDeck.name}</h1>
                        <div className="cardModalContentField"></div>
                        <button onClick={this.consoleLog}>console Log</button>


                        { this.props.userCards.map( card =>
                        <div className="cardModalTrainerField">
                        <img src={card.imageUrl} className="deckCard"></img>
                            {/* <p className="cardModalContentTitle">Effect: </p> */}
                            <p className="cardModalText">{card.name}</p>
                            <p className="cardModalContentTitle">Rarity:&nbsp;{card.rarity}</p>
                    </div>


                        )}
                </div>
                <button onClick={this.props.closeViewDeck} className="modal-close is-large" aria-label="close"></button>
            </div>
        </React.Fragment >
    )
    }



}