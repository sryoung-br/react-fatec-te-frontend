import axios from 'axios'

const URL_API = 'https://laravel-fatec-te-backend.herokuapp.com/api/v1/'

class Api {
    
    // getToken(){
    //     let promise = new Promise((resolve) => {
    //         let token = 'http://laravel-react-trab.test/token'
    //         resolve(
    //         fetch(token, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
    //             .then(response => response.json())
    //             .then(result => {
    //                 return result
    //             })
    //         );
    //     });
    //     return promise
    // }

    
    getAll(){
        let promise = new Promise((resolve) => {
            let objApi = URL_API + "post"
            resolve(
            fetch(objApi, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
                .then(response => response.json())
                .then(result => {
                    return result
                })
            );
        });
        return promise
    }

    store(obj, tipo){
        let promise = new Promise((resolve) => {
            let api = URL_API + tipo
            resolve(
            axios.post(api, obj, {headers: { 'Content-Type': 'application/json' }})
                .then(response => {
                    return response
                })   
            );
        });
        return promise
    }

    ava(action, tipo, id){
        let promise = new Promise((resolve) => {
            let api = URL_API + tipo + "/" + id + "/updateAva"
            resolve(
            axios.patch(api, action, {headers: { 'Content-Type': 'application/json' }})
                .then(response => {
                    return response
                })   
            );
        });
        return promise
    }
}
export default Api