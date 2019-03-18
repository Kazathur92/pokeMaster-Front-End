const apiUrl = "http://localhost:8000/api/v1/"
const authKey = localStorage.getItem("token")

class APIManager {


    getThem = (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authKey}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get cards problem!", err))
    }

    getThemById = (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get cards"))
    }



    // IF WANT TO USE PYTHON TO FILTER ADD PARAMETER THAT THEN WILL BE LISTENED FOR IN PYTHON VIEWSET
    getAllWithQuery = (resource, query, token, keyword = null) => {
        let url = `${apiUrl}${resource}${query}`
        if (keyword) {
            url += keyword
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get all problem!", err))
    }

    getAll2 = (resource, token, keyword = null) => {
        let url = `${apiUrl}${resource}`
        if (keyword) {
            url += keyword
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get all problem!", err))
    }

    getAllWithToken = (resource, token, keyword = null) => {
        let url = `${apiUrl}${resource}/`
        if (keyword) {
            url += keyword
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get all problem!", err))
    }

    getAllOnRefresh = (resource, keyword = null) => {
        let url = `${apiUrl}${resource}/`
        if (keyword) {
            url += keyword
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authKey}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy get all problem!", err))
    }


    getSingle = (resource, id, token) => {
        let url = `${apiUrl}${resource}/${id}`
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("oopsy get single problem", err))
    }

    getSingleUser = (resource, token) => {
        let url = `${apiUrl}${resource}`
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .catch(err => console.log("oopsy get single problem", err))
    }


    //   would not work with "Content-Type": "application/json",
    create = (resource, newObj, authToken) => {
        console.log("TOKEN MANAGER: ", authToken)
        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        return fetch(`${apiUrl}${resource}/`, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Token ${authToken}`
            }
        })
            .then(newData => newData.json())
            .catch(err => console.log("Oopsy Daisy creating problem!", err))
    }


    // addToDeck = (resource, newObj, id) => {
    //     let formData = new FormData()
    //     for (let key in newObj) {
    //         formData.append(key, newObj[key])
    //     }

    //     return fetch(`${apiUrl}${resource}/${id}`, {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(newData => newData.json())
    //         .catch(err => console.log("Oopsy Daisy!", err))
    // }


    delete = (resource, id, token) => {
        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
    }

    deleteIt = (resource, token) => {
        return fetch(`${apiUrl}${resource}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
    }


    edit = (resource, newObj, id, token) => {

        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'PATCH',
            body: formData,
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(newData => newData.json())
    }


    safeDelete = (resource, id) => {
        let formData = new FormData()

        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authKey}`
            }
        })
            .then(() => this.getAll(resource))
    }




    search = (resource, keyword) => {
        let query = `?search=${keyword}`
        this.getAll(resource, query)
    }


}

export default new APIManager()