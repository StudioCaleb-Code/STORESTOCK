import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mandamos los datos a tu backend con MySQL
            const response = await fetch('https://storestock.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email, // Tu backend busca 'username' en req.body
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                // Guardamos los datos del usuario en el navegador por si tu panel los usa
                localStorage.setItem('user', JSON.stringify(data.user));

                alert('¡Bienvenido a STORESTOCK!');

                // REDIRECCIÓN OBLIGATORIA AL PANEL GENERAL
                navigate('/panel');
            } else {
                alert('Error: ' + (data.message || 'Credenciales incorrectas'));
            }
        } catch (error) {
            console.error(error);
            alert('No se pudo conectar con el servidor de la base de datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión - STORESTOCK</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text" // Cambiado a text por si ingresan username en vez de email
                    placeholder="Tu usuario o correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default Login;