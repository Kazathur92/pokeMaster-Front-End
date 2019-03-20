import React, { Component } from 'react'


export default class CollectionCardList extends Component {

render() {

    // console.log("USER CARDS LIST COMPNENT: ", this.props.userCards)


return(
    <div className="collectionCardBigDiv">
    {this.props.cards.map(card =>
        <div className="colllectionCardDiv" key={card.id}>
        {console.log(card.id)}
            <img onClick={() => this.props.showCardModal(card)} className="collectionCardImage" src={card.imageUrl}></img>
            <p className="collectionCardName">{card.name}</p>
            <button onClick={() => this.props.deleteThis("cards", card.id)}>Remove from Collection</button>
        </div>
    )
    }
</div>
)


}

}