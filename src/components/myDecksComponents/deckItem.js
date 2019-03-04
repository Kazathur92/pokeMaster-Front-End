import React, { Component } from 'react'
import './viewDeck.css'

export default class DeckItem extends Component {



render() {
    return(
        <React.Fragment>
        {
            this.props.decks.map(deck =>
                <div key={deck.id}>
                    <div className="card deckDiv">
                        <div className="card-image">
                            {/* <figure className="image is-4by3"> */}
                                <img className="deckCoverImage" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                            {/* </figure> */}
                        </div>
                        <div className="">
                            <div className="media">
                                <div className="media-left">
                                    {/* <figure className="image is-48x48"> */}
                                        <img className="deckMVPImage" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                    {/* </figure> */}
                                </div>
                                <div className="media-content">
                                    <p className="title deckMVP">MVP</p>
                                    <p className="subtitle deckSub">name of pokemon</p>
                                </div>
                            </div>

                            {/* <div className="content"> */}
                            <p className="deckName">{deck.name}</p>
                                <time className="deckDate" dateTime={deck.date_added}>created: {deck.date_added}</time>
                            {/* </div> */}
                        </div>
                    </div>
                </div>

            )
        }
        </React.Fragment>
    )
}


}


