import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile(){
    const [titulo, setTitle] = useState('');
    const [descricao, setDescription] = useState('');

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            userId,
            titulo,
            descricao,
        };

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
                    <p>Descreva o caso detalhadamente para encontrar um herói para reoslver isso.</p>
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

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}