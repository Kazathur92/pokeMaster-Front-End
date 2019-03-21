import React, { Component } from 'react'
import './navBarComponent.css'

export default class NavBar extends Component {

    render() {
        return (
            <React.Fragment>

                <nav className="navBar">
                    <button className="myDecksButton" onClick={this.props.clickOnMyDecks}>My Decks</button>
                    <button className="myCollectionButton" onClick={this.props.clickOnMyCollection}>My Card Collection</button>
                    <button className="searchButton" onClick={this.props.clickOnSearchPage}>Search Cards</button>
                </nav>

            </React.Fragment>
        )
    }
}