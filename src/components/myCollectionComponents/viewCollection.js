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
        console.log("USER CARDS", this.props.cards)
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.consoleLog}>console log collection</button>
                <h1>Card Collection</h1>
                <div className="collectionDiv">
                <CollectionItem
                    cards={this.props.cards}
                    deleteThis={this.props.deleteThis}

                    />
                    </div>
            </React.Fragment>
        )
    }
}