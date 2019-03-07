import React, { Component } from 'react'


export default class CollectionItem extends Component {









    render() {

        let cardItem = ""

        if (this.props.userCards) {

            cardItem = (
                <div>
                    {this.props.userCards.map(card =>

                        <div key={card.id}>
                            <p>{card.name}</p>
                            <img src={card.imageUrl}></img>
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
                {cardItem}
            </React.Fragment>


        )

    }


}