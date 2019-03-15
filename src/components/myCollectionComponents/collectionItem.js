import React, { Component } from 'react'
import CollectionCardList from './collectionCardList'

export default class CollectionItem extends Component {



    deleteThisFromCollection = (deck_id) => {
        // console.log("time to delete")
        this.props.deleteThis("cards", deck_id)

    }

    componentDidUpdate(prevProps) {
        if(this.props.cards !== prevProps.cards) {
            console.log("woopy!")
        }
    }





    render() {

        // console.log(this.props.userCards)

        let cardItem = ""

        if (this.props.cards) {

            cardItem = <CollectionCardList userCards={this.props.userCards}
            cards={this.props.cards}
            deleteThis={this.props.deleteThis}
            deleteThisFromCollection={this.deleteThisFromCollection}/>

        } else {
            cardItem = null
        }


        return (

            <React.Fragment>

                {cardItem}
            </React.Fragment>


        )

    }


}