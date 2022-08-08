import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link, useNavigate} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'

export default function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            login,
            senha,
        };

        try {
            const response = await api.post('sessions', data);

            // localStorage.setItem('ongId', id);
            // localStorage.setItem('ongName', response.data.name);

            navigate.push('/home');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    };

    return (
        <div className="login-container">
        
            <img src={logo} alt="HelpingPaw" />

            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#ff9d5c"/>
                        Não tenho cadastro
                    </Link>
                </form>  
            </section>
        </div>
    );
}