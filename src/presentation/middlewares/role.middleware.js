export const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // req.user viene del authMiddleware. Si no existe, bloqueamos.[cite: 3]
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
        }
        next();
    };
};