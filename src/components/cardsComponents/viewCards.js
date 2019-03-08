import React, { Component } from 'react'
import CardItem from "./cardItem"
import SearchCard from "./searchCard"
import './searchComponent.css'



export default class ViewCards extends Component {

    componentDidMount() {
        console.log("&&& SEARCH MOUNT &&&")
        this.props.findUserDecks()
    }

    render() {
        return (
            <React.Fragment>

                <SearchCard getCards={this.props.getCards} />
                <div className="cardDiv">
                    <CardItem
                    cards={this.props.cards}
                    apiCards={this.props.apiCards}
                    createNew={this.props.createNew}
                    createNewCard={this.props.createNewCard}
                    getAll={this.props.getAll}
                    decks={this.props.decks}
                    userDecks={this.props.userDecks}
                    editThis={this.props.editThis}
                    users={this.props.users}
                    token={this.props.token}/>
                </div>


                {/* <input id="keyword" onChange={this.handleFieldChange} placeholder="name of pokeman"></input>
                <button onClick={this.searchCard}>Search</button>
                {this.props.cards.map(card =>

                    <div key={card.id} className="card">
                        <img src={card.imageUrl}></img>
                        <h2>{card.name}</h2>
                    </div>)

                } */}

             </React.Fragment>
        )
    }
}