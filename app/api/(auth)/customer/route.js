
import { NextResponse } from "next/server"
import connect from "@/lib/db"
import Customer from "@/lib/modals/customer"



// export const GET = async() =>{
//     await connect();
//     const customers = await Customer.find({ BilledAmount: { '$gt': 11000} });
//     return new NextResponse(JSON.stringify(customers), { status: 200 });
// }
export const GET = async (request) => {
    try {
        const url = new URL(request.url);
        const params = JSON.parse(url.searchParams.get('query'));
        await connect();
        const customers = await Customer.find(params);
        return new NextResponse(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new NextResponse(error);
    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        await connect();
        const newCustomer = new Customer(body);
        await newCustomer.save();

        return new NextResponse(JSON.stringify({ message: "New customer created", customer: newCustomer }), { status: 201 });
    } catch (error) {
        return new NextResponse("Error in creating customer: " + error, { status: 500 });
    }
}
