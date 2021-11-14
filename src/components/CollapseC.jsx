import {
    Collapse,
} from 'react-bootstrap';
  
import Form from './Form';
import Card from './Card'

import TemaContext from '../contexts/TemaContext';


function CollapseC({open, obj, id}) {

    return (
        <>
            <Collapse key={id} in={open === id}>
                <div className="p-2">
                    <TemaContext.Provider value={{card:"card", input:"tema-input-white", botao:"btn btn-outline-secondary"}}>
                        <Form tipo="comentario" id={id}/>
                    </TemaContext.Provider>
                    <div className="mt-2">
                        <Card tipo="comentario" obj={obj}/>
                    </div>
                </div>
            </Collapse>
        </>
    )
}
export default CollapseC