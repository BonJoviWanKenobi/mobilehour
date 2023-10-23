import express from 'express';
import db from '../database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkRole from '../middleware/checkRole.js';


const router = express.Router();

router.post("/register", async (req,res) => {
    const { firstname, lastname, cust_phone, cust_email, cust_password, cust_address, postcode, city } = req.body;
    const hashedPassword = bcrypt.hashSync(cust_password, 10);

    try {
        await db.query("INSERT INTO customer (firstname, lastname, cust_phone, cust_email, cust_password, cust_address, postcode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?", [firstname, lastname, cust_phone, cust_email, hashedPassword, cust_address, postcode, city]);
        res.json({ success: true, message: "Customer registered successfully!"});     
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/login", async (req, res) => {
    const { cust_email, cust_password } = req.body;

    try {
        const [customer] = await db.query("SELECT * FROM customer WHERE cust_email = ?", [cust_email]);

        if (customer.length && bcrypt.compareSync(cust_password, customer[0].cust_password)) {
            const token = jwt.sign({ id: customer[0].customer_id }, "j12u9n239unl1k3j12l31kj23n1lk23j1l2k3j12", { expiresIn: "1h"});
            res.json({ success: true, token: token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.get('/profile', checkRole, async (req, res) => {
    const customerId = req.user.id;

    try {
        const [customer] = await db.query('SELECT customer_id, firstname, lastname, cust_phone, cust_email, cust_password, cust_address, postcode, city FROM customer WHERE customer_id = ?', [customerId]);
        
        if (customer.length) {
            res.json(customer[0]);
        } else {
            res.status(404).send('Customer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;