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

export default class EditStrategy extends Component {

    state = {
        strategy: this.props.selectedDeck.strategy
    }

    handleStrategyChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <React.Fragment>

            <StyleRoot>
            <div style={fadeInAnimation.fadeIn} className="editStrategyDiv">
                <textarea id="strategy" className="editStrategyForm" value={this.state.strategy} onChange={this.handleStrategyChange}></textarea>
                <span className="icon Icons">
                    <i onClick={() => this.props.showWarningModalStrategyForm(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                    <i onClick={this.props.closeEditStrategyForm} className="fas fa-times IconTimes"></i>
                </span>
                </div>
                </StyleRoot>


            </React.Fragment>


        )
    }
}