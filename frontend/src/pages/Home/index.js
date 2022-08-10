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
    const [animalTag, setAnimalTag] = useState('');
    const [typeTag, setTypeTag] = useState('');
    
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
    }, [token, userLogin]);

    async function handleFilter(e) {
        e.preventDefault();

        const data = {
            animalTag,
            typeTag,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        };

        try {
            api.get('/posts', data).then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
        } catch (err) {
            alert('Falha no filtro, tente novamente.');
        }
    };

    function handleLogout () {
        localStorage.clear();
        navigate("../", { replace: true });
    }

    function handlePostClick (post) { 
        localStorage.setItem('postId', post);
        navigate("../post", { replace: true });
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

            <div className="filter">
                <h1>Casos cadastrados</h1>
                <div className="sortby">
                    <select name="types" id="types"
                        value={typeTag}
                        onChange={e => setTypeTag(e.target.value)}
                        >
                        <option value=""></option>
                        <option value="ajuda">ajuda</option>
                        <option value="oferta">oferta</option>
                    </select>

                    <select name="animais" id="animais"
                    value={animalTag}
                    onChange={e => setAnimalTag(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="gato">gato</option>
                        <option value="cachorro">cachorro</option>
                        <option value="passaro">passaro</option>
                        <option value="roedor">roedor</option>
                        <option value="outro">outro</option>
                    </select>
                    <button onClick={handleFilter} type="button">filtrar</button>
                </div>
            </div>

            <ul>
               {posts.map(post => (
                    <li key={post.id} onClick={() => handlePostClick(post._id)}>
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