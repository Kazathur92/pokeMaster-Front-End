import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'



export default class ViewMyCollection extends Component {

    state = {
        cards: [],
        userCards: []
    }

    componentDidMount() {
        // let token = localStorage.getItem("token")
        // APIManager.getAll("cards", token)
        // .then(data => {
        //     console.log("card list", data)
        //     this.setState({ cards: data })
        // })
        this.props.cards.forEach( card => {
        if(card.user === this.props.currentUser.url){
            console.log("CURRENT USER COMP DID MOUNT VIEW COLLE LEVEL: ", this.props.currentUser.url)
            console.log("card user url", card.user)
            this.setState({
                userCards: card
            })
        } else {
            console.log("OOPSIE")
        }
    })
    }

    consoleLog = () => {
        console.log(this.state.userCards)
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={this.consoleLog}>console log</button>
                <h1>Card Collection</h1>
                <CollectionItem
                cards={this.props.cards}
                userCards={this.state.userCards}/>
            </React.Fragment>
        )
    }
}