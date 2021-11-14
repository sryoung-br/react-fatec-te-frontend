import { useState, useContext } from 'react'

import CollapseComponent from './CollapseC'

import Api from '../api/Api';

import Context from '../contexts/Context';


function Card({tipo, obj}) {

    const [open, setOpen] = useState(undefined);

    const [like, setLike] = useState([]);
    
    const [deslike, setDeslike] = useState([]);

    const {setRefresh} = useContext(Context);
    
    const likeApagado = `${process.env.PUBLIC_URL}\\like-apagado.png`
    const deslikeApagado = `${process.env.PUBLIC_URL}\\deslike-apagado.png`
    const likeApertado = `${process.env.PUBLIC_URL}\\like-apertado.png`
    const deslikeApertado = `${process.env.PUBLIC_URL}\\deslike-apertado.png`
    
    function collapse(id){
        if (id === open){
            setOpen(undefined)
        } else {
            setOpen(id)
        }
    }

    function avaAction(e, action, id){
        e.preventDefault();
        async function fetchData() {
            let api = new Api();

            try {
                await api.ava({action: action}, tipo, id)
                setRefresh(true)
                if(action){
                    setLike({...like, [id]: likeApertado})
                } else {
                    setDeslike({...deslike, [id]: deslikeApertado})
                }
            } catch(response) {
                alert(response.response.data.message)
                console.log(response.response.data.errors)
            }
        }
        fetchData()
    }


    return (
        <>
            { obj &&
                obj.map(item => {
                    return <div key={item.id} className="card mt-2">
                                <div className="card-body">
                                    { tipo !== 'comentario' &&
                                    <h5 className="card-title">{item.titulo}</h5>
                                    }
                                    <p className="card-text">{item.conteudo ?? item.comentario}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-4 text-left">
                                            <div style={{marginRight: "auto"}} className="text-muted">
                                                {item.nome === null ? 'Anônimo' : item.nome}
                                                {item.email &&
                                                    <span style={{fontSize: '11px'}} className="px-2"><a href={"mailto:" + item.email}>({item.email})</a></span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            { tipo !== 'comentario' &&
                                            <button onClick={() => collapse(item.id)} style={{marginRight: "auto"}} className="btn-link bt-clear">{ open !== item.id ? "Ver Comentários" : "Fechar Comentários"}</button>
                                            }
                                        </div>
                                        <div className="d-flex col-md-4 justify-content-end">
                                            <div className="d-flex" style={{ marginRight: "20px" }}>
                                                <a onClick={(e) => !like[item.id] && !deslike[item.id] && avaAction(e, true, item.id)} style={{ marginRight: "5px" }} href="#like">
                                                    <img style={{width: "30px"}} src={like[item.id] ?? likeApagado} alt="" />
                                                </a>
                                                <div className="text-muted">{item.avaPositiva}</div>
                                            </div>
                                            <div className="d-flex">
                                                <a onClick={(e) => !deslike[item.id] && !like[item.id] && avaAction(e, false, item.id)} style={{ marginRight: "5px" }} className="mr-2" href="#deslike">
                                                    <img style={{width: "30px"}} src={deslike[item.id] ?? deslikeApagado} alt="" />
                                                </a>
                                                <div className="text-muted">{item.avaNegativa}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    { tipo !== 'comentario' &&
                                    <CollapseComponent open={open} id={item.id} obj={item.comentarios}/>
                                    }
                                </div>
                            </div>
                })
            }
        </>
    )
}
export default Card