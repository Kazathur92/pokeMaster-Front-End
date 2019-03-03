import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './searchComponent.css'



export default class CardModal extends Component {


    state = {
        attacks: [],
        resistances: [],
        weaknesses: [],
        // attacks2: []
    }

    componentDidMount() {
        this.setState({
            attacks: this.props.selectedCard.attacks
        })

        // this.props.selectedCard.attacks.map(
        //     attacks => {
        //         console.log(attacks)
        //         this.setState({
        //             attacks: [attacks]
        //         })
        //     }
        // )
    }

    consoleLog = () => {
        console.log(this.state.attacks)
        console.log(this.state.attacks2)
    }

    render() {

        return(
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.closeViewCard}></div>
                <div className="modal-content cardModal">
                <h1 className="cardModalName">{this.props.selectedCard.name}</h1>
                <div className="cardModalContentField">
                <img className="cardModalImage"src={this.props.selectedCard.imageUrlHiRes}></img>
                <div className="cardModalAttacksField">
                {/* <button onClick={this.consoleLog}>console log</button> */}
                <h3 className="cardModalAttacksTitle">Attacks: </h3>
                { this.state.attacks.map( attack =>
                <React.Fragment>
                <p key={attack.id} className="cardModalAttacks">{attack.name}</p>
                <p className="cardModalAttacksEnergyCost">Energy Cost: {attack.convertedEnergyCost}</p>
                <p className="cardModalAttacksText">{attack.text}</p>
                </React.Fragment>
                )
                }
                </div>
                </div>
                </div>
                <button onClick={this.props.closeViewCard} className="modal-close is-large" aria-label="close"></button>
            </div>



        )



    }


}