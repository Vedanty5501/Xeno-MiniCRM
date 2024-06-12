
import { NextResponse } from "next/server"
import connect from "@/lib/db"
import Product from "@/lib/modals/product"

export const GET = async () => {
    try {
        await connect();
        const products = await Product.find();
        console.log("-------Products --------", products);
        return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching products: " + error, { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        await connect();
        for(const prod of body){
            const newProduct = new Product(prod);
            await newProduct.save();
            console.log("Product added"+prod);
        }
        return new NextResponse(JSON.stringify({ message: "New products added"}), { status: 201 });
        
    } catch (error) {
        return new NextResponse("Error in creating product: " + error, { status: 500 });
    }
}
