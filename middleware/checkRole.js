import jwt from 'jsonwebtoken';

const checkRole = (role) => {
    return (req, res, next) => {
        try {
            const token = req.header('x-auth-token');
            if (!token) {
                return res.status(401).send('Access denied. No token provided.');
            }

            const decoded = jwt.verify(token, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12'); 
            req.user = decoded;

            // Check user's role
            if (decoded.role !== role) {
                return res.status(403).send('Access denied.');
            }
            
            next();  // Grant access
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    };
};

export default checkRole;
