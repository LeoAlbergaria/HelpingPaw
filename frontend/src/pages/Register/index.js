import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Register(){
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            login,
            senha,
            confirmSenha,
            nome,
            email,
            telefone,
        };

        try {
            const response = await api.post('ongs', data);
    
            // alert(`Seu ID de acesso: ${response.data.id}`);

            navigate.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#ff9d5c"/>
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Login"
                    value={login}
                    onChange= { e => setLogin(e.target.value)}
                     />
                    
                     <div className="input-group">
 
                         <input placeholder="Senha"
                        value={senha}
                        onChange= { e => setSenha(e.target.value)}
                         />
 
                         <input placeholder="Repita senha"
                         value={confirmSenha}
                         onChange= { e => setConfirmSenha(e.target.value)}
                         />
 
                     </div>

                    <input placeholder="Nome"
                    value={nome}
                    onChange= { e => setNome(e.target.value)}
                    />

                    <input 
                    type="email" placeholder="E-mail"
                    value={email}
                    onChange= { e => setEmail(e.target.value)}
                     />

                    <input placeholder="Telefone"
                    value={telefone}
                    onChange= { e => setTelefone(e.target.value)}
                     />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}