
import { NextResponse } from "next/server"
import connect from "@/lib/db"
import Order from "@/lib/modals/orders"

export const GET = async () => {
    try {
        await connect();
        const orders = await Order.find();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching products: " + error, { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        await connect();
        for(const prod of body){
            const newOrder = new Order(prod);
            await newOrder.save();
            console.log("Order added"+prod);
        }
        return new NextResponse(JSON.stringify({ message: "New Orders added"}), { status: 201 });
        
    } catch (error) {
        return new NextResponse("Error in creating Order: " + error, { status: 500 });
    }
}
