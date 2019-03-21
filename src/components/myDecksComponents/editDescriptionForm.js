import React, { Component } from 'react'
import { slideInDown, flipInX, headShake, fadeIn, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import './viewDeck.css'


// ========================ANIMATIONS====================

const fadeInAnimation = {
    fadeIn: {
      animation: "2s",
      animationName: Radium.keyframes(fadeIn, "fadeIn")
    }
  }

export default class EditDescription extends Component {

    state = {
        descriptionState: this.props.selectedDeck.description
    }

    handleDescriptionChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <React.Fragment>

                <StyleRoot>
                <div style={fadeInAnimation.fadeIn} className="editDescriptionDiv">
                    <textarea id="descriptionState" className="editDescriptionForm" value={this.state.descriptionState} onChange={this.handleDescriptionChange}></textarea>
                    <span className="icon Icons">
                        <i onClick={() => this.props.showWarningModalFromDescriptionForm(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                        <i onClick={this.props.closeEditDescriptionForm} className="fas fa-times IconTimes"></i>
                    </span>
                </div>
                </StyleRoot>

            </React.Fragment>


        )
    }
}