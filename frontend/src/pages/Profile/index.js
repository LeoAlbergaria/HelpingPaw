import { useEffect , useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'
import petting from '../../assets/pettingDog.png'

export default function Home(){
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState('');

    const token = localStorage.getItem('token');
    const userLogin = localStorage.getItem('login');

    useEffect(() => {
        api.get(`/user/${userLogin}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => {
            setUser(response.data.user);
        })

        api.get(`/${userLogin}/posts`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => {
            setPosts(response.data.posts);
        })
    }, [token, userLogin]);

    async function handleUpdate(e){
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
            await api.put('/user/edit', data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            alert("Usuario editado com sucesso!");

            // navigate("../", { replace: true });
        } catch (err) {
            alert('Erro na edicao do usuario, tente novamente.');
        }
    }

    async function handleDeletePost(id) {
        try {
            await api.delete(`/post/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="HelpingPaw" />
                <strong>Perfil</strong>

                <Link to="/home" className="back-arrow"><FiArrowLeft size={32} color="#ff9d5c"/></Link>
            </header>

            <div className="dados-container">
                <img src={petting} alt="petting dog" />
                <form onSubmit={handleUpdate}>
                    <input 
                    placeholder={user.login}
                    value={login}
                    onChange= { e => setLogin(e.target.value)}
                     />
                    
                     <div className="input-group">
 
                         <input placeholder="Nova senha"
                        value={senha}
                        type="password"
                        onChange= { e => setSenha(e.target.value)}
                         />
 
                         <input placeholder="Repita senha"
                         value={confirmSenha}
                         type="password"
                         onChange= { e => setConfirmSenha(e.target.value)}
                         />
 
                     </div>

                    <input placeholder={user.nome}
                    value={nome}
                    onChange= { e => setNome(e.target.value)}
                    />

                    <input 
                    type="email" placeholder={user.email}
                    value={email}
                    onChange= { e => setEmail(e.target.value)}
                     />

                    <input placeholder={user.telefone}
                    value={telefone}
                    onChange= { e => setTelefone(e.target.value)}
                     />

                    <button className="button" type="submit">Alterar</button>
                </form>
            </div>

            <h1>Meus posts</h1>
            <ul>
               {posts.map(post => (
                   <li key={post.id}>
                   <strong>TITULO:</strong>
                   <p>{post.titulo}</p>

                   <strong>DESCRIÇÂO:</strong>
                   <p>{post.descricao}</p>

                   <button onClick={() => handleDeletePost(post._id)} type="button">
                       <FiTrash2 size={20} color="#a8a8b3" />
                   </button>
               </li>
               ))} 
            </ul>
        </div>
    );
}