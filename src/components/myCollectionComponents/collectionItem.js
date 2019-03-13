import React, { Component } from 'react'


export default class CollectionItem extends Component {



deleteThisFromCollection = (deck_id) => {
    console.log("time to delete")
    this.props.deleteThis("cards", deck_id)
}





    render() {

        let cardItem = ""

        if (this.props.userCards) {

            cardItem = (
                <div className="collectionCardBigDiv">
                    {this.props.userCards.map(card =>

                        <div className="colllectionCardDiv" key={card.id}>
                            <img className="collectionCardImage" src={card.imageUrl}></img>
                            <p className="collectionCardName">{card.name}</p>
                            <button onClick={() => this.deleteThisFromCollection(card.id)}>Remove from Collection</button>
                        </div>
                    )
                    }
                </div>
            )
        } else {
            cardItem = null
        }




        const cardsExist = this.props.userCards

        return (

            <React.Fragment>
                {/* <div>
                    {this.props.userCards.map(card =>

                        <div key={card.id}>
                            <p>{card.name}</p>
                            <img src={card.imageUrl}></img>
                        </div>
                    )
                    }
                </div> */}
                {cardItem}
            </React.Fragment>


        )

    }


}