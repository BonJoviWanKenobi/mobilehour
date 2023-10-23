import jwt from 'jsonwebtoken';

const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            // Check if the Authorization header exists
            if (!req.header('Authorization')) {
                return res.status(401).send('Access denied. No Authorization header provided.');
            }

            // Extract the token from the Authorization header
            const token = req.header('Authorization').split(' ')[1];  // Bearer TOKEN_STRUCTURE

            console.log("Incoming Token:", token);  // Logging the incoming token for debugging

            // If the token doesn't exist, send a 401 response
            if (!token) {
                return res.status(401).send('Access denied. No token provided.');
            }

            // Verify the token using jwt.verify
            const decoded = jwt.verify(token, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12');
            req.user = decoded;  // Storing the decoded payload in the request object

            // Check if the user's role exists in the provided roles
            if (!roles.includes(decoded.role)) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }

    // Extract the user ID
    const userId = decoded.id;

    // You can now use this user ID for further operations.
    console.log('Logged in user ID:', userId);
    req.user = decoded;

            next();  // If everything is fine, move to the next middleware or route handler
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    };
};

export default checkRole;
