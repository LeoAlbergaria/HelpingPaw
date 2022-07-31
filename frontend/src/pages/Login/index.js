// import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

// import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'

export default function Login() {
    return (
        <div className="login-container">
        
            <img src={logo} alt="HelpingPaw" />

            <section className="form">

                <form action="">
                    <h1>Faça seu login</h1>

                    <input placeholder="username"
                        /*value={id}
    onChange={e => setId(e.target.value)}*/
                    />
                    <input placeholder="password"
                        /*value={id}
    onChange={e => setId(e.target.value)}*/
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