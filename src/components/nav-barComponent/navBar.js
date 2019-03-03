import React, { Component } from 'react'
import './navBarComponent.css'


export default class NavBar extends Component {




render(){
    return(
        <React.Fragment>
        <nav className="navBar">
            <button onClick={this.props.clickOnMyDecks}>My Decks</button>
            <button onClick={this.props.clickOnMyCollection}>My Card Collection</button>
            <button onClick={this.props.clickOnSearchPage}>Search Cards</button>
        </nav>
        </React.Fragment>
    )
}

}