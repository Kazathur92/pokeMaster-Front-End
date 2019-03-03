// import React, { Component } from 'react'

const apiUrl = "http://localhost:8000/api/v1/"
// pokeApi = "https://api.pokemontcg.io/v1/cards?name=charizard"

// export default class APIManager extends Component {

class APIManager {


    // apiUrl = "http://localhost:8000/api/v1/"
    // pokeApi =  "https://api.pokemontcg.io/v1/cards?name=charizard"

    getThem = (url) => {
       return fetch(url)
        .then(response => response.json())
        .catch(err => console.log("Oopsy Daisy!", err))
    }




    getAll = (resource, keyword = null) => {
        let url = `${this.state.apiUrl}${resource}/`
        if (keyword) {
            url += keyword
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("decks list", data)
                this.setState({ [resource]: data })
            })
            .catch(err => console.log("Oopsy Daisy!", err))
    }



    create = (resource, newObj) => {
        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        fetch(`${this.state.apiUrl}${resource}/`, {
            method: 'POST',
            body: formData
        })
            .then(newData => newData.json())
            .then(newData => {
                console.log("Added?", newData)
                this.getAll(resource)
            })
    }


    delete = (resource, id) => {
        fetch(`${this.state.apiUrl}${resource}/${id}/`, {
            method: 'DELETE'
        })
            .then(() => this.getAll(resource))
    }


    safeDelete = (resource, id) => {
        let formData = new FormData()

        fetch(`${this.state.apiUrl}${resource}/${id}/`, {
            method: 'PATCH'
        })
            .then(() => this.getAll(resource))
    }



    edit = (resource, newObj, id) => {

        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        fetch(`${this.state.apiUrl}${resource}/${id}/`, {
            method: 'PATCH',
            body: formData
        })
            .then(newData => newData.json())
            .then(() => this.getAll(resource))
    }


    search = (resource, keyword) => {
        let query = `?search=${keyword}`
        this.getAll(resource, query)
      }


}

export default new APIManager()