import React, { Component } from 'react';
import APIManager from './components/managerComponents/APIManager'
import ViewCards from './components/cardsComponents/viewCards'
import NavBar from './components/nav-barComponent/navBar'
import './App.css';

class App extends Component {

  state = {
    cards: [],
    apiUrl: "http://localhost:8000/api/v1/",
    // pokeApi: "https://api.pokemontcg.io/v1/cards?name=charizard"
    pokeApi: "https://api.pokemontcg.io/v1",
    decksPage: false,
    collectionPage: false,
    searchPage: false,
  }


  componentDidMount() {
    //   this.getCards()
  }


  getCards = (keyword) => {
    APIManager.getThem(`${this.state.pokeApi}/cards?name=${keyword}`)
    .then(data => this.setState({ cards: data.cards }))
  }


setDecks = (decks) => {
  this.setState({
    decks: decks
  })
}


consoleLog = () => {
    console.log("Cards: ", this.state.cards)
    this.state.cards.map(function(index, current_value, array){
        console.log("index: ", index, current_value)
        }
    )
}


clickOnMyDecks = () => {
    this.setState({
        decksPage: true,
        collectionPage: false,
        searchPage: false,
    })
}


clickOnMyCollection = () => {
    this.setState({
        collectionPage: true,
        decksPage: false,
        searchPage: false,
    })
}

clickOnSearchPage = () => {
    this.setState({
        searchPage: true,
        decksPage: false,
        collectionPage: false,
    })
}



  render() {

    let searchCards = ""
    if(this.state.searchPage) {
        searchCards = (
            <ViewCards getCards={this.getCards} cards={this.state.cards}/>
        )
    } else {
        searchCards = null
    }

    return (
      <div className="appItself">
     <button onClick={this.consoleLog}>CONSOLE LOG</button>
     <h1 className="appName">POKEMASTER</h1>
     <NavBar clickOnSearchPage={this.clickOnSearchPage}
     clickOnMyDecks={this.clickOnMyDecks}
     clickOnMyCollection={this.clickOnMyCollection}
     />
     {searchCards}


      {/* <SearchDeck search={this.search}/> */}
       {/* <AllDecks
       decks={this.state.decks}
       getAll={this.getAll}
       delete={this.delete}
       edit={this.edit}
      //  setMovies={this.setMovies}
       /> */}
      {/* <AddDeckForm create={this.create}/> */}
     </div>
    );
  }
}

export default App;
