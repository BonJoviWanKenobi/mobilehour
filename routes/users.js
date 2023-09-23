import express from 'express';
import db from '../database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

// User authentication (login)
router.post('/auth', async (req, res) => {
    const { username, user_password } = req.body;
    console.log("Auth route started");
    console.log("Received username:", username);
    console.log("Received password:", user_password);
    try {
        const [users] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
        console.log("Database Response:", users);

        if (users.length && bcrypt.compareSync(user_password, users[0].user_password)) {
            const token = jwt.sign({ id: users[0].user_id, role: users[0].user_role }, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12', { expiresIn: '1h' });
            res.json({ success: true, token: token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).send('Database error');
    }
});

// Remaining code...
// (You can keep the rest of the code as is since the issue seems to be with the /auth route)

export default router;
