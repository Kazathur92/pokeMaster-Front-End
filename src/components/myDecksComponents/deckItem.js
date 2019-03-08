import React, { Component } from 'react'
import DeckModal from './deckModal'
import './viewDeck.css'

export default class DeckItem extends Component {

    state = {
        selectedDeck: {},
        modal: false,
        inspectField: false
    }

    viewDeck= (deck) => {
        // console.log(deck.target)
        this.setState({
            modal: true,
            selectedDeck: deck
        })
    }

    closeViewDeck = () => {
        this.setState({
            modal: false
        })
    }

    inspectIt = () => {
        this.setState({
            inspectField: true
        })
        console.log(this.state.inspectField)
    }

    dontInspectIt = (deck) => {
        this.setState({
            inspectField: false,
            selectedDeck: deck
        })
        console.log(this.state.inspectField)
    }

    // openDeck = () => {
    //     this.setState({
    //         modal: true
    //     })
    // }

    render() {


        let modal = ""

        if (this.state.modal) {
            modal = (
                <DeckModal
                    closeViewDeck={this.closeViewDeck}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getAll={this.props.getAll}
                    editThis={this.props.editThis}
                    // DATA STATES
                    selectedDeck={this.state.selectedDeck}
                    decks={this.props.decks}
                    userDecks={this.props.userDecks}
                    userCards={this.props.userCards}
                    users={this.props.users}
                    token={this.props.token}
                    cards={this.props.cards} />
            )
        } else {
            modal = null
        }


        let inspect = ""
        if(this.state.inspectField) {

            inspect = (
                <button  onClick={() => this.viewDeck(this.state.selectedDeck)}>inspect</button>
            )


        }
        else {
            inspect = null
        }


        let deckItem = ""

        if (this.props.userDecks) {

            deckItem = (
                <React.Fragment>
                    {modal}
                    {this.props.userDecks.map(deck =>

                        <div key={deck.id} >
                            <div className="card deckDiv" onMouseEnter={() => this.inspectIt(deck)} onMouseLeave={this.dontInspectIt}>
                                <div className="card-image" >
                                    <img className="deckCoverImage" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                </div>
                                <div className="">
                                    <div className="media">
                                        <div className="media-left">
                                            <img className="deckMVPImage" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                        </div>
                                        <div className="media-content">
                                            <p className="title deckMVP">MVP</p>
                                            <p className="subtitle deckSub">name of pokemon</p>
                                        </div>
                                    </div>
                                    <p className="deckName">{deck.name}</p>
                                    {inspect}
                                    <time className="deckDate" dateTime={deck.date_added}>created: {deck.date_added}</time>
                                    <button onClick={() => this.props.deleteThis2("decks", deck.id)}>delete</button>
                                    <button>edit</button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </React.Fragment>
            )


        } else {
            deckItem = (
                <div>
                    <p>You dont have any decks!</p>
                </div>
            )
        }





        return (
            <React.Fragment>
                {/* {
                    this.props.decks.map(deck =>
                        <div key={deck.id}>
                            <div className="card deckDiv">
                                <div className="card-image">
                                    <img className="deckCoverImage" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                </div>
                                <div className="">
                                    <div className="media">
                                        <div className="media-left">
                                            <img className="deckMVPImage" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                        </div>
                                        <div className="media-content">
                                            <p className="title deckMVP">MVP</p>
                                            <p className="subtitle deckSub">name of pokemon</p>
                                        </div>
                                    </div>
                                    <p className="deckName">{deck.name}</p>
                                    <time className="deckDate" dateTime={deck.date_added}>created: {deck.date_added}</time>
                                    <button onClick={() => this.props.deleteThis("decks", deck.id)}>delete</button>
                                    <button>edit</button>
                                </div>
                            </div>
                        </div>

                    )
                } */}

                {deckItem}
            </React.Fragment>
        )
    }


}


