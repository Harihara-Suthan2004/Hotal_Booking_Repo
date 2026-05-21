import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import prisma from './config/db';
import userRoutes from './API/Route/user-routes';
import productRoutes from './API/Route/product-route';
import cartRoutes from './API/Route/cart-route';
import adminRoutes from './API/Route/admin-route'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// ROUTE MOUNTING
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes); 

app.get('/', async (req: Request, res: Response) => {
    try {
        // Simple check for DB connection
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            success: true,
            message: "Server is running and db is connected"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
});