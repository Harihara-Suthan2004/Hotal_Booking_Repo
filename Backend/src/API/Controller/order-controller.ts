import { Response } from "express";
import prisma from "../../config/db";
import { AuthRequest } from "../Middleware/auth-middleware";

// --- CHECKOUT LOGIC ---
export const checkout = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { food_item: true }
        });

        if (cartItems.length === 0) return res.status(400).json({ success: false, message: "Cart empty" });

        const totalAmount = cartItems.reduce((acc, item) => acc + (item.quantity * item.food_item.price), 0);

        const orderResult = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    user_id: userId,
                    total_amount: totalAmount,
                    order_no: `ORD-${Date.now()}`,
                    status: 'PENDING',
                    items: {
                        create: cartItems.map((item) => ({
                            food_item_id: item.food_item_id,
                            quantity: item.quantity,
                            unit_price: item.food_item.price
                        }))
                    },
                }
            });
            await tx.cartItem.deleteMany({ where: { userId } });
            return order;
        });

        return res.status(201).json({ success: true, order: orderResult });
    } catch (error) {
        console.error("Checkout Error:", error);
        return res.status(500).json({ success: false, message: "Checkout failed" });
    }
};

// --- ADMIN: ORDER LIST ---
export const getallorders = async (req: AuthRequest, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: { 
                // Ensure 'customer' matches the relation name in your schema.prisma
                customer: { select: { name: true, email: true } }, 
                items: { include: { food_item: { select: { name: true } } } } 
            },
            orderBy: { created_at: 'desc' }
        });
        
        return res.status(200).json({ success: true, data: orders });
    } catch (e: any) {
        console.error("PRISMA ERROR (Orders):", e.message);
        return res.status(500).json({ success: false, message: "Internal Server Error: Relation mismatch." });
    }
};

// --- ADMIN: SALES HISTORY ---
export const getDetailSailes = async (req: AuthRequest, res: Response) => {
    try {
        const sales = await prisma.orderItem.findMany({
            include: { 
                food_item: { select: { name: true } }, 
                order: { include: { customer: { select: { name: true } } } } 
            }
        });

        const formatted = sales.map(s => ({ 
            id: s.id, 
            username: s.order.customer?.name || "Unknown", 
            item_name: s.food_item.name, 
            quantity: s.quantity, 
            total_price: (s.quantity * Number(s.unit_price)).toFixed(2) 
        }));

        return res.status(200).json({ success: true, data: formatted });
    } catch (e: any) {
        console.error("PRISMA ERROR (Sales):", e.message);
        return res.status(500).json({ success: false, message: "Internal Server Error: Sales fetch failed." });
    }
};