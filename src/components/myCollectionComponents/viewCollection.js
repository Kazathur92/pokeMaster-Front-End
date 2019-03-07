import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'



export default class ViewMyCollection extends Component {

    state = {
        cards: [],
    }

    componentDidMount() {

    }

    componentDidUpdate = (prevProps) => {
    }

    consoleLog = () => {
        console.log("USER CARDS", this.props.userCards)
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={this.consoleLog}>console log</button>
                <h1>Card Collection</h1>
                <CollectionItem
                cards={this.props.cards}
                userCards={this.props.userCards}/>
            </React.Fragment>
        )
    }
}