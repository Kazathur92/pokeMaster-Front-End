import React, { Component } from 'react'
import './searchComponent.css'


export default class SearchPokemon extends Component {

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
        this.props.getPokemonCards(keyword)
    }


    render(){






        return(
            <React.Fragment>
                <h1 className="searchTitle">Search Pokemon Cards</h1>
                <div className="checkBoxes">
                <label className="checkboxLabel">BASIC<input type="checkbox" className="checkbox"></input></label>
                <label className="checkboxLabel">STAGE 1<input type="checkbox"></input></label>
                <label className="checkboxLabel">STAGE 2<input type="checkbox"></input></label>

                <label className="checkboxLabel"><p>EX</p><input type="checkbox" className="checkbox"></input></label>
                <label className="checkboxLabel"><p>MEGA</p><input type="checkbox"></input></label>
                <label className="checkboxLabel"><p>GX</p><input type="checkbox"></input></label>

                <label className="checkboxLabel">LEVEL UP<input type="checkbox"></input></label>
                <label className="checkboxLabel">BREAK<input type="checkbox"></input></label>
                </div>
                <input id="keyword" onChange={this.handleFieldChange} placeholder="Card Name"></input>
                <button onClick={this.searchCard}>Search</button>


            </React.Fragment>



        )



    }


}

