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

export default class EditName extends Component {

    state = {
        nameState: this.props.selectedDeck.name,
    }

    handleNameChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    consoleLog = () => {
        console.log("WARNING MODAL STATE", this.state.warningModal)
    }


    render() {


        return (
            <React.Fragment>

                <StyleRoot>
                    <div style={fadeInAnimation.fadeIn} className="editNameDiv">
                        <input id="nameState" className="editNameForm" value={this.state.nameState} onChange={this.handleNameChange}></input>
                        <span className="icon Icons">
                            <i onClick={() => this.props.showWarningModal(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                            <i onClick={this.props.closeEditNameForm} className="fas fa-times IconTimes"></i>
                        </span>
                    </div>
                </StyleRoot>


            </React.Fragment>


        )
    }
}