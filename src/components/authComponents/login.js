import React, { Component } from 'react'



export default class Login extends Component {


    render(){
        return(
            <React.Fragment>
                {/* <fieldset> */}
                <label>USERNAME: </label>
                <input onChange={this.props.handleFieldChange} id="username"></input>
                <label>PASSWORD: </label>
                <input onChange={this.props.handleFieldChange} id="password"></input>
                <button onClick={() => this.props.signIn(this.props.username, this.props.password)}>sign in</button>
                <button onClick={this.props.clickedOnRegister}>REGISTER</button>
                {/* </fieldset> */}
            </React.Fragment>
        )
    }
}