import React, { Component } from 'react'
import './searchComponent.css'


export default class SearchCard extends Component {

    state = {
        keyword: ""
    }


    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        console.log(this.state.keyword)
    }


    searchCard = () => {
        let keyword = this.state.keyword
        console.log(keyword)
        this.props.getCards(keyword)
    }


    render(){






        return(
            <React.Fragment>
                <h1 className="searchTitle">Search Cards</h1>
                <input id="keyword" onChange={this.handleFieldChange} placeholder="Card Name"></input>
                <button onClick={this.searchCard}>Search</button>


            </React.Fragment>



        )



    }


}

