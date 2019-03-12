import React, { Component } from 'react'
import './searchComponent.css'


export default class SearchEnergy extends Component {

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
        this.props.getEnergyCards(keyword)
    }


    render(){






        return(
            <React.Fragment>
                <h1 className="searchTitle">Search Energy Cards</h1>
                <div className="checkBoxes">
                <label className="checkboxLabel">BASIC <input type="checkbox" className="checkbox"></input></label>
                <label className="checkboxLabel">SPECIAL <input type="checkbox"></input></label>
                </div>
                <input id="keyword" onChange={this.handleFieldChange} placeholder="Card Name"></input>
                <button onClick={this.searchCard}>Search</button>


            </React.Fragment>



        )



    }


}

