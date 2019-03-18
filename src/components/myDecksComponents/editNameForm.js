import React, { Component } from 'react'
import './viewDeck.css'


export default class EditName extends Component {


    state = {
        name: this.props.selectedDeck.name,
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
                {/* {warningModalField} */}
                <input id="name" className="editNameForm" value={this.state.name} onChange={this.handleNameChange}></input>
                <span className="icon Icons">
                    <i onClick={() => this.props.showWarningModal(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                    <i onClick={this.props.closeEditForm} className="fas fa-times IconTimes"></i>
                </span>


            </React.Fragment>


        )
    }
}