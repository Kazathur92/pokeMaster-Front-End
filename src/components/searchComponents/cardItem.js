import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY, rollIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import CardModal from './cardModal'
import './searchComponent.css'

const rollInAnimation = {
    rollIn: {
    animation: "1s",
    animationName: Radium.keyframes(rollIn, "rollIn")
  }
}

export default class CardItem extends Component {

    state = {
        selectedCard: {},
        modal: false,
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }


    viewCard = (card) => {
        this.setState({
            modal: true,
            selectedCard: card
        })
    }

    closeViewCard = () => {
        this.setState({
            modal: false
        })
    }

    consoleLog = () => {
        console.log(this.props.apiCards)
    }


    render() {

        let modal = ""

        if (this.state.modal) {
            modal = (
                <CardModal
                    closeViewCard={this.closeViewCard}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getAll2={this.props.getAll2}
                    editThis={this.props.editThis}
                    // DATA STATES
                    selectedCard={this.state.selectedCard}
                    decks={this.props.decks}
                    userDecks={this.props.userDecks}
                    users={this.props.users}
                    token={this.props.token}
                    cards={this.props.cards} />
            )
        } else {
            modal = null
        }

        let defaultView = ""
        let searchResults = ""

        if (this.props.defaultView) {
            searchResults = (
                <div className="resulstDiv">
                    <h5 className="results">Search Results will appear here.</h5>
                </div>
            )
        }

        else if (this.props.apiCards.length >= 1 && this.props.defaultView === false) {
            searchResults = (
                <React.Fragment>

                    {this.props.apiCards.map(card =>
                        <StyleRoot>
                        <div key={card.id} style={rollInAnimation.rollIn}  className="card">
                            <img className="cardViewImage" onClick={() => this.viewCard(card)} src={card.imageUrl}></img>
                            <p className="cardViewName">{card.name}</p>
                        </div>
                        </StyleRoot>
                        )

                    }

                </React.Fragment>
            )
        } else {
            searchResults = (<div><p className="noResults">There were no results found</p></div>)
        }

        return (

            <React.Fragment>

                {modal}
                {/* <button onClick={this.consoleLog}>console log</button> */}
                {defaultView}
                {searchResults}

            </React.Fragment>
        )
    }
}