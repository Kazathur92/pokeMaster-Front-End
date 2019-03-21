import React, { Component } from 'react'
import './auth.css'

export default class Login extends Component {

    render() {
        return (
            <React.Fragment>

                <label className="userName">USERNAME: </label>
                <input onChange={this.props.handleFieldChange} id="username"></input>
                <label className="password">PASSWORD: </label>
                <input type="password" onChange={this.props.handleFieldChange} id="password"></input>
                <button className="signInButton" onClick={() => this.props.signIn(this.props.username, this.props.password)}>SIGN IN</button>
                <button className="registerButton" onClick={this.props.clickedOnRegister}>REGISTER</button>

            </React.Fragment>
        )
    }
}