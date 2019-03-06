import React, { Component } from 'react'




export default class Register extends Component {


render(){

    return(
        <React.Fragment>
             <div>
            <input
              type="text"
              id="first_name"
              placeholder="first name"
              name="first_name"
              onChange={this.props.handleFieldChange}
            />
            <input
              type="text"
              id="last_name"
              placeholder="last name"
              name="last_name"
              onChange={this.props.handleFieldChange}
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              onChange={this.props.handleFieldChange}
            />
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              onChange={this.props.handleFieldChange}
            />
             <input
              type="text"
              id="password"
              placeholder="password"
              name="password"
              onChange={this.props.handleFieldChange}
            />
            <button onClick={() => this.props.registerUser(this.props.username, this.props.password, this.props.email, this.props.first_name, this.props.last_name)}>REGISTER</button>
          </div>
        </React.Fragment>
    )
}


}