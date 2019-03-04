import React, { Component } from 'react'
import CardModal from './cardModal'
import './searchComponent.css'

export default class CardItem extends Component {


    state = {
        selectedCard: {},
        modal: false
    }

    // THE CARDS FROM THE DB AND THE API HAD A STATE IN APP NAMED THE SAME

    componentDidMount(){

    }

    componentDidUpdate(prevProps){
        // if(this.props.apiCards !== prevProps.apiCards) {
        //     this.setState({
        //         selectedCard: this.props.cards[0]
        //     })
        // }

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
                closeViewCard={this.closeViewCard}
                createNew={this.props.createNew}
                decks={this.props.decks}
                editThis={this.props.editThis}/>
            )
        } else {
            modal = null
        }

        return (

            <React.Fragment>
                {modal}
                {this.props.apiCards.map(card =>

                    <div key={card.id} className="card">
                        <img className="cardViewImage" onClick={() => this.viewCard(card)} src={card.imageUrl}></img>
                        <p className="cardViewName">{card.name}</p>
                    </div>)

                }
            </React.Fragment>


        )



    }





}