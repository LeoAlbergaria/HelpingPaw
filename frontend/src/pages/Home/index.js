import { useEffect , useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FiPower, FiUser } from 'react-icons/fi';
import Tags from '../../components/Tags/index.js';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'

export default function Home(){
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState('');

    const navigate = useNavigate();

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

        api.get('/posts', {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => {
            setPosts(response.data);
        })
    }, [token]);

    function handleLogout () {
        localStorage.clear();
        navigate("../", { replace: true });
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="HelpingPaw" />
                <span>Bem vinda, {user.nome}</span>
                <Link className="profile-icon" to="/profile"><FiUser size={36} color="#ff9d5c" /></Link>

                <Link className="button" to="/home/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
               {posts.map(post => (
                    <li key={post.id}>
                        <strong>TITULO:</strong>
                        <p>{post.titulo}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{post.descricao}</p>

                        <div className="tags">
                            <Tags animalTag={post.animalTag} typeTag={post.typeTag}/>
                        </div>
                    </li>
               ))} 
            </ul>
        </div>
    );
}