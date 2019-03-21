import React, { Component } from 'react'

export default class Register extends Component {

    render() {

        return (
            <React.Fragment>
                <div>
                  <button className="backButton" onClick={this.props.backToLogin}>Back to Log In</button>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="first name"
                        name="first_name"
                        className="first_name_input"
                        onChange={this.props.handleFieldChange}
                    />
                    <input
                        type="text"
                        id="last_name"
                        placeholder="last name"
                        name="last_name"
                        className="last_name_input"
                        onChange={this.props.handleFieldChange}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="email"
                        name="email"
                        className="email_input"
                        onChange={this.props.handleFieldChange}
                    />
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        name="username"
                        className="username_input"
                        onChange={this.props.handleFieldChange}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        name="password"
                        className="password_input"
                        onChange={this.props.handleFieldChange}
                    />
                    <button className="registerButton2" onClick={() => this.props.registerUser(this.props.username, this.props.password, this.props.email, this.props.first_name, this.props.last_name)}>REGISTER</button>
                </div>
            </React.Fragment>
        )
    }
}