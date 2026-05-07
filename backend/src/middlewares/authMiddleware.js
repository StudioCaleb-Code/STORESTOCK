const supabase = require('../config/db');

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) return res.status(401).json({ error: 'Token inválido' });

    req.user = user; // Inyectamos el usuario en la petición
    next();
};

module.exports = checkAuth;