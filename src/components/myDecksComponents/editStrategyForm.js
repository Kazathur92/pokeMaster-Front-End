import React, { Component } from 'react'


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

                <input id="strategy" className="editNameForm" value={this.state.strategy} onChange={this.handleStrategyChange}></input>
                <span className="icon Icons">
                    <i onClick={() => this.props.showWarningModalStrategyForm(this.state, this.props.selectedDeck)} className="fas fa-check IconCheck"></i>
                    <i onClick={this.props.closeEditNameForm} className="fas fa-times IconTimes"></i>
                </span>


            </React.Fragment>


        )
    }
}