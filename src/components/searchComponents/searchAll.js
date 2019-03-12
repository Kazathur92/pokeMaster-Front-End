import React, { Component } from 'react'
import './searchComponent.css'


export default class SearchAll extends Component {

    state = {
        keyword: "",
        checked: false,
        noFiltersCheckbox: true,
        // Pokemon Checkboxes
        basicCheckbox: false,
        stage1Checkbox: false,
        stage2Checkbox: false,
        levelUpCheckbox: false,
        exCheckbox: false,
        gxCheckbox: false,
        megaCheckbox: false,
        breakCheckbox: false,


        // Trainer Checkboxes
        itemCheckbox: false,
        supporterCheckbox: false,
        stadiumCheckbox: false,

        // Energy Checkboxes
        specialCheckbox: false
    }


    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        // console.log(this.state.keyword)
    }

    handleCheckboxChange = (event) => {

        if (event.target.id === "no filters") {
            this.setState({
                noFiltersCheckbox: true,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false
            })
        }
        // console.log(event.target.id)
        else if (event.target.id === "basic") {
            console.log("this one is basic")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: true,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false
            })
        }

        else if (event.target.id === "stage 1") {
            console.log("this one is stage 1")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: true,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })

        }

        else if (event.target.id === "stage 2") {
            console.log("this one is stage 2")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: true,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })

        }

        else if (event.target.id === "ex") {
            console.log("this one is ex")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: true,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "mega") {
            console.log("this one is mega")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: true,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "gx") {
            console.log("this one is gx")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: true,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "level up") {
            console.log("this one is level up")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: true,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "break") {
            console.log("this one is break")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: true,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "item") {
            console.log("this one is item")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: true,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }
        else if (event.target.id === "tool") {
            console.log("this one is tool")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: true,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }
        else if (event.target.id === "supporter") {
            console.log("this one is supporter")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: true,
                stadiumCheckbox: false,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "stadium") {
            console.log("this one is stadium")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: true,
                basicEnergyCheckbox: false,
                specialCheckbox: false

            })
        }

        else if (event.target.id === "special") {
            console.log("this one is special")
            this.setState({
                noFiltersCheckbox: false,
                basicCheckbox: false,
                stage1Checkbox: false,
                stage2Checkbox: false,
                exCheckbox: false,
                megaCheckbox: false,
                gxCheckbox: false,
                levelUpCheckbox: false,
                breakCheckbox: false,
                itemCheckbox: false,
                toolCheckbox: false,
                supporterCheckbox: false,
                stadiumCheckbox: false,
                specialCheckbox: true

            })
        }


    }


    searchCard = () => {
        let keyword = this.state.keyword
        // console.log(keyword)
        this.props.getCards(keyword)
    }



    searchIt = () => {
        let keyword = this.state.keyword
        let subtype = ""
        if (this.state.basicCheckbox) {
            subtype = "basic"
        }

        else if (this.state.stage1Checkbox) {
            subtype = "stage%201"
        }

        else if (this.state.stage2Checkbox) {
            subtype = "stage%202"

        }
        else if (this.state.exCheckbox) {
            subtype = "ex"

        }
        else if (this.state.megaCheckbox) {
            subtype = "mega"

        }
        else if (this.state.gxCheckbox) {
            subtype = "gx"

        }
        else if (this.state.levelUpCheckbox) {
            subtype = "level%20up"

        }
        else if (this.state.breakCheckbox) {
            subtype = "break"

        }
        else if (this.state.itemCheckbox) {
            subtype = "item"

        }
        else if (this.state.toolCheckbox) {
            subtype = "pokemon%20tool"

        }
        else if (this.state.supporterCheckbox) {
            subtype = "supporter"

        }
        else if (this.state.stadiumCheckbox) {
            subtype = "stadium"

        }
        else if (this.state.specialCheckbox) {
            subtype = "special"

        }
        console.log("subtype: ", subtype)
        this.props.loadCards()
        this.props.gottaGetEmAll(subtype, keyword)
    }


    consoleLog = () => {
        console.log(this.state.checked)
    }


    render() {

        return (
            <React.Fragment>
                <h1 className="searchTitle">Search Cards</h1>
                <div className="checkboxContainer">
                    <h6 className="filterLabel">Pokemon</h6>
                    <div className="checkboxPokemonDiv">

                        <label className="checkboxLabel"><p className="checkboxTitle">BASIC</p><input type="checkbox" id="basic" checked={this.state.basicCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">STAGE 1</p><input id="stage 1" type="checkbox" checked={this.state.stage1Checkbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">STAGE 2</p><input id="stage 2" type="checkbox" checked={this.state.stage2Checkbox}
                            onClick={this.handleCheckboxChange}></input></label>

                        <label className="checkboxLabel"><p className="checkboxTitle">EX</p><input type="checkbox" id="ex" checked={this.state.exCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">MEGA</p><input type="checkbox" id="mega" checked={this.state.megaCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">GX</p><input type="checkbox" id="gx" checked={this.state.gxCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>

                        <label className="checkboxLabel"><p className="checkboxTitle">LEVEL UP</p><input id="level up" type="checkbox" checked={this.state.levelUpCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">BREAK</p><input id="break" type="checkbox" checked={this.state.breakCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>

                    </div>
                    <h6 className="filterLabel">Trainer</h6>
                    <div className="checkboxTrainerDiv">
                        <label className="checkboxLabel"><p className="checkboxTitle">ITEM</p><input id="item" type="checkbox" className="checkbox" checked={this.state.itemCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">TOOL</p><input id="tool" type="checkbox" className="checkbox" checked={this.state.toolCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">SUPPORTER</p><input id="supporter" type="checkbox" checked={this.state.supporterCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">STADIUM</p><input id="stadium" type="checkbox" checked={this.state.stadiumCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>

                    </div>
                    <h6 className="filterLabel">Energy</h6>
                    <div className="checkboxEnergyDiv">
                        <label className="checkboxLabel"><p className="checkboxTitle">SPECIAL</p><input id="special" type="checkbox" checked={this.state.specialCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>
                        <label className="checkboxLabel"><p className="checkboxTitle">NO FILTERS</p><input id="no filters" type="checkbox"  checked={this.state.noFiltersCheckbox}
                            onClick={this.handleCheckboxChange}></input></label>

                    </div>
                </div>
                <input id="keyword" onChange={this.handleFieldChange} placeholder="Card Name"></input>
                {/* <button onClick={this.searchCard}>Search</button> */}
                <button onClick={this.searchIt}>Search</button>


            </React.Fragment>
        )
    }
}

