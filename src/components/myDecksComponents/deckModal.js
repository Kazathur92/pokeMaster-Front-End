import React, { Component } from 'react'
import './viewDeck.css'
import APIManager from '../managerComponents/APIManager';



export default class DeckModal extends Component {

    state = {
        selectedDeck: {},
        cardsOfDeck: []
    }

    componentDidMount() {
        console.log("%%% DECK MODAL MOUNT %%%")

        this.setState({
                    selectedDeck: this.props.selectedDeck,
                    cardsOfDeck: this.props.cardsOfDeck
                })



    //     let token = localStorage.getItem("token")

    //    const waiter = () =>  new Promise((resolve, reject) => {

    //     return setTimeout(() => {
    //      this.setState({
    //         selectedDeck: this.props.selectedDeck
    //     })
    //     resolve()
    // })
    // })



        // // EITHER ADD A FIELD IN RELATIONSHIP MODEL THAT HOLDS THE INDIVIDUAL CARD ID SO YOU CAN MAKE A FETCH CALL HERE TO THE
        // // API AND GET ONLY THE CARDS WHERE THEIR IDS MATCH THOSE OF THE QUERY TO THE DATABASE
        // waiter().then(() => {
        // APIManager.getAll("deckcardsrelationship", token)
        //     .then(data => {
        //         // START OF AFTER GETTING ALL CARDS IN RELATIONSHIP
        //         let cardsOfDeck = []

        //         data.map(card => {
        //             // START OF RELATIONSHIP MAP
        //             console.log("CARD COMING FROM DATABASE RELATIONSHIP :", card)
        //             console.log("selected deck props", this.props.selectedDeck)
        //             if (card.deck === this.props.selectedDeck.url) {
        //                 // START OF IF
        //                 console.log("IF CARDS URL IS THE SAME AS SELECTED DECK URL", card)
        //                 this.props.getCardsById(card.cardId)
        //                     .then(card => {

        //                         new Promise((resolve, reject) => {
        //                             cardsOfDeck.push(card)
        //                             console.log("AFTER GETTING THE CARDS BY ID", card)
        //                             resolve()
        //                         })
        //                             .then(() => {
        //                                 this.setState({
        //                                     cardsOfDeck: cardsOfDeck
        //                                 })
        //                                 console.log("ITS WAITING")
        //                             })
        //                     })

        //                 // END OF IF
        //             }


        //             // END OF RELATIONSHIP MAP
        //         })


        //         // END OF .THEN AFTER GETTING ALL CARDS IN RELATIONSHIP
        //     })

        // })

        // END OF COMPONENT DID MOUNT
    }


    consoleLog = () => {
        console.log("USER CARDS", this.props.userCards)
        console.log("SELECTED DECK", this.props.selectedDeck)
        console.log("cards of deck state modal: ", this.state.cardsOfDeck)
        console.log("cards of deck props", this.props.cardsOfDeck)

        this.props.cardsOfDeck.map( card =>{
            console.log(card.card.imageUrl)
        })

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

                        {/* {
                            this.props.userCards.map(card =>
                                <div className="cardModalTrainerField">
                                    <img src={card.imageUrl} className="deckCard"></img>
                                    <p className="cardModalText">{card.name}</p>
                                    <p className="cardModalContentTitle">Rarity:&nbsp;{card.rarity}</p>
                                </div>


                            )
                        } */}


                        {
                            this.props.cardsOfDeck.map(card =>
                                <div className="cardModalTrainerField">
                                    <img src={card.card.imageUrl} className="deckCard"></img>
                                    <p className="cardModalText">{card.card.name}</p>
                                    <p className="cardModalContentTitle">Rarity:&nbsp;{card.card.rarity}</p>
                                </div>


                            )
                        }
                    </div>
                    <button onClick={this.props.closeViewDeck} className="modal-close is-large" aria-label="close"></button>
                </div>
            </React.Fragment >
        )
    }



}