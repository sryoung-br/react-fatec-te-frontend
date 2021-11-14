import {useState, useContext} from 'react'

import Api from '../api/Api';

import Context from '../contexts/Context';
import TemaContext from '../contexts/TemaContext';


function Form({tipo, id = ""}) {

    const [form, setForm] = useState({post_id: id, nome: "", email: "", titulo: "", conteudo: "", comentario: ""});

    const {setRefresh} = useContext(Context);

    function HandleChange(e){
        let name = e.target.name
        let value = e.target.value
        setForm({...form, [name]: value})
    }
    
    function HandleSubmit(e) {
        e.preventDefault();

        async function fetchData() {
            let api = new Api();

            try {
                await api.store(form, tipo)
                setForm({...form, nome: "", email: "", titulo: "", conteudo: "", comentario: ""});
                setRefresh(true)
            } catch(response) {
                alert(response.response.data.message)
                console.log(response.response.data.errors)
            }
        }
        fetchData()
    }

    return (
        <TemaContext.Consumer>
            { (tema) =>
            <div className={tema.card}>
                {tipo === "post" && <h5 className="card-header text-center">Criar novo Post</h5>}
                <div className="card-body">
                    <form onSubmit={(e) => HandleSubmit(e) } method="post">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="nome" className="outline-a-half">Nome</label>
                                <input id="nome" name="nome" value={form.nome} onChange={(e)=> HandleChange(e)} type="text" className={tema.input + " form-control mt-2"}/>
                            </div>
                            <div className="col">
                                <label htmlFor="email" className="outline-a-half">E-mail</label>
                                <input id="email" name="email" value={form.email} onChange={(e)=> HandleChange(e)} type="email" className={tema.input + " form-control mt-2"}/>
                            </div>
                        </div>
                        { tipo === "post" &&
                        <div className="form-group mt-3">
                            <label htmlFor="titulo" className="outline-a-half">Título<span className="text-danger">*</span></label>
                            <input id="titulo" name="titulo" value={form.titulo} onChange={(e)=> HandleChange(e)} type="text" className={tema.input + " form-control mt-1"} required/>
                        </div>
                        }
                        <div className="form-group mt-3">
                            <label htmlFor={tipo === "post" ? "conteudo" : "comentario"} className="outline-a-half">{tipo === "post" ? "Conteúdo" : "Escreva um comentário"}<span className="text-danger">*</span></label>
                            <textarea id={tipo === "post" ? "conteudo" : "comentario"} name={tipo === "post" ? "conteudo" : "comentario"} value={tipo === "post" ? form.conteudo : form.comentario} onChange={(e)=> HandleChange(e)} className={tema.input + " form-control mt-2"} rows="3" required></textarea>
                        </div>
                        <div className="mt-3">
                            <input type="submit" className={tema.botao} value="Publicar"/>
                        </div>
                    </form>
                </div>
            </div>
            }
        </TemaContext.Consumer>
    )
}
export default Form