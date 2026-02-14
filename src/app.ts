import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import bankRoutes from './routes/bank.routes';
import transactionRoutes from './routes/transaction.routes';
import { authenticate } from './middlewares/auth.middleware';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test-middleware',  authenticate, (req, res) => {
  res.send('Entered ini sekarang tidak bisa diakses tanpa token!');
});


export default app;