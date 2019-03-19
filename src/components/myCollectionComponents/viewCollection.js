import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'
import './viewCollection.css'



export default class ViewMyCollection extends Component {

    state = {
        cards: [],
        woop: false
    }

    componentDidMount() {

    }

    componentDidUpdate = (prevProps) => {

    }



    consoleLog = () => {
        console.log("CARDS", this.props.cards)
        console.log("USER CARDS", this.props.userCards)
        console.log("CARDS")
    }

    render() {
        return (
            <React.Fragment>
                {/* <button onClick={this.consoleLog}>console log collection</button> */}
                <h1 className="cardCollectionTitle">CARD COLLECTION</h1>
                <div className="collectionDiv">
                <CollectionItem
                    cards={this.props.cards}
                    decks={this.props.decks}
                    deleteThis={this.props.deleteThis}
                    users={this.props.users}
                    createNewCard={this.props.createNewCard}
                    getAll2={this.props.getAll2}

                    />
                    </div>
            </React.Fragment>
        )
    }
}