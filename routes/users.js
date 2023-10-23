import express from 'express';
import db from '../database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

// User authentication (login)
// User authentication (login)
router.post('/auth', async (req, res) => {
    const { username, user_password } = req.body;

    if (!username || !user_password) {
        console.error('Username or password not received:', { username, user_password });
        return res.status(400).send('Username and password are required.');
    }

    console.log("Auth route started");
    console.log("Received username:", username);
    console.log("Received password:", user_password);  // Note: Logging passwords is a security risk in a production environment.

    try {
        const [users] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
        console.log("Database Response:", users);

        if (users.length === 0) {
            console.error('No user found with username:', username);
            return res.status(404).send('User not found');
        }

        const hashedPassword = users[0].user_password;
        if (!hashedPassword) {
            console.error('No password found for user:', username);
            return res.status(500).send('Server error: No password found for user');
        }

        if (bcrypt.compareSync(user_password, hashedPassword)) {
            const token = jwt.sign({ id: users[0].user_id, role: users[0].user_role }, 'j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12', { expiresIn: '1h' });
            return res.json({ success: true, token: token });
        } else {
            return res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).send('Database error');
    }
});

// Create a new user (only admin managers can use this route)
router.post('/create', checkRole(['admin manager']), async (req, res) => {
    const { firstname, lastname, username, user_password, user_role } = req.body;

    // Basic validation
    if (!username || !user_password || !user_role) {
        return res.status(400).send('Username, password, and role are required.');
    }

    try {
        // Check if the username already exists
        const [existingUsers] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUsers.length) {
            return res.status(400).send('Username already exists.');
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user_password, salt);

        // Insert the new user into the database
        const [result] = await db.query('INSERT INTO user (firstname, lastname, username, user_password, user_role) VALUES (?, ?, ?, ?, ?)', [firstname, lastname, username, hashedPassword, user_role]);
        
        return res.json({ success: true, message: 'User created successfully!', insertId: result.insertId });
    } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).send('Database error');
    }
});

router.get('/changelog', async (req, res) => {
    try {
        const [changelog] = await db.query('SELECT * FROM changelog ORDER BY date_last_modified DESC');
        res.json(changelog);
    } catch (error) {
        console.error("Database Query Error:", error);
        return res.status(500).send('Database error');
    }
  });
  

// In your routes file

// Remaining code...
// (You can keep the rest of the code as is since the issue seems to be with the /auth route)

export default router;
