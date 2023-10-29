import express from 'express';
import db from '../database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();
router.post('/account-login', async (req, res) => {
    const { username, password } = req.body;

    // Input verification
    if (!username || !password) {
        console.error('Username or password not received:', { username, password });
        return res.status(400).send('Username and password are required.');
    }

    // First, try to find the user in the users table
    try {
        let [users] = await db.query('SELECT * FROM user WHERE username = ?', [username]);

        if (users.length > 0) {
            const hashedPassword = users[0].user_password;

            if (!hashedPassword) {
                console.error('No password found for user:', username);
                return res.status(500).send('Server error: No password found for user');
            }

            if (bcrypt.compareSync(password, hashedPassword)) {
                const token = jwt.sign({ 
                    id: users[0].user_id, 
                    role: users[0].user_role 
                }, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12', { expiresIn: '1h' });

                return res.json({ success: true, token: token, userType: users[0].user_role });
            }
        } else {
            // If not found in the user table, check the customer table
            let [customers] = await db.query('SELECT * FROM customer WHERE cust_email = ?', [username]);
            if (customers.length > 0) {
                if (bcrypt.compareSync(password, customers[0].cust_password)) {
                    const token = jwt.sign({ 
                        id: customers[0].customer_id, 
                        role: 'customer' 
                    }, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12', { expiresIn: '1h' });

                    return res.json({ success: true, token: token, userType: 'customer' });
                }
            }
        }

        console.error('Invalid login attempt:', { username, password });  // Remove password in production.
        return res.status(401).send('Invalid credentials');

    } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).send('Database error');
    }
});



export default router;