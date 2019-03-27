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
            .then(response => {
                if (response.status === 400) {
                    alert("THIS POKEMON IS NOT IN YOUR COLLECTION")
                }
                else if (response.status === 200) {
                }
                return response.json()
            }
            )
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

    getWithUrl = (resource, token) => {
        return fetch(resource, {
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
        }).then(response => {
            console.log("response", response)
            if (response.status === 404) {
                return alert("THIS POKEMON IS NOT IN YOUR COLLECTION")
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


    // NOT IN USE ATM
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



    // NOT IN USE ATM
    search = (resource, keyword) => {
        let query = `?search=${keyword}`
        this.getAll(resource, query)
    }


}

export default new APIManager()