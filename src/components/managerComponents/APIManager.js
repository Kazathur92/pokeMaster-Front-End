const apiUrl = "http://localhost:8000/api/v1/"


class APIManager {


    getThem = (url) => {
       return fetch(url)
        .then(response => response.json())
        .catch(err => console.log("Oopsy Daisy!", err))
    }




    getAll = (resource, keyword = null) => {
        let url = `${apiUrl}${resource}/`
        if (keyword) {
            url += keyword
        }
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log("Oopsy Daisy!", err))
    }


    getSingle = (resource, id) => {
        let url = `${apiUrl}${resource}/${id}`
        return fetch(url)
        .then(response => response.json())
        .catch(err => console.log("oopsy", err))
      }


    create = (resource, newObj) => {
        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        return fetch(`${apiUrl}${resource}/`, {
            method: 'POST',
            body: formData
        })
            .then(newData => newData.json())
            .catch(err => console.log("Oopsy Daisy!", err))
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


    delete = (resource, id) => {
        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'DELETE'
        })
            .then(() => this.getAll(resource))
    }


    safeDelete = (resource, id) => {
        let formData = new FormData()

        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'PATCH'
        })
            .then(() => this.getAll(resource))
    }



    edit = (resource, newObj, id) => {

        let formData = new FormData()
        for (let key in newObj) {
            formData.append(key, newObj[key])
        }

        return fetch(`${apiUrl}${resource}/${id}/`, {
            method: 'PATCH',
            body: formData
        })
            .then(newData => newData.json())
    }


    search = (resource, keyword) => {
        let query = `?search=${keyword}`
        this.getAll(resource, query)
      }


}

export default new APIManager()