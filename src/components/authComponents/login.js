import React, { Component } from 'react'

export default class Login extends Component {

    render() {
        return (
            <React.Fragment>
                <label>USERNAME: </label>
                <input onChange={this.props.handleFieldChange} id="username"></input>
                <label>PASSWORD: </label>
                <input type="password" onChange={this.props.handleFieldChange} id="password"></input>
                <button onClick={() => this.props.signIn(this.props.username, this.props.password)}>sign in</button>
                <button onClick={this.props.clickedOnRegister}>REGISTER</button>
            </React.Fragment>
        )
    }
}