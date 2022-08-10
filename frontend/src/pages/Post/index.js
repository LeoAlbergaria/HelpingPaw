import { useEffect, useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import {Link } from 'react-router-dom';
import Tags from '../../components/Tags/index.js';  

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png'
import jump from '../../assets/dogJumping.png'

export default function Post() {
    const [post, setPost] = useState('');
    const [user, setUser] = useState('');

    const postId = localStorage.getItem('postId');
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        console.log(postId);
        api.get(`/post/${postId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => {
            setUser(response.data.user);
            setPost(response.data);
        })
    }, [token, postId]);

    return (
        <div className="post-container">
            <header>
                <img src={logo} alt="HelpingPaw" />
                <strong>Post</strong>

                <Link to="/home" className="back-arrow"><FiArrowLeft size={32} color="#ff9d5c"/></Link>
            </header>

            <div className="content">
                <div className="dados">
                    <h2>Detalhe</h2>
                    <div className="block">
                        <strong>Titulo: </strong>
                        <p>{post.titulo}</p>
                        <strong>Descricao: </strong>
                        <p>{post.descricao}</p>
                        <div className="tags">
                            <Tags animalTag={post.animalTag} typeTag={post.typeTag}/>
                        </div>
                    </div>

                    <h2>Contato</h2>
                    <div className="block">
                        <div className="contato">
                            <strong>Login: </strong>
                            <p>{user.login}</p>
                        </div>
                        <div className="contato">
                            <strong>Nome: </strong>
                            <p>{user.nome}</p>
                        </div>
                        <div className="contato">
                            <strong>Email: </strong>
                            <p>{user.email}</p>
                        </div>
                        <div className="contato">
                            <strong>Telefone: </strong>
                            <p>{user.telefone}</p>
                        </div>
                    </div>
                </div>
                <img src={jump} alt="dog jumpping" />
                
            </div>
        </div>
    );
}