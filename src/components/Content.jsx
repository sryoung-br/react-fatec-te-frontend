import {useEffect, useState} from 'react'

import Api from '../api/Api';
import Card from './Card';
import Form from './Form';

import Context from '../contexts/Context';
import TemaContext from '../contexts/TemaContext';

function Content() {

    const [posts, setPosts] = useState(undefined);
    
    const [refresh, setRefresh] = useState(undefined);

    useEffect(() => {
        getAllApi()
    }, []);

    useEffect(() => {
        getAllApi()
        setRefresh(false)
    }, [refresh]);

    function getAllApi(){
        async function fetchData() {
            let api = new Api();

            try {
                let obj = await api.getAll();
                setPosts(obj);
            } catch(response) {
                // alert(response.response?.data.message)
                console.log(response.response?.data.errors)
            }

        }
        fetchData();
    }

    return (
        <Context.Provider value={{refresh, setRefresh}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div style={{ width: "80%" }}>
                        <div className="mt-3">
                            <TemaContext.Provider value={{card:"card text-white bg-secondary", input:"tema-input-dark", botao:"btn btn-outline-light"}}>
                                <Form tipo="post"/>
                            </TemaContext.Provider>
                        </div>
                        { posts?.length !== 0 &&
                            <div className="my-3">
                                <div className="card bg-secondary">
                                    <h5 className="card-header text-white text-center">Todos os Posts</h5>
                                    <div className="card-body">
                                        <Card tipo="post" obj={posts}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}
export default Content