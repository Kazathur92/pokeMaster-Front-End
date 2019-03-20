import React, { Component } from 'react'


export default class EditDescription extends Component {


    state = {
        description: this.props.selectedDeck.description
    }

    handleDescriptionChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    render() {
        return (
            <React.Fragment>

                <input id="description" className="editDescriptionForm" value={this.state.description} onChange={this.handleDescriptionChange}></input>
                <span className="icon Icons">
                    <i onClick={() => this.props.showWarningModalFromDescriptionForm(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                    <i onClick={this.props.closeEditDescriptionForm} className="fas fa-times IconTimes"></i>
                </span>


            </React.Fragment>


        )
    }
}