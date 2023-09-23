import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Test route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running...');
});
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

export default app;
