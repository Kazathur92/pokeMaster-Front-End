import React, { Component } from 'react'
import './viewDeck.css'


export default class EditTypes extends Component {


    state = {
        imageCover1: "",
        imageCover2: "",
        energyType1: "",
        energyType2: ""
    }

    selectImageCover1 = (event) => {
        console.log("IMAGE NAME", event[event.selectedIndex].id)
        this.setState({
            imageCover1: event[event.selectedIndex].value,
            energyType1: event[event.selectedIndex].id
        })
    }

    selectImageCover2 = (event) => {
        this.setState({
            imageCover2: event[event.selectedIndex].value,
            energyType2: event[event.selectedIndex].id
        })
    }


    consoleLog = () => {
        // console.log("WARNING MODAL STATE", this.state.warningModal)
    }


    render() {


        return (
            <React.Fragment>
                {/* {warningModalField} */}
                {/* <input id="name" className="editNameForm" value={this.state.name} onChange={this.handleNameChange}></input> */}
                <p className="energy1Tilte">First Predominant Energy:</p>
                <select onChange={(event) => this.selectImageCover1(event.target)} className="selectImageEdit">
                        <option className="option" value="https://bulma.io/images/placeholders/1280x960.png" name="">---------</option>
                        <option className="option"  value="/images/DarknessSymbol.jpg" key="woop" id="Darkness">Darkness</option>
                        <option className="option" value="/images/DragonSymbol.jpg" id="Dragon">Dragon</option>
                        <option className="option" value="/images/FairySymbol.jpg" id="Fairy">Fairy</option>
                        <option className="option" value="/images/FireSymbol.jpg" id="Fire">Fire</option>
                        <option className="option" value="/images/FightingSymbol.jpg" id="Fighting">Fighting</option>
                        <option className="option" value="/images/GrassSymbol.jpg" id="Grass">Grass</option>
                        <option className="option" value="/images/LightingSymbol.jpg" id="Lighting">Lighting</option>
                        <option className="option" value="/images/MetalSymbol.jpg" id="Metal">Metal</option>
                        <option className="option" value="/images/NormalSymbol.jpg" id="Normal">Normal</option>
                        <option className="option" value="/images/PsychicSymbol.jpg" id="Psychic">Psychic</option>
                        <option className="option" value="/images/WaterSymbol.jpg" id="Water">Water</option>
                    </select>
                    <p className="energy2Title">Secondary Predominant Energy:</p>
                    <select onChange={(event) => this.selectImageCover2(event.target)}  className="selectImageEdit">
                        <option className="option" value="https://bulma.io/images/placeholders/1280x960.png" id="">---------</option>
                        <option className="option" value="/images/DarknessSymbol.jpg" id="Darkness">Darkness</option>
                        <option className="option" value="/images/DragonSymbol.jpg" id="Dragon">Dragon</option>
                        <option className="option" value="/images/FairySymbol.jpg" id="Fairy">Fairy</option>
                        <option className="option" value="/images/FireSymbol.jpg" id="Fire">Fire</option>
                        <option className="option" value="/images/FightingSymbol.jpg" id="Fighting">Fighting</option>
                        <option className="option" value="/images/GrassSymbol.jpg" id="Grass">Grass</option>
                        <option className="option" value="/images/LightingSymbol.jpg" id="Lighting">Lighting</option>
                        <option className="option" value="/images/MetalSymbol.jpg" id="Metal">Metal</option>
                        <option className="option" value="/images/NormalSymbol.jpg" id="Normal">Normal</option>
                        <option className="option" value="/images/PsychicSymbol.jpg" id="Psychic">Psychic</option>
                        <option className="option" value="/images/WaterSymbol.jpg" id="Water">Water</option>
                    </select>
                <span className="icon Icons">
                    <i onClick={() => this.props.showWarningModalTypesForm(this.props.selectedDeck, this.state)} className="fas fa-check IconCheck"></i>
                    <i onClick={this.props.closeEditTypesForm} className="fas fa-times IconTimes"></i>
                </span>


            </React.Fragment>


        )
    }
}