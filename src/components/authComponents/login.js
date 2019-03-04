import React, { Component } from 'react'



export default class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        console.log(stateToChange)
      }


    signMeIn = (username, password) => {
        this.props.signIn(username, password)
    }



    render(){
        return(
            <React.Fragment>
                {/* <fieldset> */}
                <label>USERNAME: </label>
                <input onChange={this.handleFieldChange} id="username"></input>
                <label>PASSWORD: </label>
                <input onChange={this.handleFieldChange} id="password"></input>
                <button onClick={() => this.signMeIn(this.state.username, this.state.password)}>sign in</button>
                {/* </fieldset> */}
            </React.Fragment>
        )
    }
}