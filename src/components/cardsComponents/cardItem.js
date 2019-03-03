import React, { Component } from 'react'
import CardModal from './cardModal'
import './searchComponent.css'

export default class CardItem extends Component {


    state = {
        selectedCard: {},
        modal: false
    }


    viewCard = (card) => {
        this.setState({
            modal:true,
            selectedCard: card
        })
    }

    closeViewCard = () => {
        this.setState({
            modal: false
        })
    }


    render() {

        let modal =""

        if(this.state.modal) {
            modal = (
                <CardModal
                selectedCard={this.state.selectedCard}
                closeViewCard={this.closeViewCard}/>
            )
        } else {
            modal = null
        }

        return (

            <React.Fragment>
                {modal}
                {this.props.cards.map(card =>

                    <div key={card.id} className="card">
                        <img className="cardViewImage" onClick={() => this.viewCard(card)} src={card.imageUrl}></img>
                        <p className="cardViewName">{card.name}</p>
                    </div>)

                }
            </React.Fragment>


        )



    }





}