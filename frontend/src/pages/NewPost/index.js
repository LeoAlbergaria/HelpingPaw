import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile(){
    const [titulo, setTitle] = useState('');
    const [descricao, setDescription] = useState('');
    const [animalTag, setAnimal] = useState('gato');
    const [typeTag, setType] = useState('oferta');

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            userId,
            titulo,
            descricao,
            typeTag,
            animalTag,
        };

        console.log(data); 

        try {
            await api.post('/user/newpost', data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })

            navigate("../home", { replace: true });
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso ou ser o herói de alguém.</p>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#ff9d5c"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do post"
                        value={titulo}
                        onChange={e => setTitle(e.target.value)}
                     />
                    <textarea 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescription(e.target.value)}
                     />
                    <div className="tag-group">

                        <select name="types" id="types"
                        value={typeTag}
                        onChange={e => setType(e.target.value)}>
                            <option value="ajuda">ajuda</option>
                            <option value="oferta">oferta</option>
                        </select>

                        <select name="animais" id="animais"
                        value={animalTag}
                        onChange={e => setAnimal(e.target.value)}>
                            <option value="gato">gato</option>
                            <option value="cachorro">cachorro</option>
                            <option value="passaro">passaro</option>
                            <option value="roedor">roedor</option>
                            <option value="outro">outro</option>
                        </select>

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}