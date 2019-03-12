import React, { Component } from 'react'
import './searchComponent.css'


export default class SearchTrainer extends Component {

    state = {
        keyword: ""
    }


    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        // console.log(this.state.keyword)
    }


    searchCard = () => {
        let keyword = this.state.keyword
        // console.log(keyword)
        this.props.getTrainerCards(keyword)
    }


    render(){






        return(
            <React.Fragment>
                <h1 className="searchTitle">Search Trainer Cards</h1>
                <div className="checkBoxes">
                <label className="checkboxLabel">ITEM <input type="checkbox" className="checkbox"></input></label>
                <label className="checkboxLabel">SUPPORTER <input type="checkbox"></input></label>
                <label className="checkboxLabel">STADIUM <input type="checkbox"></input></label>
                </div>
                <input id="keyword" onChange={this.handleFieldChange} placeholder="Card Name"></input>
                <button onClick={this.searchCard}>Search</button>


            </React.Fragment>



        )



    }


}

