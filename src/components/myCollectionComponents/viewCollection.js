import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'



export default class ViewMyCollection extends Component {

    state = {
        cards: []
    }

    componentDidMount() {
        APIManager.getAll("cards")
        .then(data => {
            console.log("card list", data)
            this.setState({ cards: data })
        })
    }

    consoleLog = () => {
        console.log(this.state.cards)
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={this.consoleLog}>console log</button>
                <h1>Card Collection</h1>
                <CollectionItem
                cards={this.state.cards}/>
            </React.Fragment>
        )
    }
}