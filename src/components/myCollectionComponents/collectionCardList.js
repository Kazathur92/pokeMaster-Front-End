import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY, rollIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import './viewCollection.css'



// ========================ANIMATIONS========================

const flipInAnimation = {
    flipInX: {
      animation: "1s",
      animationName: Radium.keyframes(flipInX, "flipInX")
    }
  }

const flipInYAnimation = {
    flipInY: {
      animation: "1s",
      animationName: Radium.keyframes(flipInY, "flipInY")
    }
  }

const rollInAnimation = {
    rollIn: {
    animation: "1s",
    animationName: Radium.keyframes(rollIn, "rollIn")
  }
}


export default class CollectionCardList extends Component {

    render() {

        return (

            <StyleRoot>
            <div className="collectionCardBigDiv">
                {this.props.cards.map(card =>
                    <div style={rollInAnimation.rollIn}  className="colllectionCardDiv" key={card.id}>
                        <img onClick={() => this.props.showCardModal(card)} className="collectionCardImage" src={card.imageUrl}></img>
                        <p className="collectionCardName">{card.name}</p>

                        <button onClick={() => this.props.deleteThis("cards", card.id)}>Remove from Collection</button>
                    </div>

                )
            }
            </div>
            </StyleRoot>

        )
    }
}