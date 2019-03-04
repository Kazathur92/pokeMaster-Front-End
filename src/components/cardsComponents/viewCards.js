import React, { Component } from 'react'
import CardItem from "./cardItem"
import SearchCard from "./searchCard"
import './searchComponent.css'



export default class ViewCards extends Component {

    render() {
        return (
            <React.Fragment>

                <SearchCard getCards={this.props.getCards} />
                <div className="cardDiv">
                    <CardItem
                    cards={this.props.cards}
                    apiCards={this.props.apiCards}
                    createNew={this.props.createNew}
                    decks={this.props.decks}
                    editThis={this.props.editThis}/>
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