import React, { Component } from 'react'


export default class CollectionItem extends Component {



render(){
    return(
        <React.Fragment>
            { this.props.cards.map( card =>

            <div key={card.id}>
            <p>{card.name}</p>
            <img src={card.imageUrl}></img>
            </div>

            )


            }


        </React.Fragment>
    )

}


}