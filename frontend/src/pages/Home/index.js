import { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

// import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'

export default function Home(){
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="HelpingPaw" />
                <span>Bem vinda, Leonardo</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button  type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            {/* <ul>
               {incidents.map(incident => (
                   <li key={incident.id}>
                   <strong>CASO:</strong>
                   <p>{incident.title}</p>

                   <strong>DESCRIÇÂO:</strong>
                   <p>{incident.description}</p>

                   <strong>VALOR:</strong>
                   <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                   <button onClick={() => handleDeleteIncidente(incident.id)} type="button">
                       <FiTrash2 size={20} color="#a8a8b3" />
                   </button>
               </li>
               ))} 
            </ul> */}
        </div>
    );
}