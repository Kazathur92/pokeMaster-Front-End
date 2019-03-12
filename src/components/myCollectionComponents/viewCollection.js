import React, { Component } from 'react'
import CollectionItem from './collectionItem'
import APIManager from '../managerComponents/APIManager'
import './viewCollection.css'



export default class ViewMyCollection extends Component {

    state = {
        cards: [],
    }

    componentDidMount() {
        console.log("@@@ COLLECTION MOUNT @@@")
        let waiter = () => new Promise((resolve, reject) => {
            return setTimeout(() => {
                // this.props.findUserCards()
                this.props.findCurrentUser()
                console.log("current user in promise layer 1", this.props.currentUser)
                console.log("1st layer promise")
                resolve()
            })
        })
        waiter().then(() => {
            this.props.findUserCards()
            console.log("its breaking after finding users")
        }).catch(err => console.log("erroying", err))

    }

    componentDidUpdate = (prevProps) => {
    }

    consoleLog = () => {
        console.log("USER CARDS", this.props.userCards)
    }

    render() {
        return (
            <React.Fragment>
                {/* <button onClick={this.consoleLog}>console log collection</button> */}
                <h1>Card Collection</h1>
                <div className="collectionDiv">
                <CollectionItem
                    cards={this.props.cards}
                    userCards={this.props.userCards} />
                    </div>
            </React.Fragment>
        )
    }
}