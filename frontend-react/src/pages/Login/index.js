import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Login.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';


export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/devs', {
                username
            });
            const { _id } = response.data;

            history.push(`/dev/${_id}`);
        } catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.response.status === 400 ?
                    err.response.data.error : 'Internal error, please try again later'
            });
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}