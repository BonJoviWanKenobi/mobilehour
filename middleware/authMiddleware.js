import jwt from 'jsonwebtoken';

const checkRole = (...roles) => {
    return (req, res, next) => {
        try {
            const token = req.header('x-auth-token');

            // If no token is provided, respond with a 401 Unauthorized status.
            if (!token) {
                return res.status(401).send('Access denied. No token provided.');
            }

            // Decode the JWT token.
            const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');  // Replace 'YOUR_SECRET_KEY' with your actual JWT secret key.
            req.user = decoded;  // Store the decoded token in the request object.

            // Check if the user's role matches any of the accepted roles.
            if (!roles.includes(decoded.role)) {
                return res.status(403).send('Access denied.');
            }

            next();  // If all checks pass, move to the next middleware or route handler.
        } catch (error) {
            // If any error occurs (e.g., token is invalid), respond with a 400 Bad Request status.
            res.status(400).send('Invalid token.');
        }
    };
};

export default checkRole;
