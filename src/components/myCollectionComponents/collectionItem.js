import React, { Component } from 'react'
import CollectionCardList from './collectionCardList'

export default class CollectionItem extends Component {



    deleteThisFromCollection = (deck_id) => {
        // console.log("time to delete")
        this.props.deleteThis("cards", deck_id)

    }

    componentDidUpdate(prevProps) {
        if(this.props.userCards !== prevProps.userCards) {
            console.log("woopy!")
        }
    }





    render() {

        // console.log(this.props.userCards)

        let cardItem = ""

        if (this.props.userCards) {

            cardItem = <CollectionCardList userCards={this.props.userCards}
            deleteThisFromCollection={this.deleteThisFromCollection}/>

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